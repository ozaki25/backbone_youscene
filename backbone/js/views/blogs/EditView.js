var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');

module.exports = Backbone.View.extend({
    el: $('#main'),
    template: _.template(
        '<div class="row edit-blog">' +
            '<div class="col-md-10 col-md-offset-1">' +
                '<div class="form-group">' +
                    '<label>タイトル</label>' +
                    '<input type="text" id="title" class="form-control" value="<%- title%>">' +
                '</div>' +
                '<div class="form-group">' +
                    '<label>投稿者</label>' +
                    '<input type="text" id="author" class="form-control" value="<%- author %>">' +
                '</div>' +
                '<div class="form-group">' +
                    '<label>内容</label>' +
                    '<textarea id="content" class="form-control" rows="10"><%- content %></textarea>' +
                '</div>' +
                '<button id="update_blog" class="btn btn-youscene">投稿</button>' +
            '</div>' +
        '</div>'
    ),
    events: {
        'click #update_blog': 'update'
    },
    initialize: function() {
        console.log('EditView', 'initialize', new Date());
    },
    render: function() {
        console.log('EditView', 'render', new Date());
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    update: function() {
        console.log('EditView', 'update', new Date());
        this.model.save({
            title: this.$('input#title').val(),
            author: this.$('input#author').val(),
            content: this.$('textarea#content').val()
        });
        Backbone.history.navigate('', {trigger:true});
    }
});
