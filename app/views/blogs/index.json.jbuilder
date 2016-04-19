json.array!(@blogs) do |blog|
  json.extract! blog, :id, :title, :content, :author, :likes, :comments, :created_at, :updated_at
  json.url blog_url(blog, format: :json)
end
