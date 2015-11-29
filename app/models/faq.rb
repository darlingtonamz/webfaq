class Faq < ActiveRecord::Base
	belongs_to	:user
	has_many 	:questions, dependent: :delete_all
	validates 	:title, presence: true
end
