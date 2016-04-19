Rails.application.routes.draw do
  root to: 'blogs#index'
  resources :blogs, defaults: { format: :json }
  resources :comments, defaults: { format: :json }
end
