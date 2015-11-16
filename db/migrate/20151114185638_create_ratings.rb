class CreateRatings < ActiveRecord::Migration
  def change
    create_table :ratings do |t|
      t.boolean :value
      t.integer :question_id
      # create question_id field
      t.references :question, index: true, foreign_key: true
      # create user_id field
      t.references :user, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
