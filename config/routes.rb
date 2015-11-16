Rails.application.routes.draw do

  resources :users
  resources :faqs
  resources :comments
  resources :questions
  resources :ratings

  root to: "application#index"
end
