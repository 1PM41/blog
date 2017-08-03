/**
 * Created by Administrator on 2017/6/16.
 */
/*应用程序的启动（入口）文件*/

//加载express模块
var express = require('express');
//加载模板处理模块
var swig = require('swig');
//加载数据库模块
var mongoose = require('mongoose');
//加载body-Parser，用来处理post提交过来的数据
var bodyparser = require('body-parser');
//加载Cookies模块
var Cookies = require('cookies');
//创建app应用   等于   NodeJS Http的createServer（）；
var app= express();

var User = require('./models/User');

//设置静态文件托管
//当用户访问的url以/public开始，那么直接返回对应__dirname + '/public'下的文件
app.use('/public',express.static(__dirname + '/public'));

//配置应用模板
//定义当前应用所使用的模板引擎
//第一个参数：模板引擎的名称，同事也是模板文件的后缀，第二参数表示用于解析处理模板内容的方法
app.engine('html',swig.renderFile);
//设置模板文件存放的目录，第一个参数必须是views,第二个参数是目录
app.set('views','./views');
//注册所使用的模板引擎，第一个参数必须是view engine,第二个参数和app.engine定义的第一个参数名称一致
app.set('view engine','html');
//在开发过程中，需要取消模板缓存
swig.setDefaults({cache:false});
//bodyparser设置
app.use(bodyparser.urlencoded({extended:true}));

//设置cookie
app.use( function (req,res,next) {
    req.cookies = new Cookies(req,res);
    // console.log(req.cookies.get('userInfo'));
    //解析登陆用户的cookie信息
    req.userInfo = {};
    if (req.cookies.get('userInfo')){
        try{
            req.userInfo = JSON.parse(req.cookies.get('userInfo'));
            //获取当前登录用户的类型，是否是管理员
            //console.log(req.userInfo);
            User.findById(req.userInfo._id).then(function(userInfo) {
                req.userInfo.isAdmin = Boolean(userInfo.isAdmin);
                req.userInfo.userpic = userInfo.userpic;
                next();

            })
        }catch (e){
            next();
        }
    }else {
        //console.log(req.userInfo);
        next();
    }

});
/*
    res request对象
    res response对象
    next 函数
 */
/*
app.get('/',function (req,res,next) {
   // res.send('<h1>Welcome to my blog</h1>');

    *读取views目录下指定文件，解析并返回给客户端
    * 第一个参数：标识模板的文件，相对于views，目录 views/index.html
    * 第二个参数：传递给模板使用的数据

        res.render('index');

})
*/

/*
*根据不同的功能划分模块
 */
app.use('/admin',require('./routers/admin'));
app.use('/api',require('./routers/api'));
app.use('/',require('./routers/main'));


//监听请求
mongoose.connect('mongodb://localhost:27017/blog/',function (err) {
    if (err){
        console.log('失败');
    }else {
        console.log('成功');
        app.listen(8081);
    }
});
