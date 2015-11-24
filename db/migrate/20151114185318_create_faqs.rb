class CreateFaqs < ActiveRecord::Migration
  def change
    create_table 	:faqs do |t|
      t.string 		:title
      # create user_id field
      t.references 	:user, index: true, 
      				 foreign_key: true 
      t.timestamps 			null: false
    end
  end
end
