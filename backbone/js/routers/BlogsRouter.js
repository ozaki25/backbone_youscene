var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var Blog = require('../models/Blog');
var Blogs = require('../collections/Blogs');
var IndexView = require('../views/blogs/IndexView');
var NewView = require('../views/blogs/NewView');
var EditView = require('../views/blogs/EditView');
var ShowView = require('../views/blogs/ShowView');

module.exports =  Backbone.Router.extend({
    routes : {
        ''         : 'index',
        'index'    : 'index',
        'new'      : 'newBlog',
        ':id/edit' : 'edit',
        ':id'      : 'show'
    },
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

});
