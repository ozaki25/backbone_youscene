var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');

$(function(){
    var Router = Backbone.Router.extend({
        routes : {
            ''         : 'index',
            'index'    : 'index',
            'new'      : 'newBlog',
            ':id/edit' : 'edit',
            ':id'      : 'show'
        },
        index : function index() {
            console.log('index');
            Index.render();
        },
        newBlog : function newBlog() {
            console.log('newBlog');
            NewBlog.render();
        },
        edit : function edit(id) {
            console.log('edit');
            var blog = new Blog({id: id});
            blog.fetch()
                .done(function() {
                    var Edit = new EditView({model: blog})
                    Edit.render();
                })
                .fail(function() {
                    console.log("blog fetch failed");
                });
        },
        show : function show(id) {
            console.log('show');
            var blog = new Blog({id: id});
            blog.fetch()
                .done(function() {
                    var Show = new ShowView({model: blog})
                    Show.render();
                })
                .fail(function() {
                    console.log("blog fetch failed");
                });
        }
    });

    var Blog = Backbone.Model.extend({
        urlRoot: "/blogs",
        defaults: function() {
            return {
                title: "empty todo...",
                content: "empty content...",
                author: "テストユーザ",
                likes: 0,
                created_at: "",
                updated_at: ""
            };
        }
    });
    var router = new Router();

    var BlogList = Backbone.Collection.extend({
        model: Blog,
        url: "/blogs"
    });
    var Blogs = new BlogList;

    var BlogView = Backbone.View.extend({
        tagName:  "div",
        template: _.template(
            '<div class="index-blog">' +
                '<div class="index-title">' +
                    '<a href="#<%- id %>">' +
                        '<%- title %>' +
                    '</a>' +
                '</div>' +
                '<div>' +
                    '<ul class="list-inline index-blog-info">' +
                        '<li><%- author %></li>' +
                        '<li><%- updated_at %></li>' +
                    '</ul>' +
                '</div>' +
            '</div>'
        ),
        events: {
        },
        initialize: function() {
            console.log("blogs initialize");
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'destroy', this.remove);
        },
        render: function() {
            console.log("blogs render");
            this.$el.html(this.template(this.model.toJSON()));
            this.input = this.$('.edit');
            return this;
        }
    });

    var IndexView = Backbone.View.extend({
        el: $("#main"),
        template: _.template(
            '<div id="blog_list"></div>'
        ),
        events: {
        },
        initialize: function() {
            console.log("index initialize");
            this.listenTo(Blogs, 'reset', this.addAll);
        },
        render: function() {
            console.log("index render");
            Blogs.fetch({reset: true});
            this.$el.html(this.template());
            return this;
        },
        addOne: function(blog) {
            console.log("addOne");
            var view = new BlogView({model: blog});
            this.$("#blog_list").append(view.render().el);
        },
        addAll: function() {
            console.log("addAll");
            Blogs.each(this.addOne, this);
        }
    });
    var Index = new IndexView;

    var NewBlogView = Backbone.View.extend({
        el: $("#main"),
        template: _.template(
            '<div class="row new-blog">' +
                '<div class="col-md-10 col-md-offset-1">' +
                    '<div class="form-group">' +
                        '<label>タイトル</label>' +
                        '<input type="text" id="title" class="form-control">' +
                    '</div>' +
                    '<div class="form-group">' +
                        '<label>投稿者</label>' +
                        '<input type="text" id="author" class="form-control">' +
                    '</div>' +
                    '<div class="form-group">' +
                        '<label>内容</label>' +
                        '<textarea id="content" class="form-control" rows="10"></textarea>' +
                    '</div>' +
                    '<button id="create_blog" class="btn btn-youscene">投稿</button>' +
                '</div>' +
            '</div>'
        ),
        events: {
            "click #create_blog": "create"
        },
        initialize: function() {
            console.log("new blog initialize");
        },
        render: function() {
            console.log("new blog render");
            this.$el.html(this.template());
            return this;
        },
        create: function() {
            console.log("create");
            Blogs.create({
                title: this.$("input#title").val(),
                author: this.$("input#author").val(),
                content: this.$("textarea#content").val()
            });
            router.navigate("", {trigger:true});
        }
    });
    var NewBlog = new NewBlogView;

    var EditView = Backbone.View.extend({
        el: $("#main"),
        template: _.template(
            '<div class="row edit-blog">' +
                '<div class="col-md-10 col-md-offset-1">' +
                    '<div class="form-group">' +
                        '<label>タイトル</label>' +
                        '<input type="text" id="title" class="form-control" value="<%- title%>">' +
                    '</div>' +
                    '<div class="form-group">' +
                        '<label>投稿者</label>' +
                        '<input type="text" id="author" class="form-control" value="<%- author %>">' +
                    '</div>' +
                    '<div class="form-group">' +
                        '<label>内容</label>' +
                        '<textarea id="content" class="form-control" rows="10"><%- content %></textarea>' +
                    '</div>' +
                    '<button id="update_blog" class="btn btn-youscene">投稿</button>' +
                '</div>' +
            '</div>'
        ),
        events: {
            "click #update_blog": "update"
        },
        initialize: function() {
            console.log("edit blog initialize");
        },
        render: function() {
            console.log("edit blog render");
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        update: function() {
            console.log("update");
            this.model.save({
                title: this.$("input#title").val(),
                author: this.$("input#author").val(),
                content: this.$("textarea#content").val()
            });
            router.navigate("", {trigger:true});
        }
    });

    var ShowView = Backbone.View.extend({
        el: $("#main"),
        template: _.template(
            '<div class="show-blog">' +
                '<div class="show-title"><%- title %></div>' +
                '<ul class="show-blog-info list-inline">' +
                    '<li><%- author %></li>' +
                    '<li><%- updated_at %></li>' +
                '</ul>' +
                '<pre class="show-article"><%- content %></pre>' +
                '<div class="row">' +
                    '<div id="like_count" class="col-md-6">' +
                        '<button id="like_btn" class="btn btn-sm btn-youscene">いいね！</button>' +
                        '<span> <%- likes %> 人</span>' +
                    '</div>' +
                    '<div class="form-inline col-md-6 text-right">' +
                        '<button id="edit_blog" class="btn btn-sm btn-youscene form-control">編集</button>' +
                        '<button id="delete_blog" class="btn btn-sm btn-default form-control">削除</button>' +
                    '</div>' +
                '</div>' +
            '</div>'
        ),
        events: {
            "click #edit_blog": "edit",
            "click #delete_blog": "destroy",
            "click #like_btn": "addLike"
        },
        initialize: function() {
            console.log("show initialize");
        },
        render: function() {
            console.log("show render");
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        edit: function() {
            console.log("edit");
            router.navigate(this.model.get("id") + "/edit", {trigger:true});
        },
        destroy: function() {
            console.log("destroy");
            var isDestroy = confirm("削除してよろしいですか。");
            if(isDestroy) {
                this.model.destroy();
                router.navigate("", {trigger:true});
            } else {
                return;
            }
        },
        addLike: function() {
            console.log("addLike")
            this.model.save({likes: this.model.get("likes") + 1});
            var view = new LikeView({model: this.model});
            this.$("#like_count").html(view.render().el);
        }
    });

    var LikeView = Backbone.View.extend({
        template: _.template(
            '<button id="like_btn" class="btn btn-sm btn-youscene">いいね！</button>' +
            '<span> <%- likes %> 人</span>'
        ),
        events: {
        },
        initialize: function() {
            console.log("like initialize");
        },
        render: function() {
            console.log("like render");
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });

    Backbone.history.start();
});
