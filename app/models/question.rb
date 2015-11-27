class Question < ActiveRecord::Base
	belongs_to :faq
	has_many :ratings
	acts_as_votable
	has_many :comments, dependent: :delete_all
	# TODO validates :content, :answer, presence: true

	def score
      self.get_upvotes.size - self.get_downvotes.size
    end

end
