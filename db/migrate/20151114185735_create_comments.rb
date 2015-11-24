class CreateComments < ActiveRecord::Migration
  def change
    create_table    :comments do |t|
      t.string      :content
      # create question_id field
      t.references  :question, index: true, 
                         foreign_key: true
      # create user_id field
      t.references  :user,     index: true, 
                         foreign_key: true
      t.timestamps  null: false
    end
  end
end
