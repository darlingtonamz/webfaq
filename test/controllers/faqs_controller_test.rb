require 'test_helper'

class FaqsControllerTest < ActionController::TestCase
  test "should show an faq" do
    get :show
    assert_template 'faqs/show'
    assert_not_nil assigns(:faq)
  end
end
