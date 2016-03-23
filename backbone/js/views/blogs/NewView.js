var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');

module.exports = Backbone.View.extend({
    el: $('#main'),
    template: _.template(
        '<div class="row new-blog">' +
            '<div class="col-md-10 col-md-offset-1">' +
                '<div class="form-group">' +
                    '<label>タイトル</label>' +
                    '<input type="text" id="title" class="form-control">' +
                '</div>' +
                '<div class="form-group">' +
                    '<label>投稿者</label>' +
                    '<input type="text" id="author" class="form-control">' +
                '</div>' +
                '<div class="form-group">' +
                    '<label>内容</label>' +
                    '<textarea id="content" class="form-control" rows="10"></textarea>' +
                '</div>' +
                '<button id="create_blog" class="btn btn-youscene">投稿</button>' +
            '</div>' +
        '</div>'
    ),
    events: {
        'click #create_blog': 'create'
    },
    initialize: function() {
        console.log('New', 'initialize', new Date());
    },
    render: function() {
        console.log('New', 'render', new Date());
        this.$el.html(this.template());
        return this;
    },
    create: function() {
        console.log('create', 'render', new Date());
        this.collection.create({
            title: this.$('input#title').val(),
            author: this.$('input#author').val(),
            content: this.$('textarea#content').val()
        });
        Backbone.history.navigate('', {trigger:true});
    }
});
