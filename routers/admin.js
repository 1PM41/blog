/**
 * Created by Administrator on 2017/6/16.
 */
var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Category = require('../models/Category');
var Content = require('../models/Content');
var Contact = require('../models/Contact');
var Article = require('../models/Article');

router.use(function (req,res,next) {
    if(!req.userInfo.isAdmin){
        //如果当前用户是非管理员
        res.send('对不起，只有管理员才可以进入后台管理');
        return;
    }
    next();

});

router.get('/',function (req,res,next) {
    res.render('admin/index',{
        userInfo: req.userInfo
    });
});




//用户管理
router.get('/user',function (req,res,next) {

    /*从数据库读取所有数据
     *
     * limit(Number) : 限制获取的数据条数
     *
     *skip(Number) : 忽略数据的条数
     *
     * 每页显示2条
     * 第一页:1-2 skip:0 -> （当前页-1）*limit
     * 第二页:3-4 skip:2 ->
     *
     * req.query 获取客户get请求
     */

    var page = Number(req.query.page || 1);
    var limit = 100;
    var pages = 0;

    User.count().then(function (count) {
        //计算总页数
        pages = Math.ceil(count/limit);
        //取值不能超过pages
        page = Math.min(page,pages);
        //取值不能小于1
        page = Math.max(page,1);

        var skip = (page - 1 )*limit;

        User.find().limit(limit).skip(skip).then(function (users) {
            //console.log(users);
            res.render('admin/user_index',{
                userInfo: req.userInfo,
                users: users,
                pages:pages,
                count:count,
                limit:limit,
                page:page
            });
        });
    });
});

//分类首页

router.get('/category',function (req,res,next) {

    var page = Number(req.query.page || 1);
    var limit = 100;
    var pages = 0;

    Category.count().then(function (count) {
        //计算总页数
        pages = Math.ceil(count/limit);
        //取值不能超过pages
        page = Math.min(page,pages);
        //取值不能小于1
        page = Math.max(page,1);

        var skip = (page - 1 )*limit;

        Category.find().sort({_id:-1}).limit(limit).skip(skip).then(function (categories) {
            //console.log(users);
            res.render('admin/category_index',{
                userInfo: req.userInfo,
                categories: categories,
                pages:pages,
                count:count,
                limit:limit,
                page:page
            });
        });
    });
});

//添加分类
router.get('/category/add',function (req,res) {
    res.render('admin/category_add',{
        userInfo: req.useInfo
    });
});

//分类保存
router.post('/category/add',function (req,res) {
    //console.log(req.body)
    var name =req.body.name || '';
    if(name == ''){
        res.render('admin/error',{
            userInfo: req.userInfo,
            message: '名称不能为空'
        });
    }

    //数据库仲是否存在同名分类
    Category.findOne({
        name: name
    }).then(function (rs) {
        if(rs){
            //数据库仲已经存在该分类
            res.render('admin/error',{
                userInfo: req.userInfo,
                message: '分类已经存在了'
            })
            return Promise.reject();
        }else {
            //数据库仲不存在该分类，可以保存
            return new Category({
                name: name

            }).save();
        }
    }).then(function (newCategory) {
        res.render('admin/error',{
            userInfo: req.userInfo,
            message: '分类保存成功',
            url: '/admin/category'
        });
    });
});

//分类修改
router.get('/category/edit',function (req,res) {

    //获取要修改的分类信息，并且用表单的形式展现出来
    var id = req.query.id || '';

    //获取要修改的分类信息
    Category.findOne({
        _id: id
    }).then(function (category) {
        if(!category){
            res.render('admin/error', {
                userInfo: req.userInfo,
                message: '分类信息不存在'
            });
            return Promise.reject();
        }else {
            res.render('admin/category_edit',{
                userInfo: req.userInfo,
                category: category
            });
        }
    })
});


//分类信息修改保存
router.post('/category/edit',function (req,res) {
    //获取要修改的分类信息，并且用表单的形式展现出来
    var id = req.query.id || '';
    var name = req.body.name || '';
    //获取要修改的分类信息
    Category.findOne({
        _id: id
    }).then(function (category) {
        if(!category){
            res.render('admin/error', {
                userInfo: req.userInfo,
                message: '分类信息不存在'
            });
            return Promise.reject();
        }else {
            //当用户没有做任何的修改提交
            if (name == category.name){
                res.render('admin/success', {
                    userInfo: req.userInfo,
                    message: '修改成功',
                    url: '/admin/category'
                });
                return Promise.reject();
            }else {
                //要修改的分类名称是否已经在数据库中存在
                return Category.findOne({
                    _id:{$ne:id},
                    name:name,
                })
            }
        }
    }).then(function (sameCategory) {
        if (sameCategory){
            res.render('admin/error', {
                userInfo: req.userInfo,
                message: '数据库中已有同名分类存在'
            });
            return Promise.reject();
        }else {
            return Category.update({
                _id:id
            },{
                name: name
            });
        }
    }).then(function () {
        res.render('admin/success', {
            userInfo: req.userInfo,
            message: '修改成功',
            url: '/admin/category'
        });
    });
});

//分类删除
router.get('/category/delete',function (req,res) {

    //获取要修改的分类信息，并且用表单的形式展现出来
    var id = req.query.id || '';

    Category.remove({
        _id: id
    }).then(function () {
        res.render('admin/success', {
            userInfo: req.userInfo,
            message: '删除成功',
            url: '/admin/category'
        });
    });
});


//内容首页
router.get('/content',function (req,res) {
    var page = Number(req.query.page || 1);
    var limit = 100;
    var pages = 0;

    Content.count().then(function (count) {
        //计算总页数
        pages = Math.ceil(count/limit);
        //取值不能超过pages
        page = Math.min(page,pages);
        //取值不能小于1
        page = Math.max(page,1);

        var skip = (page - 1 )*limit;

        Content.find().limit(limit).skip(skip).populate(['category','user']).sort({addTime:-1}).then(function (Contents) {
            res.render('admin/content_index',{
                userInfo: req.userInfo,
                contents: Contents,
                pages:pages,
                count:count,
                limit:limit,
                page:page
            });
        });
    });
});

//内容添加
router.get('/content/add',function (req,res) {
    Category.find().sort({_id: -1}).then(function (categories) {
        //console.log(categories);
        res.render('admin/content_add',{
            userInfo: req.userInfo,
            categories: categories
        })
    });

});

//内容保存
router.post('/content/add',function (req,res) {
    //console.log(req.body)
    if (req.body.category == ''){
        res.render('admin/error',{
            userInfo: req.userInfo,
            message:'内容分类不能为空'
        })
        return;
    }
    if (req.body.title == ''){
        res.render('admin/error',{
            userInfo: req.userInfo,
            message:'内容标题不能为空'
        })
        return;
    }
    //保存数据到数据库
    new Content({
        category: req.body.category,
        title: req.body.title,
        artist: req.body.artist,
        album: req.body.album,
        time: req.body.time,
        ranking: req.body.ranking,
        last: req.body.last,
        peak: req.body.peak,
        weeks: req.body.weeks,
        audio: req.body.audio,
        user:  req.userInfo._id.toString(),
        description: req.body.description,
        content: req.body.content,
        thumbnails: req.body.thumbnails
    }).save().then(function (rs) {
        res.render('admin/success',{
            userInfo: req.userInfo,
            message: '内容保存成功',
            url: '/admin/content'
        })
    });
});

//修改内容
router.get('/content/edit',function (req,res) {
    var id = req.query.id || '';
    var categories = [];
    Category.find().sort({_id: -1}).then(function (rs) {
        categories = rs;
        return Content.findOne({
            _id: id
        }).populate('category');
    }).then(function (content) {
        if(!content) {
            res.render('admin/error', {
                userInfo: req.userInfo,
                message: '指定内容不存在'
            });
            return Promise.reject();
        }else{
            res.render('admin/content_edit',{
                userInfo: req.userInfo,
                categories : categories,
                content: content
            })
        }
    });
});

//保存修改内容
router.post('/content/edit',function (req,res) {
    var id =req.query.id || '';
    if (req.body.category == ''){
        res.render('admin/error',{
            userInfo: req.userInfo,
            message:'内容分类不能为空'
        })
        return;
    }
    if (req.body.title == ''){
        res.render('admin/error',{
            userInfo: req.userInfo,
            message:'内容标题不能为空'
        })
        return;
    }
    Content.update({
        _id: id
    },{
        category: req.body.category,
        artist: req.body.artist,
        title: req.body.title,
        album: req.body.album,
        time: req.body.time,
        ranking: req.body.ranking,
        last: req.body.last,
        peak: req.body.peak,
        weeks: req.body.weeks,
        audio: req.body.audio,
        description: req.body.description,
        content: req.body.content,
        thumbnails: req.body.thumbnails
    }).then(function () {
        res.render('admin/success',{
            userInfo: req.userInfo,
            message: '内容保存成功',
            url: '/admin/content/edit?id=' + id
        })
    })
});

//内容删除
router.get('/content/delete',function (req,res) {
    var id = req.query.id || '';
    Content.remove({
        _id: id
    }).then(function () {
        res.render('admin/success', {
            userInfo: req.userInfo,
            message: '删除成功',
            url: '/admin/content'
        });
    });
});


//文章首页
router.get('/article',function (req,res) {
    var page = Number(req.query.page || 1);
    var limit = 100;
    var pages = 0;

    Content.count().then(function (count) {
        //计算总页数
        pages = Math.ceil(count/limit);
        //取值不能超过pages
        page = Math.min(page,pages);
        //取值不能小于1
        page = Math.max(page,1);

        var skip = (page - 1 )*limit;

        Article.find().limit(limit).skip(skip).populate(['user']).sort({addTime:-1}).then(function (Articles) {
            res.render('admin/article_index',{
                userInfo: req.userInfo,
                articles: Articles,
                pages:pages,
                count:count,
                limit:limit,
                page:page
            });
        });
    });
});

//文章添加
router.get('/article/add',function (req,res) {
    Article.find().sort({_id: -1}).then(function (articles) {
        //console.log(categories);
        res.render('admin/article_add',{
            userInfo: req.userInfo,
            articles: articles
        })
    });

});

//文章保存
router.post('/article/add',function (req,res) {
    //console.log(req.body)
    if (req.body.title == ''){
        res.render('admin/error',{
            userInfo: req.userInfo,
            message:'内容标题不能为空'
        })
        return;
    }
    //保存数据到数据库
    new Article({
        title: req.body.title,
        description: req.body.description,
        thumb: req.body.thumb,
        user:  req.userInfo._id.toString(),
        content: req.body.content
    }).save().then(function (rs) {
        res.render('admin/success',{
            userInfo: req.userInfo,
            message: '内容保存成功',
            url: '/admin/article'
        })
    });
});

//修改文章
router.get('/article/edit',function (req,res) {
    var id = req.query.id || '';

    Article.findOne({
        _id: id
    }).then(function (article) {
        if(!article) {
            res.render('admin/error', {
                userInfo: req.userInfo,
                message: '指定内容不存在'
            });
            return Promise.reject();
        }else{
            res.render('admin/article_edit',{
                userInfo: req.userInfo,
                article: article
            })
        }
    });
});

//保存修改文章
router.post('/article/edit',function (req,res) {
    var id =req.query.id || '';
    if (req.body.category == ''){
        res.render('admin/error',{
            userInfo: req.userInfo,
            message:'内容分类不能为空'
        })
        return;
    }
    if (req.body.title == ''){
        res.render('admin/error',{
            userInfo: req.userInfo,
            message:'内容标题不能为空'
        })
        return;
    }
    Article.update({
        _id: id
    },{
        title: req.body.title,
        description: req.body.description,
        thumb: req.body.thumb,
        user:  req.userInfo._id.toString(),
        content: req.body.content
    }).then(function () {
        res.render('admin/success',{
            userInfo: req.userInfo,
            message: '内容保存成功',
            url: '/admin/article/edit?id=' + id
        })
    })
});

//文章删除
router.get('/article/delete',function (req,res) {
    var id = req.query.id || '';
    Article.remove({
        _id: id
    }).then(function () {
        res.render('admin/success', {
            userInfo: req.userInfo,
            message: '删除成功',
            url: '/admin/article'
        });
    });
});


router.get('/contact',function (req,res,next) {

    var page = Number(req.query.page || 1);
    var limit = 100;
    var pages = 0;

    Contact.count().then(function (count) {
        //计算总页数
        pages = Math.ceil(count/limit);
        //取值不能超过pages
        page = Math.min(page,pages);
        //取值不能小于1
        page = Math.max(page,1);

        var skip = (page - 1 )*limit;

        Contact.find().sort({_id:-1}).limit(limit).skip(skip).then(function (contacts) {
            //console.log(users);
            res.render('admin/contact_index',{
                userInfo: req.userInfo,
                contacts: contacts,
                pages:pages,
                count:count,
                limit:limit,
                page:page
            });
        });
    });
});

router.get('/contact/detail',function (req,res) {

    //获取要修改的分类信息，并且用表单的形式展现出来
    var id = req.query.id || '';

    //获取要修改的分类信息
    Contact.findOne({
        _id: id
    }).then(function (contact) {
        //console.log(contact);
        if(!contact){
            res.render('admin/error', {
                userInfo: req.userInfo,
                message: '分类信息不存在'
            });
            return Promise.reject();
        }else {
            res.render('admin/contact_detail',{
                userInfo: req.userInfo,
                contact: contact
            });
        }
    })
});


router.get('/contact/delete',function (req,res) {
    var id = req.query.id || '';
    Contact.remove({
        _id: id
    }).then(function () {
        res.render('admin/success', {
            userInfo: req.userInfo,
            message: '删除成功',
            url: '/admin/contact'
        });
    });
});

module.exports = router;
