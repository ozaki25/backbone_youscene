var Framework = require('../../vendor/Framework');
var BlogView = require('./BlogView');

module.exports = Framework.CompositeView.extend({
    moduleName: 'IndexView',
    template: '#index_view',
    childView: BlogView,
    childViewContainer: '#blog_list'
});
