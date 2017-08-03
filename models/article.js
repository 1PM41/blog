/**
 * Created by Administrator on 2017/6/20.
 */
/**
 * Created by Administrator on 2017/6/17.
 */

var mongoose = require('mongoose');
var articlesSchema = require('../schemas/articles');

module.exports = mongoose.model('Article',articlesSchema);