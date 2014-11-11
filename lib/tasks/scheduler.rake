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

require 'nokogiri'
#require 'rubygems'
FILMS_DISPLAYED = 30
MAX_TITLE_LENGTH = 23

def trim_title(title)
	title = title.strip
	if title.size > MAX_TITLE_LENGTH
		last_index_displayed = MAX_TITLE_LENGTH - 2 - 1
		title = title[0..last_index_displayed] + "..."
	end
	title
end

def attach_link_for_icon(span_node, url)
	a_node = Nokogiri::XML::Node.new('a', @page)
	a_node['href'] = url
	span_node.add_child(a_node)
	a_node
end

def add_rt_icon(span_node, this_movie)
	a_node = attach_link_for_icon(span_node, this_movie.rt_url)

	rt_icon_node = Nokogiri::XML::Node.new('img', @page)
	if(this_movie.tomatometer >= 60)
		rt_icon_node['src'] = "http://d3biamo577v4eu.cloudfront.net/static/images/icons/fresh-16.png"
	elsif(this_movie.tomatometer >= 0)
		rt_icon_node['src'] = "http://d3biamo577v4eu.cloudfront.net/static/images/icons/splat-16.png"
	end
	rt_icon_size = "11"
	rt_icon_node['style'] = "height: #{rt_icon_size}px; width: #{rt_icon_size}px;"\
													"margin: 0; padding: 0; border: none; background: none"
	a_node.add_child(rt_icon_node)
end

def add_mc_icon(span_node, this_movie)
	a_node = attach_link_for_icon(span_node, this_movie.mc_url)

	mc_icon_node = Nokogiri::XML::Node.new('img', @page)
	mc_icon_size = "11"
	mc_icon_node['style'] = "height: #{mc_icon_size}px; width: #{mc_icon_size}"\
												  "px; margin: 0; padding: 0; border: none; background: none"
	mc_icon_node['src'] = "http://upload.wikimedia.org/wikipedia/commons/thumb/2/20"\
												"/Metacritic.svg/120px-Metacritic.svg.png"
	a_node.add_child(mc_icon_node)
end

def add_imdb_icon(span_node, this_movie)
	a_node = attach_link_for_icon(span_node, this_movie.imdb_url)

	imdb_icon_node = Nokogiri::XML::Node.new('img', @page)
	imdb_icon_size = "11"
	imdb_icon_node['style'] = "height: #{imdb_icon_size}px; width: #{imdb_icon_size}" + 
														"px; margin: 0 5px 0 0; padding: 0; border: none; background: none"
	imdb_icon_node['src'] = "http://media.idownloadblog.com/wp-content/uploads/2012/12/imdb_icon.jpg"
	
	a_node.add_child(imdb_icon_node)
end

def add_rt_text(span_node, this_movie)
	span_node2 = Nokogiri::XML::Node.new('span', @page)
	span_node2['style'] = "margin: 0 5px 0 5px"
	span_node2.content = this_movie.tomatometer.to_s + "/" + this_movie.audience.to_s + "%"
	span_node.add_child(span_node2)
end

def add_mc_text(span_node, this_movie)
	span_node2 = Nokogiri::XML::Node.new('span', @page)
	span_node2['style'] = "margin: 0 5px 0 5px"
	span_node2.content = this_movie.metascore.to_s
	span_node.add_child(span_node2)
end

def add_imdb_text(span_node, this_movie)
	text = Nokogiri::XML::Text.new(this_movie.imdb_rating.to_s, @page)
	span_node.add_child(text)
end

def fetch_page
	#Get the HTML/CSS/other files for the complete Apple Trailers @page
	#To view locally offline, add --convert-links after --quiet
	#system('wget -P tmp -p --user-agent="' + request.env["HTTP_USER_AGENT"] + 
	#			'" --header="Accept:' + request.env["HTTP_ACCEPT"] + '" --header="Accept-Language:' + 
	#			request.env["HTTP_ACCEPT_LANGUAGE"] + '" ' + APPLE_SITE)

	system('wget -P tmp -p --user-agent="' + 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36'\
		'(KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36' + '" ' + APPLE_SITE)
end

def load_html
	@page = Nokogiri::HTML(open("tmp/trailers.apple.com/index.html"))
end

def load_123
	@nav = Nokogiri::HTML(open("public/pagenav.html"))
end

def put_nav_script #HACK
	head = @page.at_css "head"
	script = Nokogiri::XML::Node.new('script', @page)
	script['type'] = "text/javascript"
	script.content = File.read("#{Rails.root}/app/assets/javascripts/nav.js")
	head.add_child(script)
end

def remove_most_pop
	#This part of Apple's scripts was causing some errors, so take it out
	scripts = @page.css "script"
	scripts.each do |s|
		if s.content and s.content.include? "most_pop"
			s.remove
		end
	end
end

def insert_123(some_div)
	nav_div = @nav.at_css "div"
	some_div.add_child(nav_div)
end

def add_rating_info(span_node, this_movie)
	if this_movie.tomatometer >= 0
		add_rt_icon(span_node, this_movie)
		add_rt_text(span_node, this_movie)
	end
	if this_movie.metascore >= 0
		add_mc_icon(span_node, this_movie)
		add_mc_text(span_node, this_movie)
	end
	if this_movie.imdb_rating >= 0
		add_imdb_icon(span_node, this_movie)
		add_imdb_text(span_node, this_movie)
	end
end

def remove_garbage
	remove_script_includes
	remove_css_includes
	remove_most_pop 
	remove_sortnav
end

def main_trailers_div
	trailers = @page.at_css "#trailers"
	some_div = Nokogiri::XML::Node.new('div', @page)
	trailers.add_child(some_div)
	some_div
end

def insert_all_movies(main_div)
	ul_node = Nokogiri::XML::Node.new('ul', @page)
	main_div.add_child(ul_node)
	(0..FEED_LENGTH - 1).each do |i|
		this_movie = Movie.find_by(order: i)
		li_node = Nokogiri::XML::Node.new('li', @page)
		li_node['id'] = "m" + i.to_s
		
		li_node['style'] = "display: none" if i >= FILMS_DISPLAYED
		
		ul_node.add_child(li_node)
		a_node = Nokogiri::XML::Node.new('a', @page)
		a_node['href'] = this_movie.trailer_url
		li_node.add_child(a_node)
		img_node = Nokogiri::XML::Node.new('img', @page)
		img_node['src'] = this_movie.poster_url
		a_node.add_child(img_node)
		h3_node = Nokogiri::XML::Node.new('h3', @page)
		h3_node['style'] = "overflow: visible"
		a_node.add_child(h3_node)
		a_node2 = Nokogiri::XML::Node.new('a', @page)
		a_node2['href'] = this_movie.trailer_url
		a_node2.content = trim_title(this_movie.title)
		h3_node.add_child(a_node2)
		br_node = Nokogiri::XML::Node.new('br', @page)
		h3_node.add_child(br_node)
		span_node = Nokogiri::XML::Node.new('span', @page)

		add_rating_info(span_node, this_movie)

		span_node['class'] = "exclusive"
		span_node['style'] = "text-indent: 0px; font-size: 11px; background: none; margin-bottom: -11px" 
		h3_node.add_child(span_node)
	end
end

def modify_page
	remove_garbage
	main_div = main_trailers_div

	load_123 #View more movies after the first page
	insert_123(main_div)

	insert_all_movies(main_div)
end

def write_page
	File.open("#{Rails.root}/tmp/trailers.apple.com/index.html",
						'w') {|f| f.print(@page.at_css("body").to_html)}
end

def put_time
	breadcrumbs = @page.at_css "#breadcrumbs"
	kids = breadcrumbs.children
	kids[kids.size - 1].content = Time.new.to_s
end

def remove_sortnav
	sortnav = @page.at_css "#sortnav"
	sortnav.remove
end

def remove_script_includes
	#We want to find a script tag with an attribute 'src' that includes 's_code' and remove it
	scripts = @page.css "script"
	scripts.each do |s|
		if s['src'] #and s['src'].include? "s_code"
			s.remove
		end
	end
end

def remove_css_includes
	scripts = @page.css "link"
	scripts.each do |s|
		if s['rel'] 
			s.remove
		end
	end
end

def wipe_temp
	FileUtils.rm_rf('tmp/trailers.apple.com')
end

def save_body
	SiteCopy.delete_all 
	@SiteCopy = SiteCopy.new
	@SiteCopy.block = @page.at_css("body").children.to_html
	@SiteCopy.save
end

desc "This task is called by the Heroku scheduler add-on"
task :fetch_and_save_body => :environment do 
	#wipe_temp  
	fetch_page
	load_html
	modify_page
	#write_page
	save_body

	#old stuff
	#render layout: false, body: @page.at_css("body").children.to_html
	#render "tmp/trailers.apple.com/index.html" #This is rendered in the body of the HTML
end