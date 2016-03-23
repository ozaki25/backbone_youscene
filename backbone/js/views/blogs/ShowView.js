var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var LikeView = require('./LikeView');

module.exports = Backbone.View.extend({
    el: $('#main'),
    template: _.template(
        '<div class="show-blog">' +
            '<div class="show-title"><%- title %></div>' +
            '<ul class="show-blog-info list-inline">' +
                '<li><%- author %></li>' +
                '<li><%- updated_at %></li>' +
            '</ul>' +
            '<pre class="show-article"><%- content %></pre>' +
            '<div class="row">' +
                '<div id="like_count" class="col-md-6">' +
                    '<button id="like_btn" class="btn btn-sm btn-youscene">いいね！</button>' +
                    '<span> <%- likes %> 人</span>' +
                '</div>' +
                '<div class="form-inline col-md-6 text-right">' +
                    '<button id="edit_blog" class="btn btn-sm btn-youscene form-control">編集</button>' +
                    '<button id="delete_blog" class="btn btn-sm btn-default form-control">削除</button>' +
                '</div>' +
            '</div>' +
        '</div>'
    ),
    events: {
        'click #edit_blog': 'edit',
        'click #delete_blog': 'destroy',
        'click #like_btn': 'addLike'
    },
    initialize: function() {
        console.log('ShowView', 'initialize', new Date());
    },
    render: function() {
        console.log('ShowView', 'render', new Date());
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    edit: function() {
        console.log('ShowView', 'edit', new Date());
        Backbone.history.navigate(this.model.get('id') + '/edit', {trigger:true});
    },
    destroy: function() {
        console.log('ShowView', 'destroy', new Date());
        var isDestroy = confirm('削除してよろしいですか。');
        if(isDestroy) {
            this.model.destroy();
            Backbone.history.navigate('', {trigger:true});
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
