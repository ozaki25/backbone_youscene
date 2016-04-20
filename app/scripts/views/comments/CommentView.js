var Backbone = require('backbone');
var Framework = require('../../vendor/Framework');
var ShowView = require('./ShowView');
var EditView = require('./EditView');

module.exports = Framework.LayoutView.extend({
    moduleName: 'comment/CommentView',
    tagName:  'div',
    template: '#comment_view',
    ui: {
        edit: '.edit-comment',
        destroy: '.delete-comment',
        cancelEdit: '.cancel-edit-comment'
    },
    regions: {
        content: '.comment'
    },
    events: {
        'click @ui.edit': 'edit',
        'click @ui.destroy': 'destroyComment',
        'click @ui.cancelEdit': 'cancelEdit'
    },
    modelEvents: {
        'change': 'show'
    },
    onRender: function() {
        this.show();
    },
    show: function() {
        this.getRegion('content').show(new ShowView({model: this.model}));
    },
    edit: function(e) {
        e.preventDefault();
        this.getRegion('content').show(new EditView({model: this.model}));
    },
    cancelEdit: function(e) {
        e.preventDefault();
        this.show();
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

