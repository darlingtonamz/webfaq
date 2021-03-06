class UsersController < ApplicationController
  before_action :authenticate_user!
  
  def login
    @users = User.all
  end

  def index
    @user = User.find(params[:user_id])
  end

  def create
    @user = User.new(user_param)
    if @user.save
      render :show
    else
      render 'index'
    end

  end

  def new
    @user = User.new
  end

  def show
    @user = current_user
    #@faqs = (@user.faqs|=[])
  end

  def edit
    @user = User.find(params[:id])
  end

  def update
    @user = User.find(params[:id])
    if @user.update_attributes(user_param)
      render :show
    else
      render 'edit'
    end
  end

  def destroy
  end

  private
    def user_param
      params.require(:user).permit(:name, :email)
    end

end
