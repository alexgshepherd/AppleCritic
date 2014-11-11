class MovieController < ApplicationController

	http_basic_authenticate_with name: ENV["USERNAME"], password: ENV["PASSWORD"], only: :display_page

	def display_page
	end	

end