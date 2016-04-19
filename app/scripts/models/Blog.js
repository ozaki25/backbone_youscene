var Framework = require('../vendor/Framework');

module.exports = Framework.Model.extend({
    moduleName: 'BlogModel',
    urlRoot: 'http://localhost:3001/blogs',
    defaults: function() {
        return {
            likes: 0
        };
    }
});
