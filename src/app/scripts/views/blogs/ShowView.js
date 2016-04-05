var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var LikeView = require('./LikeView');

module.exports = Marionette.ItemView.extend({
    template: '#show_view',
    ui: {
        edit: '#edit_blog',
        destroy: '#delete_blog',
        like: '#like_btn'
    },
    events: {
        'click @ui.edit': 'edit',
        'click @ui.destroy': 'destroyBlog',
        'click @ui.like': 'addLike'
    },
    initialize: function() {
        console.log('ShowView', 'initialize', new Date());
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
        var view = new LikeView({model: this.model});
        this.$('#like_count').html(view.render().el);
    }
});
