var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');

module.exports = Marionette.LayoutView.extend({
    template: false,
    regions: {
        main: "#main",
        sideMenu: "#side_menu"
    },
    initialize: function() {
        console.log('RootView', 'initialize', new Date());
    }
});
