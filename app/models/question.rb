class Question < ActiveRecord::Base
	belongs_to :faq
	has_many :ratings
	has_many :comments, dependent: :delete_all
end
