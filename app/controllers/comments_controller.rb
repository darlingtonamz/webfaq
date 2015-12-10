class CommentsController < ApplicationController
  skip_before_filter :verify_authenticity_token   
  def index
  	@comments = Comment.where(question_id:params[:question_id])
  	@question = Question.find(params[:question_id])
  end

  def new
  	@question = Question.find_by(id: params[:question_id])
    @comment = @question.comments.build
  end

  def create
    if current_user
      @comment = Comment.new(comment_param)
      @comment.user = current_user
      if @comment.save
        respond_to do |format|
          format.json { render status: :created, json: @comment }
          format.html { }
          format.js
        end
      else
        head :bad_request
      end
    else
      head :unauthorized
    end
  end

  private
    def comment_param
      params.require(:comment).permit(
        :content, 
			  :user_id, 
			  :question_id
      )
    end
end
