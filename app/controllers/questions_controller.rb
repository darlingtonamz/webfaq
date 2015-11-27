class QuestionsController < ApplicationController

  before_action :find_faq
  before_action :find_user

  def index
  	@questions = Question.where(faq_id:@faq.id)
    @question = Question.new
  end

  def new
  	@question = Question.new
    @question.faq_id = params[:faq_id]
  end

  def create
  	@question = Question.new(question_param)
  	@question.faq_id = params[:faq_id]

    respond_to do |format|
      if @question.save
        format.html {redirect_to user_faq_questions_path()}
      else
        format.html {redirect_to :back, notice: 'Error creating content.'}
      end
    end
  end

  def show
  	@question = Question.find(params[:id])
  end

  def edit
    @question = Question.find(params[:id])
  end

  def update
  	@question = Question.find(params[:id])
    if @question.update_attributes(question_param)
      render :show
    else
      render 'edit'
    end
  end

  def destroy
  	@question = Question.find(params[:id]).destroy
  	redirect_to user_faq_questions_path()
  end

  def upvote
    @question = Question.find(params[:id])
    @question.upvote_by current_user
    redirect_to :back
  end
  def downvote
    @question = Question.find(params[:id])
    @question.downvote_by current_user
    redirect_to :back
 end
  private
    def question_param
      params.require(:question).permit(:content, :answer)
    end

   def find_faq
      if params[:faq_id]
        @faq = Faq.find(params[:faq_id])
      end
    end

    def find_user
      if params[:user_id]
        @user = current_user.id
      end
    end

end
