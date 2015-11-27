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

  def show_with_token
    @faq = Faq.find_by(id: params[:id])
    if @faq
      #TODO: Verify that request is coming from the website registered by the user
      # whose token was given.
      if @faq.user.token == params[:token] #&& request.headers[:REFERER] == @faq.user.website_domain
        respond_to do |format|
          format.json { render json: @faq.questions }
        end
      else
        head :unauthorized
      end
    else
      head :not_found
    end
  end

  def edit
    @faq = Faq.find(params[:id])
  end

  def update
    @faq = Faq.find(params[:id])
    if @faq.update_attributes(faq_param)
      redirect_to user_faqs_path(@faq.user_id)
    else
      redirect_to edit_user_faq_path(@faq.user_id, @faq)
    end
  end

  def destroy
  	@faq = Faq.find(params[:id]).destroy
  	respond_to do |format|
  		format.html { redirect_to user_faqs_path(@faq.user_id)}
  		format.js
	  end
  end

  private
    def faq_param
      params.require(:faq).permit(:title)
    end
end
