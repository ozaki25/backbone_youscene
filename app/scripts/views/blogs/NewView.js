var Backbone = require('backbone');
var Framework = require('../../vendor/Framework');

module.exports = Framework.ItemView.extend({
    moduleName: 'blogs/NewView',
    template: '#new_blog_view',
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
        }, {wait : true});
        Backbone.history.navigate('', {trigger:true});
    }
});
