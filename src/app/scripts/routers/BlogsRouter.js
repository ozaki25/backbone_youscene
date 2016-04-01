var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var Blog = require('../models/Blog');
var Blogs = require('../collections/Blogs');
var RootView = require('../views/RootView');
var HeaderView = require('../views/HeaderView');
var IndexView = require('../views/blogs/IndexView');
var NewView = require('../views/blogs/NewView');
var EditView = require('../views/blogs/EditView');
var ShowView = require('../views/blogs/ShowView');

module.exports =  Marionette.AppRouter.extend({
    appRoutes: {
        ''               : 'index',
        'blogs'          : 'index',
        'blogs/new'      : 'newBlog',
        'blogs/:id/edit' : 'edit',
        'blogs/:id'      : 'show'
    },
    initialize: function() {
        console.log('Rotuer', 'initialize', new Date());
        var header = new HeaderView();
        header.render();
    },
    controller: {
        index : function index() {
            console.log('Rotuer', 'index', new Date());
            var root = new RootView();
            var index = new IndexView({collection: new Blogs});
            root.main.show(index);
        },
        newBlog : function newBlog() {
            console.log('Router', 'newBlog', new Date());
            var newBlog = new NewView({collection: new Blogs});
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

