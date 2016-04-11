var Framework = require('../vendor/Framework');
var Blog = require('../models/Blog');

module.exports = Framework.Collection.extend({
    model: Blog,
    url: 'http://localhost:3001/blogs',
    initialize: function() {
        console.log('Blogs', 'initialize', new Date());
    }
});
