var Backbone = require('backbone');
var Framework = require('../../vendor/Framework');

module.exports = Framework.ItemView.extend({
    moduleName: 'comment/CommentView',
    tagName:  'div',
    template: '#comment_view',
    ui: {
        edit: '.edit-comment',
        destroy: '.delete-comment'
    },
    events: {
        'click @ui.edit': 'edit',
        'click @ui.destroy': 'destroyComment'
    },
    edit: function(e) {
        e.preventDefault();
    },
    destroyComment: function(e) {
        e.preventDefault();
        var isDestroy = confirm('削除してよろしいですか。');
        if(isDestroy) {
            this.model.destroy()
        } else {
            return;
        }
    }
});

