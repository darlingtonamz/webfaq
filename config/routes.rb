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
  
  resources :questions, only: [:upvote, :downvote] do
    member do
      put "like", to: "questions#upvote"
      put "dislike", to: "questions#downvote"
    end  
  end
  
  resources :comments
end

  root to: "users#show"
end
