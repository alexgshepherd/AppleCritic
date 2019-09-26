require 'date'
require 'unirest'
require 'open-uri'
require 'json'
require 'nokogiri'

class Movie < ActiveRecord::Base
	FEED_LENGTH = 80
	APPLE_SITE = "http://trailers.apple.com"
	NO_SCORE = -1
	NOT_FOUND = -2
	RT_ALL_NOT_FOUND = [NOT_FOUND, NOT_FOUND, NOT_FOUND]
	IURI_START = "http://www.omdbapi.com/?t="
	IURI_FRAGMENT = "&apikey="
	RT_FRAGMENT = "&@page_limit=1&@page=1&apikey="
	RT_URI_START = "http://api.rottentomatoes.com/api/public/v1.0/movies.json?q="

	def self.parse_year(releasedate)
		# Finding a movie does not depend on the month or day.
		if releasedate.is_a? Fixnum
			releaseyear = releasedate
		elsif !releasedate 
			releaseyear = nil
		else
			releaseyear = (Date.parse releasedate).year
		end
	end

	def self.format_title_for_url(title)
		# Remove accents.
		thing = ActiveSupport::Multibyte::Chars.new(title)
		title = thing.mb_chars.normalize(:kd).gsub(/[^\x00-\x7F]/n,'').to_s
		title = title.gsub(" ", "+")
	end

	def self.load_rt_feed(title)
		title = self.format_title_for_url(title)
		rtURI = format("%s%s%s%s", RT_URI_START, title, RT_FRAGMENT, ENV["RT_API_KEY"])
		rtFeed = JSON.parse(open(rtURI).read)
	end

	def self.rt_found(rtFeed, releasedate)
		raise IOError if rtFeed["total"] == 0			
		releaseyear = self.parse_year(releasedate)
		# If the release year is different, reject.
		# These movies are new so we do not care about looking down the list.
		unless !releaseyear || rtFeed["movies"][0]["year"] == releaseyear
			raise IOError
		end
	end 

	def self.get_rt_info(title, releasedate)
		begin 
			rtFeed = self.load_rt_feed(title)
			self.rt_found(rtFeed, releasedate)
			return [rtFeed["movies"][0]["ratings"]["critics_score"], rtFeed["movies"][0]["ratings"]["audience_score"],
				rtFeed["movies"][0]["links"]["alternate"]]
		rescue *[IOError, OpenURI::HTTPError]
			return RT_ALL_NOT_FOUND
		end
	end

	def self.load_metacritic(title, releasedate)
		releaseyear = self.parse_year(releasedate)
		if releaseyear 
			response = Unirest.post "https://byroredux-metacritic.p.mashape.com/find/movie",
	   	headers:{:'X-Mashape-Key' => ENV["MASHAPE_KEY"]},
	   	parameters:{:retry => 4, :title => title, :year_from => releaseyear.to_s, 
	   							:year_to => (releaseyear + 1).to_s}
		else
	 		response = Unirest.post "https://byroredux-metacritic.p.mashape.com/find/movie",
	 						headers:{:'X-Mashape-Key' => ENV["MASHAPE_KEY"]},
	 						parameters:{:retry => 4, :title => title}
		end
		return [NOT_FOUND, NOT_FOUND] if response.body.key?("error") 
		return [NOT_FOUND , NOT_FOUND] unless response.body["result"] 
		return [NO_SCORE, NO_SCORE] if response.body["result"]["score"].blank?
		return [response.body["result"]["score"], response.body["result"]["url"]]
	end

	def self.form_omdb_uri(title, releasedate)
		title = self.format_title_for_url(title)
		year = "&y=" + self.parse_year(releasedate).to_s
		omdb_uri = 
			if releasedate 
				format("%s%s%s%s%s", IURI_START, title, year, IURI_FRAGMENT, ENV["OMDB_API_KEY"]) 
			else
				format("%s%s%s%s", IURI_START, title, IURI_FRAGMENT, ENV["OMDB_API_KEY"])
			end
	end

	def self.load_omdb_feed(omdb_uri)
		#omdbPage = Nokogiri::HTML(open(omdb_uri))
		#body = omdbPage.at_css "body"
		#omdbFeed = JSON.parse(body.content)
		thing = open(omdb_uri)
		omdbFeed = JSON.parse(thing.read)
	end

	def self.load_imdb(title, releasedate)
		omdb_uri = self.form_omdb_uri(title, releasedate)
		omdbFeed =self.load_omdb_feed(omdb_uri)
		puts omdb_uri

		if omdbFeed["Response"] != "True" || omdbFeed["imdbRating"] == "N/A" 
	  		return [NOT_FOUND, NOT_FOUND]
		else
			return [omdbFeed["imdbRating"], omdbFeed["Metascore"], 
				format("http://www.imdb.com/title/%s", omdbFeed["imdbID"])]
		end
	end

	def self.obey_rt_access_rules(i)
		sleep(0.2) if i != FEED_LENGTH - 1
	end

	def self.fill_rt_info(appleFeed, i)
		rt_info = self.get_rt_info(appleFeed[i]["title"], appleFeed[i]["releasedate"])
		@movie.tomatometer = rt_info[0]
		@movie.audience = rt_info[1]
		@movie.rt_url = rt_info[2]
	end

	def self.fill_mc_info(appleFeed, i)
		begin
			mc_info = self.load_metacritic(appleFeed[i]["title"], appleFeed[i]["releasedate"])
			@movie.metascore = mc_info[0]
			@movie.mc_url = mc_info[1]
		rescue # I can't replicate these errors...
			@movie.metascore = NOT_FOUND
		end
	end

	def self.fill_imdb_info(appleFeed, i)
		imdb_info = self.load_imdb(appleFeed[i]["title"], appleFeed[i]["releasedate"])
		@movie.imdb_rating = imdb_info[0]
		@movie.imdb_url = imdb_info[2]
		@movie.metascore = imdb_info[1]
	end

	def self.process_poster_text(text)
		return text if text.include? "http"
		"#{APPLE_SITE}#{text}"
	end

	def self.shift_tail(i)
		j = Movie.count
		while j > FEED_LENGTH - i
			j = j - 1
			Movie.find_by(order: j).update(order: j + i)
		end
	end

	def self.delete_one_end_duplicate
		total = Movie.count
		Movie.find_by(order: FEED_LENGTH - 1).destroy
		j = FEED_LENGTH
		while j < total
			Movie.find_by(order: j).update(order: j - 1)
			j = j + 1
		end
	end

	def self.last_is_duplicate
		return false if !Movie.find_by(order: FEED_LENGTH)
		if Movie.find_by(order: FEED_LENGTH - 1).title == Movie.find_by(order: FEED_LENGTH).title
			return true
		else
			return false
		end
	end

	def self.duplicate_found(title, i)
		if title == Movie.find_by(order: 0).title
			return true
		else
			return false
		end
	end

	def self.find_how_many_are_new(appleFeed)
		return FEED_LENGTH unless Movie.find_by(order: 0)
		(0..FEED_LENGTH - 1).each do |i|
			title = appleFeed[i]["title"]
			if duplicate_found(title, i)
				return i
			end
		end
		return FEED_LENGTH
	end

	def self.erase_within_feed_length
		(0..FEED_LENGTH - 1).each do |i|
			Movie.find_by(order: i).destroy if Movie.find_by(order: i)	
		end
	end

	def self.update_database
		appleFeed = JSON.parse(open("http://trailers.apple.com/trailers/home/feeds/just_added.json").read)
		new_movies = self.find_how_many_are_new(appleFeed)
		return unless new_movies != 0
		#self.delete_one_end_duplicate if self.last_is_duplicate
		#self.shift_tail(new_movies)
		#self.erase_within_feed_length
		Movie.delete_all
		
		(0..FEED_LENGTH - 1).each do |i|	
			@movie = Movie.new
			@movie.title = appleFeed[i]["title"]
			@movie.release_date = appleFeed[i]["releasedate"]

			#self.fill_rt_info(appleFeed, i)
			#self.fill_mc_info(appleFeed, i)
			self.fill_imdb_info(appleFeed, i)
			
			@movie.trailer_url = APPLE_SITE + appleFeed[i]["location"]
			@movie.poster_url = process_poster_text(appleFeed[i]["poster"])
			@movie.order = i
			@movie.save	

			self.obey_rt_access_rules(i)				
		end
		#Log.update_log
	end
end