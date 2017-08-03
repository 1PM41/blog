/**
 * Created by Administrator on 2017/6/16.
 */

var mongoose = require('mongoose');
//内容的表结构
module.exports = new mongoose.Schema({
    //关联字段 - 内容分类的id
    user:{
        //类型
        type:mongoose.Schema.Types.ObjectId,
        //引用
        ref: 'User'
    },


    //缩略图
    thumb:{
        type: String,
        default:''
    },

    addTime:{
        type:Date,
        default: new Date()
    },

    description:{
        type: String,
        default:''
    },
    title: {
        type: String,
        default:''
    },

    content:{
        type: String,
        default:''
    },

    comments: {
        type: Array,
        default: []
    },

    isBillboard: {
        type: Boolean,
        default: false
    }
});