class CreateRatings < ActiveRecord::Migration
  def change
    create_table :ratings do |t|
      t.boolean :value
      t.integer :question_id
      t.integer :user_id

      t.timestamps null: false
    end
  end
end
