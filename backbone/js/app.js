var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var Router = require('./routers/BlogsRouter');
var router = new Router;

Backbone.history.start();
