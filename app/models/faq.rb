class Faq < ActiveRecord::Base
	belongs_to :user
	has_many :questions, dependent: :delete_all
	# TODO validates :title, presence: true
end
