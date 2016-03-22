class AddLikesToBlogs < ActiveRecord::Migration
  def change
    add_column :blogs, :likes, :integer
  end
end
