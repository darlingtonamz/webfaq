class FaqsController < ApplicationController
  def index
  end

  def new
  	@faq = Faq.new
  	@user_id = params[:user_id]
  end

  def create
  	@faq = Faq.new(faq_param)
  	@faq.user_id = params[:user_id]
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

  def edit
    @faq = faq.find(params[:id])
  end

  def update
    @faq = faq.find(params[:id])
    if @faq.update_attributes(faq_param)
      render :show
    else
      render 'edit'
    end
  end

  private
  def faq_param
    params.require(:faqs).permit(:title)
  end

end
