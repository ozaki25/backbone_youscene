class CommentsController < ApplicationController
  before_action :set_blog
  before_action :set_comment, only: %i(show update destroy)

  # GET /blogs/1/comments.json
  def index
    @comments = @blog.comments
  end

  # GET /blogs/1/comments/1.json
  def show
    puts "aaaaaaaa"
  end

  # POST /blogs/1/comments.json
  def create
    @comment = @blog.comments.new(comment_params)
    respond_to do |format|
      if @comment.save
        format.json { render :show }
      else
        format.json { render json: @comment.errors }
      end
    end
  end

  # PATCH/PUT /blogs/1/comments/1.json
  def update
    respond_to do |format|
      if @comment.update(comment_params)
        format.json { render :show }
      else
        format.json { render json: @comment.errors }
      end
    end
  end

  # DELETE /blogs/1/comments/1.json
  def destroy
    @comment.destroy
    respond_to do |format|
      format.json { head :no_content }
    end
  end

  private
  def set_blog
    @blog = Blog.find(params[:blog_id])
  end

  def set_comment
    @comment = Comment.find(params[:id])
  end

  def comment_params
    params.require(:comment).permit(:author, :content, :blog_id)
  end
end
