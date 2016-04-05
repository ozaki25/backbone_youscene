var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var BlogView = require('./BlogView');

module.exports = Marionette.CompositeView.extend({
    template: '#index_view',
    childView: BlogView,
    childViewContainer: '#blog_list',
    initialize: function() {
        console.log('IndexView', 'initialize', new Date());
    }
});
