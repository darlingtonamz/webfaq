class CommentsController < ApplicationController
  skip_before_filter :verify_authenticity_token   
  def index
  	@comments = Comment.where(question_id:params[:question_id])
  	@question = Question.find(params[:question_id])
  end

  def new
  	@comment = Comment.new
  	@question = Question.find(params[:question_id])
  end

  def create
  	@comment = Comment.new(comment_param)
  	@comment.user_id = params[:user_id]
  	@comment.question_id = params[:question_id]

    puts '@'*100
    puts cookies.inspect
    puts session[:user_id]

  	respond_to do |format|
  		if @comment.save
        format.json{render status: 201, json: '{"successful":"success"}'}
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
