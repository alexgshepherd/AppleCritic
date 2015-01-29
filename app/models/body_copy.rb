require 'date'
require 'unirest'
require 'open-uri'
require 'json'
require 'nokogiri'

NUM_DISPLAYED = 90
APPLE_SITE = "http://trailers.apple.com"
NO_SCORE = -1
NOT_FOUND = -2
RT_ALL_NOT_FOUND = [NOT_FOUND, NOT_FOUND, NOT_FOUND]
IURI_START = "http://www.omdbapi.com/?t="
RT_FRAGMENT = "&@page_limit=1&@page=1&apikey="
RT_URI_START = "http://api.rottentomatoes.com/api/public/v1.0/movies.json?q="
FILMS_DISPLAYED = 30
MAX_TITLE_LENGTH = 23

class BodyCopy < ActiveRecord::Base
	# This avoids abrupt, odd-looking clipping of long titles.
	def self.trim_title(title)
		title = title.strip
		if title.size > MAX_TITLE_LENGTH
			last_index_displayed = MAX_TITLE_LENGTH - 2 - 1
			title = title[0..last_index_displayed] + "..."
		end
		title
	end

	def self.attach_link_for_icon(span_node, url)
		a_node = Nokogiri::XML::Node.new('a', @page)
		a_node['href'] = url
		span_node.add_child(a_node)
		a_node
	end

	def self.add_rt_icon(span_node, this_movie)
		a_node = self.attach_link_for_icon(span_node, this_movie.rt_url)

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

	def self.add_mc_icon(span_node, this_movie)
		a_node = self.attach_link_for_icon(span_node, this_movie.mc_url)

		mc_icon_node = Nokogiri::XML::Node.new('img', @page)
		mc_icon_size = "11"
		mc_icon_node['style'] = "height: #{mc_icon_size}px; width: #{mc_icon_size}"\
													  "px; margin: 0; padding: 0; border: none; background: none"
		mc_icon_node['src'] = "http://upload.wikimedia.org/wikipedia/commons/thumb/2/20"\
													"/Metacritic.svg/120px-Metacritic.svg.png"
		a_node.add_child(mc_icon_node)
	end

	def self.add_imdb_icon(span_node, this_movie)
		a_node = self.attach_link_for_icon(span_node, this_movie.imdb_url)

		imdb_icon_node = Nokogiri::XML::Node.new('img', @page)
		imdb_icon_size = "11"
		imdb_icon_node['style'] = "height: #{imdb_icon_size}px; width: #{imdb_icon_size}" + 
															"px; margin: 0 5px 0 0; padding: 0; border: none; background: none"
		imdb_icon_node['src'] = "http://media.idownloadblog.com/wp-content/uploads/2012/12/imdb_icon.jpg"
		
		a_node.add_child(imdb_icon_node)
	end

	def self.add_rt_text(span_node, this_movie)
		span_node2 = Nokogiri::XML::Node.new('span', @page)
		span_node2['style'] = "margin: 0 5px 0 5px"
		span_node2.content = this_movie.tomatometer.to_s + "/" + this_movie.audience.to_s + "%"
		span_node.add_child(span_node2)
	end

	def self.add_mc_text(span_node, this_movie)
		span_node2 = Nokogiri::XML::Node.new('span', @page)
		span_node2['style'] = "margin: 0 5px 0 5px"
		span_node2.content = this_movie.metascore.to_s
		span_node.add_child(span_node2)
	end

	def self.add_imdb_text(span_node, this_movie)
		text = Nokogiri::XML::Text.new(this_movie.imdb_rating.to_s, @page)
		span_node.add_child(text)
	end

	def self.load_123
		# These are the numbers used to find more trailers.
		@nav = Nokogiri::HTML(open("public/pagenav.html"))
	end

	def self.put_nav_script #HACK
		head = @page.at_css "head"
		script = Nokogiri::XML::Node.new('script', @page)
		script['type'] = "text/javascript"
		script.content = File.read("#{Rails.root}/app/assets/javascripts/nav.js")
		head.add_child(script)
	end

	def self.remove_most_pop
		# This part of Apple's scripts was causing some errors earlier.
		scripts = @page.css "script"
		scripts.each do |s|
			if s.content and s.content.include? "most_pop"
				s.remove
			end
		end
	end

	def self.insert_123(some_div)
		nav_div = @nav.at_css "div"
		some_div.add_child(nav_div)
	end

	def self.add_rating_info(span_node, this_movie)
		if this_movie.tomatometer >= 0
			self.add_rt_icon(span_node, this_movie)
			self.add_rt_text(span_node, this_movie)
		end
		if this_movie.metascore >= 0
			self.add_mc_icon(span_node, this_movie)
			self.add_mc_text(span_node, this_movie)
		end
		if this_movie.imdb_rating >= 0
			self.add_imdb_icon(span_node, this_movie)
			self.add_imdb_text(span_node, this_movie)
		end
	end

	def self.remove_useless_stuff
		self.remove_script_includes
		self.remove_css_includes
		self.remove_most_pop 
		self.remove_sortnav
	end

	def self.main_trailers_div
		# This is just "stuff" needed to match Apple's CSS.
		trailers = @page.at_css "#trailers"
		some_div = Nokogiri::XML::Node.new('div', @page)
		trailers.add_child(some_div)
		some_div
	end

	def self.insert_all_movies(main_div)
		ul_node = Nokogiri::XML::Node.new('ul', @page)
		main_div.add_child(ul_node)
		total = [NUM_DISPLAYED, Movie.count].min
		(0..total - 1).each do |i|
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
			a_node2.content = self.trim_title(this_movie.title)
			h3_node.add_child(a_node2)
			br_node = Nokogiri::XML::Node.new('br', @page)
			h3_node.add_child(br_node)
			span_node = Nokogiri::XML::Node.new('span', @page)

			self.add_rating_info(span_node, this_movie)

			span_node['class'] = "exclusive"
			span_node['style'] = "text-indent: 0px; font-size: 11px; background: none; margin-bottom: -11px" 
			h3_node.add_child(span_node)
		end
	end

	def self.modify_page
		self.remove_useless_stuff
		main_div = self.main_trailers_div

		self.load_123 
		self.insert_123(main_div)

		self.insert_all_movies(main_div)
	end

	def self.write_page
		File.open("#{Rails.root}/tmp/trailers.apple.com/index.html",
							'w') {|f| f.print(@page.at_css("body").to_html)}
	end

	def self.put_time
		# This was only used for testing. 
		breadcrumbs = @page.at_css "#breadcrumbs"
		kids = breadcrumbs.children
		kids[kids.size - 1].content = Time.new.to_s
	end

	def self.remove_sortnav
		sortnav = @page.at_css "#sortnav"
		sortnav.remove
	end

	def self.remove_script_includes
		scripts = @page.css "script"
		scripts.each do |s|
			if s['src'] 
				s.remove
			end
		end
	end

	def self.remove_css_includes
		scripts = @page.css "link"
		scripts.each do |s|
			if s['rel'] 
				s.remove
			end
		end
	end

	def self.wipe_temp
		# Useless 
		FileUtils.rm_rf('tmp/trailers.apple.com')
	end

	def self.get_stored_whole_copy
		@page = Nokogiri::HTML(WholeCopy.first.block)
	end

	def self.whole_to_body
		self.get_stored_whole_copy
		self.modify_page
		self.update_stored_body
	end

	def self.update_stored_body
		BodyCopy.delete_all
		body = BodyCopy.new
		body.block = @page.at_css("body").children.to_html
		body.save
	end
end