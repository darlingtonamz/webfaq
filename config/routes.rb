Rails.application.routes.draw do

  get 'faqs/:id' => 'faqs#show_with_token'

  devise_for :users
  devise_scope :user do
    
  resources :users do
    resources :faqs do
      resources :questions do
        member do
          put "like", to: "questions#upvote"
          put "dislike", to: "questions#downvote"
        end  
       end
    end
  end

  resources :comments
  resources :ratings
end

  root to: "users#show"
end
