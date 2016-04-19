var Backbone = require('backbone');
var Framework = require('../vendor/Framework');

module.exports = Framework.ItemView.extend({
    moduleName: 'HeaderView',
    template: '#header_view',
    ui: {
        indexBlogLink: '#top_link',
        newBlogLink: '#new_blog_link'
    },
    events: {
        'click @ui.indexBlogLink': 'indexBlog',
        'click @ui.newBlogLink': 'newBlog'
    },
    indexBlog: function(e) {
        e.preventDefault();
        Backbone.history.navigate('', {trigger: true});
    },
    newBlog: function(e) {
        e.preventDefault();
        Backbone.history.navigate('/blogs/new', {trigger: true});
    }
});
