class CreateSiteCopies < ActiveRecord::Migration
  def change
    create_table :site_copies do |t|
      t.text :block

      t.timestamps
    end
  end
end
