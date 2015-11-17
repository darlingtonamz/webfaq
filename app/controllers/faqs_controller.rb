class FaqsController < ApplicationController
  def index
  end

  def create
  end

  def show
  	@faq = Faq.find(params[:id])
  	@questions = @faq.questions
  end
end
