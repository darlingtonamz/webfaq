class FaqsController < ApplicationController
  def index
  	@user = User.find(params[:user_id])
  	@faqs = @user.faqs
  end

  def new
  	@faq = Faq.new
  end

  def create
  	@faq = Faq.new(faq_param)
  	@faq.user_id = params[:user_id]
    
	respond_to do |format|
		if @faq.save
			format.html { redirect_to user_faqs_path(@faq.user_id)}
			format.js
	    else
	      render 'show'
	    end
	end
  end

  def show
  	@faq = Faq.find(params[:id])
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

  def destroy
  	@faq = Faq.destroy(params[:id])
  	respond_to do |format|
		format.html { redirect_to user_faqs_path(@faq.user_id)}
		format.js
	end
  end

  private
  def faq_param
    params.require(:faqs).permit(:title)

  end

end
