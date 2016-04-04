var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var BlogView = require('./BlogView');

module.exports = Marionette.CompositeView.extend({
    chiledView: BlogView,
    chiledViewContainer: $('#blog_list'),
    template: '#index_view',
    initialize: function() {
        console.log('IndexView', 'initialize', new Date());
        //this.listenTo(this.collection, 'reset', this.addAll);
    },
    onBeforeRender: function() {
        console.log('IndexView', 'onBeforeRender', new Date());
        this.collection.fetch()
        console.log(this.collection);
        console.log(this.collection.models);
        console.log(this.collection.models.length);
        this.collection.fetch()
    },
    onRender: function() {
        //this.collection.fetch({reset: true});
        console.log('IndexView', 'onRender', new Date());
        console.log(this.collection);
    },
    addOne: function(blog) {
        console.log('IndexView', 'addOne', new Date());
        //var view = new BlogView({model: blog});
        //this.$("#blog_list").append(view.render().el);
    },
    addAll: function() {
        console.log('IndexView', 'addAll', new Date());
        //this.collection.each(this.addOne, this);
    }
});
