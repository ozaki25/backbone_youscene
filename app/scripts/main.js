var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var Blog = require('./models/Blog');
var Blogs = require('./collections/Blogs');
var HeaderView = require('./views/HeaderView');
var IndexView = require('./views/blogs/IndexView');
var NewView = require('./views/blogs/NewView');
var EditView = require('./views/blogs/EditView');
var ShowView = require('./views/blogs/ShowView');

var App = new Marionette.Application({
    regions: {
        main: '#main',
        header: '#header',
        sideMenu: '#side_menu'
    },
    onStart: function() {
        new appRouter();
        Backbone.history.start();
    }
});

var appRouter =  Marionette.AppRouter.extend({
    appRoutes: {
        ''               : 'index',
        'blogs'          : 'index',
        'blogs/new'      : 'newBlog',
        'blogs/:id/edit' : 'edit',
        'blogs/:id'      : 'show'
    },
    initialize: function() {
        console.log('Rotuer', 'initialize', new Date());
        App.getRegion('header').show(new HeaderView());
    },
    controller: {
        index : function index() {
            console.log('Rotuer', 'index', new Date());
            var blogs = new Blogs();
            blogs.fetch().done(function() {
                App.getRegion('main').show(new IndexView({collection: blogs}));
            });
        },
        newBlog : function newBlog() {
            console.log('Router', 'newBlog', new Date());
            App.getRegion('main').show(new NewView({collection: new Blogs()}));
        },
        edit : function edit(id) {
            console.log('Router', 'edit', new Date());
            var blog = new Blog({id: id});
            blog.fetch().done(function() {
                App.getRegion('main').show(new EditView({model: blog}));
            });
        },
        show : function show(id) {
            console.log('Router', 'show', new Date());
            var blog = new Blog({id: id});
            blog.fetch().done(function() {
                App.getRegion('main').show(new ShowView({model: blog}))
            });
        }
    }
});

App.start();

