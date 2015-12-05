require 'test_helper'

class FaqTest < ActiveSupport::TestCase
	def setup
		@faq = Faq.new(title:"Google is the way to go", user_id: 1)
	end
  
  test "create faqs" do
  	assert @faq.save
  end
end
