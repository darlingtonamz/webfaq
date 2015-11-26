class Rating < ActiveRecord::Base
	belongs_to :user
	belongs_to :question
	acts_as_votable
	def score
      self.get_upvotes.size - self.get_downvotes.size
    end
end

