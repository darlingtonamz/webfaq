class QuestionsController < ApplicationController

  before_action :find_faq

  def index
  	@questions = Question.where(faq_id:@faq.id)
  end

  def new
  	@question = Question.new
    @question.faq_id = params[:faq_id]
  end

  def create
  	@question = Question.new(question_param)
  	@question.faq_id = params[:faq_id]
    if @question.save
      redirect_to user_faq_questions_path()
    else
      render 'show'
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

  private
    def question_param
    	params.require(:question).permit(:content, :answer)
    end

   def find_faq
      if params[:faq_id]
        @faq = Faq.find(params[:faq_id])
      end
    end
end
