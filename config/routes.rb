Rails.application.routes.draw do
  root to: 'blogs#index'
  resources :blogs, only: %i(index show update delete)
end
