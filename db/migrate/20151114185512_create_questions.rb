class CreateQuestions < ActiveRecord::Migration
  def change
    create_table 	:questions do |t|
      t.string 		:content
      t.string 		:answer
      t.references 	:faq, index: true, 
      				foreign_key: true
      t.timestamps 		   null: false
    end
  end
end
