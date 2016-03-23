var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');

module.exports = Backbone.View.extend({
    tagName:  'div',
    template: _.template(
        '<div class="index-blog">' +
            '<div class="index-title">' +
                '<a href="#<%- id %>">' +
                    '<%- title %>' +
                '</a>' +
            '</div>' +
            '<div>' +
                '<ul class="list-inline index-blog-info">' +
                    '<li><%- author %></li>' +
                    '<li><%- updated_at %></li>' +
                '</ul>' +
            '</div>' +
        '</div>'
    ),
    events: {
    },
    initialize: function() {
        console.log('BlogView', 'initialize', new Date());
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'destroy', this.remove);
    },
    render: function() {
        console.log('BlogView', 'render', new Date());
        this.$el.html(this.template(this.model.toJSON()));
        this.input = this.$('.edit');
        return this;
    }
});
