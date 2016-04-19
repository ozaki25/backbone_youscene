var Backbone = require('backbone');
var Framework = require('../../vendor/Framework');

module.exports = Framework.ItemView.extend({
    moduleName: 'comment/CommentView',
    tagName:  'div',
    template: '#comment_view'
});

