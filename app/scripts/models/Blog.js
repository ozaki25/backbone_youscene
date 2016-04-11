var Framework = require('../vendor/Framework');

module.exports = Framework.Model.extend({
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
