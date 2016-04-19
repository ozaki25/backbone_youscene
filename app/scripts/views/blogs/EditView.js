var Backbone = require('backbone');
var Framework = require('../../vendor/Framework');

module.exports = Framework.ItemView.extend({
    moduleName: 'EditView',
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
        }).done(function() {
            Backbone.history.navigate('', {trigger:true});
        });
    }
});
