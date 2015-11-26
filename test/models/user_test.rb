require 'test_helper'

class UserTest < ActiveSupport::TestCase
  
  test "should not save without email" do
  	user = User.new(name: 'Amanze', email: '')
  	assert_not user.save, "Saved without email"
  end
  
  test "should not save without name" do
  	user = User.new
  	assert_not user.save, "Saved without name"
  end

end
