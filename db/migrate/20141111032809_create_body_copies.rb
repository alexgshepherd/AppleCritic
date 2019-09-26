class CreateBodyCopies < ActiveRecord::Migration
  def change
    create_table :body_copies do |t|
      t.text :block

      t.timestamps
    end
  end
end
