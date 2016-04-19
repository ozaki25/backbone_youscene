var Framework = require('../vendor/Framework');
var Comment = require('../models/Comment');

module.exports = Framework.Collection.extend({
    moduleName: 'CommentCollection',
    model: Comment,
    url: 'http://localhost:3001/comments'
});
