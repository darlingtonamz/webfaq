Rails.application.routes.draw do

  resources :users do
  	resources :faqs do
  		resources :questions
  	end
  end
  resources :comments
  resources :ratings

  root to: "users#login"
end
