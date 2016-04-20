class BlogsController < ApplicationController
  before_action :set_blog, only: %i(show update destroy)

  # GET /blogs.json
  def index
    @blogs = Blog.all
  end

  # GET /blogs/1.json
  def show
  end

  # POST /blogs.json
  def create
    @blog = Blog.new(blog_params)
    respond_to do |format|
      if @blog.save
        format.json { render :show }
      else
        format.json { render json: @blog.errors }
      end
    end
  end

  # PATCH/PUT /blogs/1.json
  def update
    respond_to do |format|
      if @blog.update(blog_params)
        format.json { render :show }
      else
        format.json { render json: @blog.errors }
      end
    end
  end

  # DELETE /blogs/1.json
  def destroy
    @blog.destroy
    respond_to do |format|
      format.json { head :no_content }
    end
  end

  private
  def set_blog
    @blog = Blog.find(params[:id])
  end

  def blog_params
    params.require(:blog).permit(:title, :content, :author, :likes)
  end
end
