var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var Blog = require('../models/Blog');

module.exports = Backbone.Collection.extend({
    model: Blog,
    url: 'http://localhost:3001/blogs',
    initialize: function() {
        console.log('Blogs', 'initialize', new Date());
    }
});
