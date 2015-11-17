class FaqsController < ApplicationController
  def index
  end

  def new
  	@faq = Faq.new
  	@user_id = params[:user_id]
  end

  def create
  	@faq = Faq.new(faq_param)
    if @faq.save
      render :show
    else
      render 'index'
    end
  end

  def show
  	@faq = Faq.find(params[:id])
  	@questions = @faq.questions
  end

  private
  def faq_param
    params.require(:faq).permit(:title, :user_id)
  end

end
