var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
    urlRoot: '/blogs',
    defaults: function() {
        return {
            title: 'タイトル',
            content: '内容',
            author: 'テストユーザ',
            likes: 0
        };
    }
});
