var Framework = require('../../vendor/Framework');
var CommentView = require('./CommentView');

module.exports = Framework.CollectionView.extend({
    moduleName: 'comment/IndexView',
    childView: CommentView,
    childViewContainer: '#comment_list'
});
