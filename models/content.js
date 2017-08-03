/**
 * Created by Administrator on 2017/6/20.
 */
/**
 * Created by Administrator on 2017/6/17.
 */

var mongoose = require('mongoose');
var contentsSchema = require('../schemas/contents');

module.exports = mongoose.model('Content',contentsSchema);