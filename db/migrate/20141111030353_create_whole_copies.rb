class CreateWholeCopies < ActiveRecord::Migration
  def change
    create_table :whole_copies do |t|
      t.text :block

      t.timestamps
    end
  end
end
