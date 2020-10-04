Rails.application.routes.draw do
  devise_for :users do
    get '/users/sign_out' => 'devise/sessions#destroy'
  end

  resources :submissions
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'pages#main'
  get '/about', to: 'pages#about'
  get '/rules', to: 'pages#rules'
  get '/faq', to: 'pages#faq'
  get '/entries', to: 'pages#entries'
  get '/entries/:submission_id', to: 'pages#entry'
end
