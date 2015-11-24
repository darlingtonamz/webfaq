class CommentsController < ApplicationController
  def index
  end

  def new
  	@comment = Comment.new
  	@question = Question.find(params[:question_id])
  end

  def create
  	@comment = Comment.new(comment_param)
  	@comment.user_id = params[:user_id]
  	@comment.question_id = params[:question_id]
    
  	respond_to do |format|
  		if @comment.save
  			format.html { }
  			format.js
  	    end
  	end
  end

  private
    def comment_param
      params.require(:comment).permit(:content, 
      								  :user_id, 
      								  :question_id)
    end
end
