Rails.application.routes.draw do
  root to: 'blogs#index'
  resources :blogs, defaults: { format: :json } do
    resources :comments, defaults: { format: :json }
  end
end
