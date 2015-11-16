class UsersController < ApplicationController
  def index
    @user = User.new
  end

  def create
    @user = User.new(user_param)
    if @user.save
      flash[:notice] = 'Signup successful'
      render :show
    else
      render 'index'
    end

  end

  def new
  end

  def show
    @user = User.find(params[:id])
  end

  def update
  end

  def destroy
  end

  private
  def user_param
    params.require(:user).permit(:name, :email)
  end

end
