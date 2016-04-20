var Framework = require('../vendor/Framework');

module.exports = Framework.Model.extend({
    moduleName: 'CommentModel',
    defaults: function() {
        return {
            author: '名無しさん'
        };
    }
});
