var Backbone = require('backbone');
var Marionette = require('backbone.marionette');

module.exports = Marionette.ItemView.extend({
    template: '#new_view',
    ui: {
        title: 'input#title',
        author: 'input#author',
        content: 'textarea#content'
    },
    events: {
        'click #create_blog': 'create'
    },
    create: function() {
        this.collection.create({
            title: this.ui.title.val(),
            author: this.ui.author.val(),
            content: this.ui.content.val()
        });
        Backbone.history.navigate('', {trigger:true});
    }
});
