var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');

$(function(){
    var Router = Backbone.Router.extend({
        routes : {
            ''      : 'index',
            'index' : 'index',
            'new'   : 'newBlog',
            ':id'   : 'show'
        },
        index : function index() {
            console.log('index');
            Index.render();
        },
        newBlog : function newBlog() {
            console.log('newBlog');
            NewBlog.render();
        },
        show : function show(id) {
            console.log('show');
            var blog = new Blog({id: id});
            blog.fetch()
                .done(function() {
                    Show.render(blog.attributes);
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
            router.navigate("index", {trigger:true});
        }
    });
    var NewBlog = new NewBlogView;

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
                '<div class="form-inline">' +
                    '<button id="edit_blog" class="btn btn-sm btn-youscene form-control">編集</button>' +
                    '<button id="delete_blog" class="btn btn-sm btn-default form-control">削除</button>' +
                '</div>' +
            '</div>'
        ),
        events: {
        },
        initialize: function() {
            console.log("show initialize");
        },
        render: function(blog) {
            console.log("show render");
            this.$el.html(this.template(blog));
            return this;
        }
    });
    var Show = new ShowView;

    Backbone.history.start();
});
