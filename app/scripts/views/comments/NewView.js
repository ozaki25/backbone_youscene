var Framework = require('../../vendor/Framework');

module.exports = Framework.ItemView.extend({
    moduleName: 'comments/NewView',
    template: '#new_comment_view',
    ui: {
        content: 'textarea#content'
    },
    events: {
        'click #create_comment': 'create'
    },
    create: function() {
        this.collection.create({
            content: this.ui.content.val().trim()
        }, {wait : true});
        this.ui.content.val('');
    }
});
