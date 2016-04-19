json.array!(@comments) do |comment|
  json.extract! comment, :id, :author, :content, :blog_id, :created_at, :updated_at
  json.url comment_url(comment, format: :json)
end
