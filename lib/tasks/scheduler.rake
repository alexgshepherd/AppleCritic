desc "This task is called by the Heroku scheduler add-on"
task :update_trailer_list => :environment do
	Movie.update_database
	#BodyCopy.whole_to_body
end

desc "This task is called by the Heroku scheduler add-on"
task :update_outer_body => :environment do 
	#wipe_temp  
	WholeCopy.fetch_page
	WholeCopy.load_html
	#modify_page
	#write_page
	WholeCopy.save_whole_page
	#old stuff
	#render layout: false, body: @page.at_css("body").children.to_html
	#render "tmp/trailers.apple.com/index.html" #This is rendered in the body of the HTML
end