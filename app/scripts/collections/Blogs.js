var Framework = require('../vendor/Framework');
var Blog = require('../models/Blog');

module.exports = Framework.Collection.extend({
    moduleName: 'BlogsCollection',
    model: Blog,
    url: 'http://localhost:3001/blogs',
});
