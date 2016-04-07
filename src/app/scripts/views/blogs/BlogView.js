var Marionette = require('backbone.marionette');

module.exports = Marionette.ItemView.extend({
    tagName:  'div',
    template: '#blog_view',
    initialize: function() {
        console.log('BlogView', 'initialize', new Date());
    },
});

