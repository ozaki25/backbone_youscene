var Marionette = require('backbone.marionette');

module.exports = Marionette.ItemView.extend({
    template: '#like_view',
    initialize: function() {
        console.log('LikeView', 'initialize', new Date());
    }
});
