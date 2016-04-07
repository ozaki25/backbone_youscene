var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
    urlRoot: 'http://localhost:3001/blogs',
    defaults: function() {
        return {
            title: 'タイトル',
            content: '内容',
            author: 'テストユーザ',
            likes: 0
        };
    }
});
