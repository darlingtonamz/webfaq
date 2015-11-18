class Faq < ActiveRecord::Base
	belongs_to :user
	has_many :questions, dependent: :delete_all
end
