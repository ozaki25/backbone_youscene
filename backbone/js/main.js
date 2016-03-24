var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');

$(function(){
    var App = new Marionette.Application();

    var BlogsRouter =  Marionette.AppRouter.extend({
        appRoutes : {
            ''               : 'index',
            'blogs'          : 'index',
            'blogs/new'      : 'newBlog',
            'blogs/:id/edit' : 'edit',
            'blogs/:id'      : 'show'
        },
        controller: {
            index : function index() {
                console.log('Rotuer', 'index', new Date());
                var blogs = new Blogs();
                var index = new IndexView({collection: blogs});
                index.render();
            },
            newBlog : function newBlog() {
                console.log('Router', 'newBlog', new Date());
                var blogs = new Blogs();
                var newBlog = new NewView({collection: blogs});
                newBlog.render();
            },
            edit : function edit(id) {
                console.log('Router', 'edit', new Date());
                var blog = new Blog({id: id});
                blog.fetch()
                    .done(function() {
                        var Edit = new EditView({model: blog});
                        Edit.render();
                    })
                    .fail(function() {
                        console.log('Router', 'blog fetch failed', new Date());
                    });
            },
            show : function show(id) {
                console.log('Router', 'show', new Date());
                var blog = new Blog({id: id});
                blog.fetch()
                    .done(function() {
                        var Show = new ShowView({model: blog});
                        Show.render();
                    })
                    .fail(function() {
                        console.log('Router', 'blog fetch failed', new Date());
                    });
            }
        }
    });

    var Blog = Backbone.Model.extend({
        urlRoot: '/blogs',
        defaults: function() {
            return {
                title: 'タイトル',
                content: '内容',
                author: 'テストユーザ',
                likes: 0
            };
        }
    });

    var Blogs = Backbone.Collection.extend({
        model: Blog,
        url: '/blogs'
    });

    var BlogView = Backbone.View.extend({
        tagName:  'div',
        template: _.template(
            '<div class="index-blog">' +
                '<div class="index-title">' +
                    '<a href="/blogs/<%- id %>">' +
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
            console.log('BlogView', 'initialize', new Date());
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'destroy', this.remove);
        },
        render: function() {
            console.log('BlogView', 'render', new Date());
            this.$el.html(this.template(this.model.toJSON()));
            this.input = this.$('.edit');
            return this;
        }
    });

    var IndexView = Backbone.View.extend({
        el: $('#main'),
        template: _.template(
            '<div id="blog_list"></div>'
        ),
        events: {
        },
        initialize: function() {
            console.log('IndexView', 'initialize', new Date());
            this.listenTo(this.collection, 'reset', this.addAll);
        },
        render: function() {
            console.log('IndexView', 'render', new Date());
            this.collection.fetch({reset: true});
            this.$el.html(this.template());
            return this;
        },
        addOne: function(blog) {
            console.log('IndexView', 'addOne', new Date());
            var view = new BlogView({model: blog});
            this.$("#blog_list").append(view.render().el);
        },
        addAll: function() {
            console.log('IndexView', 'addAll', new Date());
            this.collection.each(this.addOne, this);
        }
    });

    var NewView = Backbone.View.extend({
        el: $('#main'),
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
            'click #create_blog': 'create'
        },
        initialize: function() {
            console.log('New', 'initialize', new Date());
        },
        render: function() {
            console.log('New', 'render', new Date());
            this.$el.html(this.template());
            return this;
        },
        create: function() {
            console.log('create', 'render', new Date());
            this.collection.create({
                title: this.$('input#title').val(),
                author: this.$('input#author').val(),
                content: this.$('textarea#content').val()
            });
            Backbone.history.navigate('', {trigger:true});
        }
    });

    var EditView = Backbone.View.extend({
        el: $('#main'),
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
            'click #update_blog': 'update'
        },
        initialize: function() {
            console.log('EditView', 'initialize', new Date());
        },
        render: function() {
            console.log('EditView', 'render', new Date());
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        update: function() {
            console.log('EditView', 'update', new Date());
            this.model.save({
                title: this.$('input#title').val(),
                author: this.$('input#author').val(),
                content: this.$('textarea#content').val()
            });
            Backbone.history.navigate('', {trigger:true});
        }
    });

    var ShowView = Backbone.View.extend({
        el: $('#main'),
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
            'click #edit_blog': 'edit',
            'click #delete_blog': 'destroy',
            'click #like_btn': 'addLike'
        },
        initialize: function() {
            console.log('ShowView', 'initialize', new Date());
        },
        render: function() {
            console.log('ShowView', 'render', new Date());
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        edit: function() {
            console.log('ShowView', 'edit', new Date());
            Backbone.history.navigate('/blogs/' + this.model.get('id') + '/edit', {trigger:true});
        },
        destroy: function() {
            console.log('ShowView', 'destroy', new Date());
            var isDestroy = confirm('削除してよろしいですか。');
            if(isDestroy) {
                this.model.destroy();
                Backbone.history.navigate('', {trigger:true});
            } else {
                return;
            }
        },
        addLike: function() {
            console.log('ShowView', 'addLike', new Date());
            this.model.save({likes: this.model.get('likes') + 1});
            var view = new LikeView({model: this.model});
            this.$('#like_count').html(view.render().el);
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
            console.log('LikeView', 'initialize', new Date());
        },
        render: function() {
            console.log('LikeView', 'render', new Date());
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });

    App.on("before:start", function(){
        new BlogsRouter();
    });

    App.on('start', function() {
        Backbone.history.start({pushState: true});
    });

    App.start();
});
