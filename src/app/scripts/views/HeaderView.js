var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');

module.exports = Marionette.ItemView.extend({
    template: '#header_view',
    initialize: function() {
        console.log('HeaderView', 'initialize', new Date());
    }
});
