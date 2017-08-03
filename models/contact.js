/**
 * Created by Administrator on 2017/6/20.
 */
/**
 * Created by Administrator on 2017/6/17.
 */

var mongoose = require('mongoose');
var contactsSchema = require('../schemas/contacts');

module.exports = mongoose.model('Contact',contactsSchema);