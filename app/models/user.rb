class User < ActiveRecord::Base
	has_many :faqs
	has_many :ratings
	has_many :comments
end
