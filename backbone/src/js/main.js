var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');

$(function(){
    var Router = Backbone.Router.extend({
        routes : {
            ''    : 'index',
            'new' : 'newBlog'
        },
        index : function index() {
            console.log('index');
            var Index = new IndexView;
        },
        newBlog : function newBlog() {
            console.log('newBlog');
            var NewBlog = new NewBlogView;
        }
    });

    var Blog = Backbone.Model.extend({
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
            '<div class="index-blog row">' +
                '<div class="index-title col-md-8">' +
                    '<a href="#">' +
                        '<%- title %>' +
                    '</a>' +
                '</div>' +
                '<div class="col-md-4 text-right">' +
                    '<ul class="list-inline">' +
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
            this.listenTo(Blogs, 'add', this.addOne);
            this.render();
            Blogs.fetch();
        },
        render: function() {
            console.log("index render");
            this.$el.html(this.template());
            return this;
        },
        addOne: function(blog) {
            console.log("addOne");
            var view = new BlogView({model: blog});
            this.$("#blog_list").append(view.render().el);
        }
    });

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
                    '<button class="btn btn-youscene">投稿</button>' +
                '</div>' +
            '</div>'
        ),
        events: {
        },
        initialize: function() {
            console.log("new blog initialize");
            this.listenTo(Blogs, 'add', this.addOne);
            this.render();
            Blogs.fetch();
        },
        render: function() {
            console.log("new blog render");
            this.$el.html(this.template());
            return this;
        }
    });
    Backbone.history.start();
});
