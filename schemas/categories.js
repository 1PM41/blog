/**
 * Created by Administrator on 2017/6/16.
 */

var mongoose = require('mongoose');
//分类的表结构
module.exports = new mongoose.Schema({
    //分类名
    name: String,

    //子分类
    sonName: String

});