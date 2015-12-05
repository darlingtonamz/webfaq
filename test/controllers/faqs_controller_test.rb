require 'test_helper'

class FaqsControllerTest < ActionController::TestCase
	
	def setup
		@faq = Faq.new(title: "Google is the answer", user_id: 1)
	end

  test "should show an faq" do
  	user1 = users(:user1)

    get :index, {user_id: user1.id}
    assert_template 'faqs/index'
  end

  # test "create an faq" do
  # 	user1 = users(:user1)

  # 	get :create
  # end
end
