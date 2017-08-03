/**
 * Created by Administrator on 2017/6/16.
 */

var mongoose = require('mongoose');
//分类的表结构
module.exports = new mongoose.Schema({
    //名称
    name: String,

    phone: Number,

    email: String,

    userContact: String,

    reply:{
        type: Boolean,
        default: false
    }

});