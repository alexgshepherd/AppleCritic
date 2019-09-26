class ChangeImdbPrecision < ActiveRecord::Migration
  def change
  	 change_column :movies, :imdb_rating, :decimal, :precision => 2, :scale => 1
  end
end
