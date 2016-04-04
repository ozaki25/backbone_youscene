var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');

module.exports = Marionette.ItemView.extend({
    template: '#new_view',
    events: {
        'click #create_blog': 'create'
    },
    initialize: function() {
        console.log('New', 'initialize', new Date());
    },
    create: function() {
        console.log('create', 'render', new Date());
        this.collection.create({
            title: this.$('input#title').val(),
            author: this.$('input#author').val(),
            content: this.$('textarea#content').val()
        });
        Backbone.history.navigate('', {trigger:true});
    }
});
