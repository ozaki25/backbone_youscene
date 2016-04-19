var Framework = require('./vendor/Framework');
var Logger = require('./vendor/Logger');
var Blog = require('./models/Blog');
var Blogs = require('./collections/Blogs');
var HeaderView = require('./views/HeaderView');
var IndexView = require('./views/blogs/IndexView');
var NewView = require('./views/blogs/NewView');
var EditView = require('./views/blogs/EditView');
var ShowView = require('./views/blogs/ShowView');

var blogs = new Blogs();

var appRouter =  Framework.AppRouter.extend({
    appRoutes: {
        ''               : 'index',
        'blogs'          : 'index',
        'blogs/new'      : 'newBlog',
        'blogs/:id/edit' : 'edit',
        'blogs/:id'      : 'show'
    },
    initialize: function() {
        App.getRegion('header').show(new HeaderView());
    },
    controller: {
        index : function index() {
            blogs.fetch().done(function() {
                App.getRegion('main').show(new IndexView({collection: blogs}));
            });
        },
        newBlog : function newBlog() {
            App.getRegion('main').show(new NewView({collection: blogs}));
        },
        edit : function edit(id) {
            var blog = new Blog({id: id});
            blog.fetch().done(function() {
                App.getRegion('main').show(new EditView({model: blog}));
            });
        },
        show : function show(id) {
            var blog = new Blog({id: id});
            blog.fetch().done(function() {
                App.getRegion('main').show(new ShowView({model: blog}))
            });
        }
    }
});

var App = new Framework.Application({
    initialize: function(options) {
        Logger.clear();
    },
    router: appRouter,
    regions: {
        main: '#main',
        header: '#header',
        sideMenu: '#side_menu'
    }
});

App.start();
