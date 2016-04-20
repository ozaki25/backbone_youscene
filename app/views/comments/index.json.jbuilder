json.array!(@comments) do |comment|
  json.extract! comment, :id, :author, :content, :blog_id, :created_at, :updated_at
  json.url blog_comments_url(comment, format: :json)
end
