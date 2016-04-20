var $ = require('jquery');
var Framework = require('../../vendor/Framework');

module.exports = Framework.ItemView.extend({
    moduleName: 'comments/EditView',
    template: '#edit_comment_view',
    ui: {
        content: 'textarea.content',
        update: '.update_comment'
    },
    events: {
        'click @ui.update': 'update'
    },
    update: function() {
        this.model.save({
            content: this.ui.content.val()
        });
    }
});
