class User < ActiveRecord::Base
	has_many :faqs
	has_many :ratings
	has_many :comments

	validates :name, 		presence: true,
							  format: {with: /[a-zA-Z]/}
	validates :email, 		presence: true

end
