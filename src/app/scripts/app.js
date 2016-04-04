var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var Blogs = require('./collections/Blogs');
var HeaderView = require('./views/HeaderView');
var IndexView = require('./views/blogs/IndexView');
var NewView = require('./views/blogs/NewView');

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
            App.getRegion('main').show(new IndexView({collection: new Blogs}));
        },
        newBlog : function newBlog() {
            console.log('Router', 'newBlog', new Date());
            App.getRegion('main').show(new NewView());
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

App.start();

