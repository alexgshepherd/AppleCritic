class CreateMovies < ActiveRecord::Migration
  def change
    create_table :movies do |t|
      t.string :title
      t.text :poster_url
      t.text :trailer_url
      t.date :release_date
      t.integer :tomatometer
      t.integer :metascore
      t.decimal :imdb_rating
      t.integer :audience
      t.text :rt_url
      t.text :mc_url
      t.text :imdb_url
      t.integer :order

      t.timestamps
    end
  end
end
