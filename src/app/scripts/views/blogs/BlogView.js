var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');

module.exports = Marionette.ItemView.extend({
    tagName:  'div',
    template: 'blog_view',
    initialize: function() {
        console.log('BlogView', 'initialize', new Date());
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'destroy', this.remove);
/*    },
    render: function() {
        console.log('BlogView', 'render', new Date());
        this.$el.html(this.template(this.model.toJSON()));
        return this;
*/
    }
});

