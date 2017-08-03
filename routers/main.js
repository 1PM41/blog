/**
 * Created by Administrator on 2017/6/16.
 */
var express = require('express');
var router = express.Router();
var Category = require('../models/Category');
var Content = require('../models/Content');
var Article = require('../models/Article');
var data;
//通用数据
router.use(function (req,res,next) {
    data = {
        userInfo: req.userInfo,
        categories: [],
        contents: [],
        rankings: [],
        articles: [],
        musicRecommend : [],
        newsRecommend : [],
        ss : ''
    };
    Category.find().then(function (categories) {
        data.categories = categories;
        next();
    })
});

router.get('/',function (req,res,next) {
    res.render('main/welcome',data);
});

router.get('/display',function (req,res,next) {
    Content.find().then(function (content) {
        data.contents = content;
    }).then(function () {
        Article.find().sort({addTime:1}).then(function (content) {
            data.articles = content;
            res.json(data);
        })
    })
});

router.get('/main',function (req,res,next) {

    data.category = req.query.category || '';
    data.count = 0;
    data.page = Number(req.query.page || 1);
    data.limit = 8;
    data.pages = 0;
    data.sortType = req.query.sort || '';
    var skip =(data.page - 1) * data.limit;
    var where = {};
    if (data.category) {
        where.category = data.category;
    }
    //console.log(req.userInfo);

    /*Content.find().sort({ranking:1}).then(function (rankings) {
        data.rankings = rankings;
    });*/
    Content.where(where).count().then(function (count) {

        data.count = count;
        //计算总页数
        data.pages = Math.ceil(data.count/data.limit);
        //取值不能超过pages
        data.page = Math.min(data.page,data.pages);
        //取值不能小于1
        data.page = Math.max(data.page,1);



        return Content.where(where).find().limit(data.limit).skip(skip).populate(['category','user']);

    }).then(function (sort) {
        //console.log(data.sortType);
        //return Content.where(where).find().limit(data.limit).skip(skip).populate(['category','user']).sort({addTime:-1});
        if (data.sortType == 'likes'){
            //console.log(1);
            return Content.where(where).find().limit(data.limit).skip(skip).populate(['category','user','article']).sort({likes:-1});
        }else if (data.sortType == 'views'){
            //console.log(2);
            return Content.where(where).find().limit(data.limit).skip(skip).populate(['category','user','article']).sort({views:-1});
        }else {
            //console.log(3);
            return Content.where(where).find().limit(data.limit).skip(skip).populate(['category','user','article']).sort({addTime:-1});
        }
    }).then(function (contents) {
        data.contents = contents;

        res.render('main/index', data);
    });
});

//点赞功能
router.get('/like',function (req,res) {
    var contentId = req.query.contentid || '';
    var likes = req.query.like || '';

    Content.findOne({
        _id: contentId
    }).then(function (content) {
        data.content = content ;
        content.likes++;
        content.save();
        likes = content.likes;
        res.json(likes);
    });
});

//统计浏览数
router.get('/view',function (req,res) {
    var contentId = req.query.contentid || '';
    Article.find().then(function (articles) {
        data.articles = articles ;
    }).then(function (content) {
        Content.findOne({
            _id: contentId
        }).populate(['user']).then(function (content) {
            data.content = content;
            //console.log(data);
            content.views++;
            content.save();
            res.render('main/view', data);
        })
    })
});
//右侧推荐
router.get('/recommendation',function (req,res) {
    //console.log(data);
    Content.find().limit(4).then(function (music) {
        data.musicRecommend = music;
    }).then(function () {
        Article.find().limit(4).then(function (articles) {
            data.newsRecommend = articles;
            res.json(data);
            //console.log(data);
        })
    });
});


//新闻列表
router.get('/News',function (req,res) {

    data.count = 0;
    data.page = Number(req.query.page || 1);
    data.limit = 5;
    data.pages = 0;

    var skip =(data.page - 1) * data.limit;
    var where = {};

    //console.log(req.userInfo);

    Article.count().then(function (count) {

        data.count = count;
        //计算总页数
        data.pages = Math.ceil(data.count/data.limit);
        //取值不能超过pages
        data.page = Math.min(data.page,data.pages);
        //取值不能小于1
        data.page = Math.max(data.page,1);

        return Article.find().limit(data.limit).skip(skip).populate('user');

    }).then(function (contents) {
        data.articles = contents;
        res.render('main/newsList',data)
    })
});

//新闻内容
router.get('/article',function (req,res) {
    var articleId = req.query.articleid || '';
    Article.findOne({
            _id: articleId
    }).populate(['user']).then(function (article) {
            data.article = article;
            res.render('main/article', data);
    })
});

//关于我们
router.get('/about',function (req,res) {
    res.render('main/about');
});

//关于我们
router.get('/contact',function (req,res) {
    res.render('main/contact');
});

//搜索
router.get('/search',function (req,res) {
    var key = req.query.key || '';
    var type = req.query.type || '';
    data.key = key;
    data.type = type;
    res.render('main/search',data);
});







module.exports = router;
