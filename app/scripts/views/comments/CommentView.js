var Backbone = require('backbone');
var Framework = require('../../vendor/Framework');

module.exports = Framework.ItemView.extend({
    moduleName: 'comment/CommentView',
    tagName:  'div',
    template: '#comment_view',
    ui: {
        destroy: '.close'
    },
    events: {
        'click @ui.destroy': 'destroyComment'
    },
    destroyComment: function() {
        var isDestroy = confirm('削除してよろしいですか。');
        if(isDestroy) {
            this.model.destroy()
        } else {
            return;
        }
    }
});

