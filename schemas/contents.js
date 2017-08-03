/**
 * Created by Administrator on 2017/6/16.
 */

var mongoose = require('mongoose');
//内容的表结构
module.exports = new mongoose.Schema({
    //关联字段 - 内容分类的id
    category:{
        //类型
        type:mongoose.Schema.Types.ObjectId,
        //引用
        ref: 'Category'
    },

    article:{
        //类型
        type:mongoose.Schema.Types.ObjectId,
        //引用
        ref: 'Article'
    },

    //内容标题
    title: String,

    ranking: Number,

    last: Number,

    peak: Number,

    weeks: Number,

    artist: String,
    //关联字段 - 用户id
    user:{
        //类型
        type:mongoose.Schema.Types.ObjectId,
        //引用
        ref: 'User'
    },

    addTime:{
        type:Date,
        default: new Date()
    },

    views:{
        type: Number,
        default: 0
    },

    likes:{
        type: Number,
        default: 0
    },

    //简介
    description:{
        type: String,
        default:''
    },

    //简介
    content:{
        type: String,
        default:''
    },

    //评论
    comments: {
        type: Array,
        default: []
    },

    //缩略图
    thumbnails:{
        type: String,
        default:''
    },

    //专辑
    album:{
        type: String,
        default:''

    },
    //发布日期
    time:{
        type: String,
        default:''

    },
    //歌曲链接
    audio:{
        type: String,
        default:''

    }
});