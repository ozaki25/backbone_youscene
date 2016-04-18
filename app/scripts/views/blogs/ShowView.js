var Backbone = require('backbone');
var Framework = require('../../vendor/Framework');
var LikeView = require('./LikeView');

module.exports = Framework.LayoutView.extend({
    template: '#show_view',
    ui: {
        edit: '#edit_blog',
        destroy: '#delete_blog',
        like: '#like_btn'
    },
    regions: {
        like: '#like_count'
    },
    events: {
        'click @ui.edit': 'edit',
        'click @ui.destroy': 'destroyBlog',
        'click @ui.like': 'addLike'
    },
    onRender: function() {
        this.getRegion('like').show(new LikeView({model: this.model}))
    },
    edit: function() {
        Backbone.history.navigate('/blogs/' + this.model.get('id') + '/edit', {trigger: true});
    },
    destroyBlog: function() {
        var isDestroy = confirm('削除してよろしいですか。');
        if(isDestroy) {
            this.model.destroy();
            Backbone.history.navigate('', {trigger: true});
        } else {
            return;
        }
    },
    addLike: function() {
        this.model.save({likes: this.model.get('likes') + 1});
        this.getRegion('like').show(new LikeView({model: this.model}))
    }
});
