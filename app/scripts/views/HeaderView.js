var Framework = require('../vendor/Framework');

module.exports = Framework.ItemView.extend({
    template: '#header_view',
    initialize: function() {
        console.log('HeaderView', 'initialize', new Date());
    }
});
