var Framework = require('../../vendor/Framework');

module.exports = Framework.ItemView.extend({
    moduleName: 'blogs/LikeView',
    template: '#like_view',
    modelEvents: {
        "change:likes": 'render'
    }
});
