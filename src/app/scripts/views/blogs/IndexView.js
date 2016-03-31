var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var BlogView = require('./BlogView');

module.exports = Marionette.View.extend({
    el: $('#content'),
    template: _.template(
        '<div id="blog_list"></div>'
    ),
    events: {
    },
    initialize: function() {
        console.log('IndexView', 'initialize', new Date());
        this.listenTo(this.collection, 'reset', this.addAll);
    },
    render: function() {
        console.log('IndexView', 'render', new Date());
        this.collection.fetch({reset: true});
        this.$el.html(this.template());
        return this;
    },
    addOne: function(blog) {
        console.log('IndexView', 'addOne', new Date());
        var view = new BlogView({model: blog});
        this.$("#blog_list").append(view.render().el);
    },
    addAll: function() {
        console.log('IndexView', 'addAll', new Date());
        this.collection.each(this.addOne, this);
    }
});
