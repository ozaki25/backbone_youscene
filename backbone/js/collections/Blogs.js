var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var Blog = require('../models/Blog');

module.exports = Backbone.Collection.extend({
    model: Blog,
    url: '/blogs'
});
