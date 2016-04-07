var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var LikeView = require('./LikeView');

module.exports = Marionette.LayoutView.extend({
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
    initialize: function() {
        console.log('ShowView', 'initialize', new Date());
    },
    onRender: function() {
        console.log('ShowView', 'onRender', new Date());
        this.getRegion('like').show(new LikeView({model: this.model}))
    },
    edit: function() {
        console.log('ShowView', 'edit', new Date());
        Backbone.history.navigate('/blogs/' + this.model.get('id') + '/edit', {trigger: true});
    },
    destroyBlog: function() {
        console.log('ShowView', 'destroy', new Date());
        var isDestroy = confirm('削除してよろしいですか。');
        if(isDestroy) {
            this.model.destroy();
            Backbone.history.navigate('', {trigger: true});
        } else {
            return;
        }
    },
    addLike: function() {
        console.log('ShowView', 'addLike', new Date());
        this.model.save({likes: this.model.get('likes') + 1});
        this.getRegion('like').show(new LikeView({model: this.model}))
    }
});
