require 'test_helper'

class UsersControllerTest < ActionController::TestCase

	test "user create" do
		@user1 = users(:user1)
		assert @user1.errors
	end

end
