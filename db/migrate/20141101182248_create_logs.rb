class CreateLogs < ActiveRecord::Migration
  def change
    create_table :logs do |t|
      t.date :last_updated_at

      t.timestamps
    end
  end
end
