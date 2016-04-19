var Backbone = require('backbone');
var Framework = require('../../vendor/Framework');

module.exports = Framework.ItemView.extend({
    moduleName: 'BlogView',
    tagName:  'div',
    template: '#blog_view',
    ui: {
        title: '.title'
    },
    events: {
        'click @ui.title': 'show'
    },
    show: function(e) {
        e.preventDefault();
        var id = this.ui.title.attr('id');
        Backbone.history.navigate('/blogs/' + id, {trigger: true});
    }
});

