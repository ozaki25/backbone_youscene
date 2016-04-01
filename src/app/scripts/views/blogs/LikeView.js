var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');

module.exports = Marionette.View.extend({
    template: _.template(
        '<button id="like_btn" class="btn btn-sm btn-youscene">Like!</button>' +
        '<span> <%- likes %> 人</span>'
    ),
    events: {
    },
    initialize: function() {
        console.log('LikeView', 'initialize', new Date());
    },
    render: function() {
        console.log('LikeView', 'render', new Date());
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});