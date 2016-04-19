var Backbone = require('backbone');
var Framework = require('../../vendor/Framework');
var Comments = require('../../collections/Comments');
var LikeView = require('./LikeView');
var CommentIndexView = require('../comments/IndexView');


module.exports = Framework.LayoutView.extend({
    moduleName: 'blogs/ShowView',
    template: '#show_blog_view',
    ui: {
        edit: '#edit_blog',
        destroy: '#delete_blog',
        like: '#like_btn'
    },
    regions: {
        comment: '#comment_list',
        like: '#like_count'
    },
    events: {
        'click @ui.edit': 'edit',
        'click @ui.destroy': 'destroyBlog',
        'click @ui.like': 'addLike'
    },
    onRender: function() {
        var comments = new Comments()
        comments.fetch().done(function() {
            filterComments = comments.where({blog_id: this.model.id})
            this.getRegion('comment').show(new CommentIndexView({collection: new Comments(filterComments)}))
        }.bind(this));
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
