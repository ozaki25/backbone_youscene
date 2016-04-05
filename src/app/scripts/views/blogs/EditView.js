var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');

module.exports = Marionette.ItemView.extend({
    template: '#edit_view',
    events: {
        'click #update_blog': 'update'
    },
    initialize: function() {
        console.log('EditView', 'initialize', new Date());
    },
    update: function() {
        console.log('EditView', 'update', new Date());
        this.model.save({
            title: this.$('input#title').val(),
            author: this.$('input#author').val(),
            content: this.$('textarea#content').val()
        });
        Backbone.history.navigate('', {trigger:true});
    }
});
