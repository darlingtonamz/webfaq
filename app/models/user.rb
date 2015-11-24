class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
	has_many :faqs, dependent: :delete_all
	has_many :ratings, dependent: :delete_all
	has_many :comments, dependent: :delete_all

	validates :name, 		presence: true,
							  format: {with: /[a-zA-Z]/}
	validates :email, 		presence: true

end
