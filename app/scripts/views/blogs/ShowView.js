var Backbone = require('backbone');
var Framework = require('../../vendor/Framework');
var Comments = require('../../collections/Comments');
var LikeView = require('./LikeView');
var IndexCommentView = require('../comments/IndexView');
var NewCommentView = require('../comments/NewView');


module.exports = Framework.LayoutView.extend({
    moduleName: 'blogs/ShowView',
    template: '#show_blog_view',
    ui: {
        edit: '#edit_blog',
        destroy: '#delete_blog',
        like: '#like_btn'
    },
    regions: {
        comments: '#comment_list',
        newComment: '#new_comment',
        like: '#like_count'
    },
    events: {
        'click @ui.edit': 'edit',
        'click @ui.destroy': 'destroyBlog',
        'click @ui.like': 'addLike'
    },
    onRender: function() {
        var comments = new Comments(this.model.get('comments'));
        comments.url = this.model.url() + '/comments';
        this.getRegion('comments').show(new IndexCommentView({collection: comments}));
        this.getRegion('newComment').show(new NewCommentView({collection: comments}));
        this.getRegion('like').show(new LikeView({model: this.model}))
    },
    edit: function() {
        Backbone.history.navigate('/blogs/' + this.model.get('id') + '/edit', {trigger: true});
    },
    destroyBlog: function() {
        var isDestroy = confirm('削除してよろしいですか。');
        if(isDestroy) {
            this.model.destroy().done(function() {
                Backbone.history.navigate('', {trigger: true});
            });
        } else {
            return;
        }
    },
    addLike: function() {
        this.model.save({likes: this.model.get('likes') + 1});
    }
});
