require 'date'

class Log < ActiveRecord::Base
	def self.update_log
		new_log = Log.new
		new_log.last_updated_at = Time.now
		new_log.save
	end
end