require 'test_helper'

class UserTest < ActiveSupport::TestCase
  
  test "should not save without email" do
  	@user = users(:user2)
  	assert @user.valid?
  end
  
  test "should not save without name" do
  	@user2 = users(:user2)
  	assert_not @user2.save, "Saved without name"
  end

end
