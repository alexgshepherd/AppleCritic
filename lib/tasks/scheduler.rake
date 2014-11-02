require 'date'
require 'unirest'
require 'open-uri'
require 'json'

FEED_LENGTH = 80
APPLE_SITE = "http://trailers.apple.com"
NO_SCORE = -1
NOT_FOUND = -2
IURI_START = "http://www.omdbapi.com/?t="
RT_FRAGMENT = "&@page_limit=1&@page=1&apikey="
RT_URI_START = "http://api.rottentomatoes.com/api/public/v1.0/movies.json?q="

def parse_year(releasedate)
	if releasedate.is_a? Fixnum
		releaseyear = releasedate
	elsif !releasedate 
		releaseyear = nil
	else
		releaseyear = (Date.parse releasedate).year
	end
end

def get_rt_feed(title)
	title = title.gsub(" ", "+")
	rtURI = format("%s%s%s%s", RT_URI_START, title, RT_FRAGMENT, ENV["RT_API_KEY"])
	rtFeed = JSON.parse(open(rtURI).read)
end

def get_rt_info(title, releasedate)
	rtFeed = get_rt_feed(title)

	return [NOT_FOUND, NOT_FOUND, NOT_FOUND] if rtFeed["total"] == 0			
	releaseyear = parse_year(releasedate)
	#Validate by release date 
	unless !releaseyear || rtFeed["movies"][0]["year"] == releaseyear
		#These movies are new so we do not care about looking down the list
		return [NOT_FOUND, NOT_FOUND, NOT_FOUND]
	end

	[rtFeed["movies"][0]["ratings"]["critics_score"], rtFeed["movies"][0]["ratings"]["audience_score"],
	rtFeed["movies"][0]["links"]["alternate"]]
end

def get_metacritic(title, releasedate)
	releaseyear = parse_year(releasedate)
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

def form_omdb_uri(title, releasedate)
	title = title.gsub(" ", "+")
	iURI = 
		if releasedate 
			IURI_START + title + "&y=" + parse_year(releasedate).to_s
		else
			IURI_START + title
		end
end

def get_omdb_json(iURI)
	omdbPage = Nokogiri::HTML(open(iURI))
	body = omdbPage.at_css "body"
	omdbFeed = JSON.parse(body.content)
end

def get_imdb(title, releasedate)
	omdbURI = form_omdb_uri(title, releasedate)
	omdbFeed = get_omdb_json(omdbURI)

	if omdbFeed["Response"] != "True" || omdbFeed["imdbRating"] == "N/A" 
  return [NOT_FOUND, NOT_FOUND]
else
		return [omdbFeed["imdbRating"], format("http://www.imdb.com/title/%s", omdbFeed["imdbID"])]
	end
end

def update_order(appleFeed, i)
	#Make sure order is the same as on Apple Trailers
	id = Movie.find_by(title: appleFeed[i]["title"]).id
	Movie.update(id, :order => i)
end

def obey_rt_access_rules(i)
	sleep(0.2) if i != FEED_LENGTH - 1
end

def fill_rt_info(appleFeed, i)
	rt_info = get_rt_info(appleFeed[i]["title"], appleFeed[i]["releasedate"])
	@movie.tomatometer = rt_info[0]
	@movie.audience = rt_info[1]
	@movie.rt_url = rt_info[2]
end

def fill_mc_info(appleFeed, i)
	begin
		mc_info = get_metacritic(appleFeed[i]["title"], appleFeed[i]["releasedate"])
		@movie.metascore = mc_info[0]
		@movie.mc_url = mc_info[1]
	rescue #I can't replicate these errors
		@movie.metascore = NOT_FOUND
	end
end

def fill_imdb_info(appleFeed, i)
	imdb_info = get_imdb(appleFeed[i]["title"], appleFeed[i]["releasedate"])
	@movie.imdb_rating = imdb_info[0]
	@movie.imdb_url = imdb_info[1]
end

def update_log
	new_log = Log.new
	new_log.last_updated_at = Time.now
	new_log.save
end

desc "This task is called by the Heroku scheduler add-on"
task :update_database => :environment do
	appleFeed = JSON.parse(open("http://trailers.apple.com/trailers/home/feeds/just_added.json").read)
	(0..FEED_LENGTH - 1).each do |i|
		unless Movie.find_by(title: appleFeed[i]["title"])
			#Movie is not already in our database 
			@movie = Movie.new
			@movie.title = appleFeed[i]["title"]
			@movie.release_date = appleFeed[i]["releasedate"]

			fill_rt_info(appleFeed, i)
			fill_mc_info(appleFeed, i)
			fill_imdb_info(appleFeed, i)
			
			@movie.trailer_url = APPLE_SITE + appleFeed[i]["location"]
			@movie.poster_url = appleFeed[i]["poster"]
			@movie.save

			obey_rt_access_rules(i)
		end
		update_order(appleFeed, i)
	end
	update_log
end