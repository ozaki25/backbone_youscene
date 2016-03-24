var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var Router = require('./routers/BlogsRouter');

var App = new Marionette.Application();

App.on("before:start", function(){
    new Router();
});

App.on('start', function() {
    Backbone.history.start({pushState: true});
});

App.start();

