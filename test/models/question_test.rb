require 'test_helper'

class QuestionTest < ActiveSupport::TestCase
  
  test "Create question" do
  	@ques1 = questions(:ques1)
  	assert @ques1.save
  end
end
