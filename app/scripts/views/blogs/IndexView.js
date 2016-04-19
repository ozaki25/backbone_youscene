var Framework = require('../../vendor/Framework');
var BlogView = require('./BlogView');

module.exports = Framework.CompositeView.extend({
    moduleName: 'blogs/IndexView',
    template: '#index_blog_view',
    childView: BlogView,
    childViewContainer: '#blog_list'
});
