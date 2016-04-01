var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var Router = require('./routers/BlogsRouter');

var App = new Marionette.Application();

App.on('start', function() {
    new Router();
    Backbone.history.start();
});

App.addRegions({
    mainRegion: '#main',
    sideMenuRegion: '#side_menu'
});

App.start();

