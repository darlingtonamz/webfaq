class User < ActiveRecord::Base
  before_create { self.token = SecureRandom.uuid }

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise 	:database_authenticatable, 
  			:registerable,
         	:recoverable, 
         	:rememberable, 
         	:trackable, 
         	:validatable
  has_many  :faqs, 	   dependent: :delete_all
  has_many  :ratings,  dependent: :delete_all
  has_many  :comments, dependent: :delete_all

  validates :email, 	         presence: true
  validates :name, 		         presence: true,
						                     format: {with: /[a-zA-Z]/}
  validates :website_domain,   presence: true,
                             uniqueness: { case_sensitive: false },
                                 format: { with: /\A[a-z0-9][a-z0-9\-]+[a-z0-9](\.[a-z]+){,2}\z/i }
end
