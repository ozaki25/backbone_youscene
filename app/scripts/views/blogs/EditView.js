var Backbone = require('backbone');
var Marionette = require('backbone.marionette');

module.exports = Marionette.ItemView.extend({
    template: '#edit_view',
    ui: {
        title: 'input#title',
        author: 'input#author',
        content: 'textarea#content'
    },
    events: {
        'click #update_blog': 'update'
    },
    update: function() {
        this.model.save({
            title: this.ui.title.val(),
            author: this.ui.author.val(),
            content: this.ui.content.val()
        });
        Backbone.history.navigate('', {trigger:true});
    }
});
