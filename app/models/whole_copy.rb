require 'nokogiri'

class WholeCopy < ActiveRecord::Base
	def self.fetch_page
		#Get the HTML/CSS/other files for the complete Apple Trailers @page
		#To view locally offline, add --convert-links after --quiet
		#system('wget -P tmp -p --user-agent="' + request.env["HTTP_USER_AGENT"] + 
		#			'" --header="Accept:' + request.env["HTTP_ACCEPT"] + '" --header="Accept-Language:' + 
		#			request.env["HTTP_ACCEPT_LANGUAGE"] + '" ' + APPLE_SITE)

		system('wget -P tmp -p --user-agent="' + 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36'\
		'(KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36' + '" ' + APPLE_SITE)
	end

	def self.load_html
		@whole = Nokogiri::HTML(open("tmp/trailers.apple.com/index.html"))
	end

	def self.save_whole_page
		WholeCopy.delete_all 
		whole = WholeCopy.new
		whole.block = @whole.to_html
		whole.save
	end
end