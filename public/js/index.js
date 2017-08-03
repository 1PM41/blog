/**
 * Created by Administrator on 2017/6/17.
 */

$(function(){
    //导航栏切换
/**$('nav').mouseover(function () {
            $(this).removeClass('m-nav-bg');
            $('#bs-example-navbar-collapse-1 ul').removeClass('hidden');
        }
    );
    $('nav').mouseout(function () {
            $(this).addClass('m-nav-bg');
            $('#bs-example-navbar-collapse-1 ul').addClass('hidden');
        }
    ); */

    //登陆注册
    var $registerBox = $('#registerBox');
    var $loginBox = $('#loginBox');

    $('#sign').on('click',function () {
        //通过ajax提交请求
        $.ajax({
            type:'post',
            url:'/api/user/register',
            data:{
                username:$registerBox.find('[name="username"]').val(),
                password:$registerBox.find('[name="password"]').val(),
                repassword:$registerBox.find('[name="repassword"]').val(),
            },
            dataType:'json',
            success:function (result) {
                //console.log(result);
                $('#signMsg').html(result.message);
                if (!result.code){
                    setTimeout(function () {
                        window.location.reload();
                    },2000);
                }
            }
        });

    });

    $('#loginBtn').on('click',function () {
        //通过ajax提交请求
        $.ajax({
            type:'post',
            url:'/api/user/login',
            data:{
                username:$loginBox.find('[name="username"]').val(),
                password:$loginBox.find('[name="password"]').val()

            },
            dataType:'json',
            success:function (result) {
                //console.log(result);
                $('#loginMsg').removeClass('hidden').html(result.message);
                if (!result.code){
                    window.location.reload();
                }
            }
        });

    });

    //退出
    $('#logout').on('click',function () {
        $.ajax({
            url:'/api/user/logout',
            success:function (result) {
                if(!result.code){
                    window.location.reload();
                }

            }
        })

    });

    //歌词伸缩
    var moreBtn = $('#more');
    var lyrics = $('#lyrics');
    var data = 0 ;
    moreBtn.on('click',function () {
        if (data == 0 ){
            lyrics.css({"height":"300px","overflow":"auto"});
            moreBtn.html('CLICK <span class="glyphicon glyphicon-menu-up" aria-hidden="true"></span>');
            data = 1;
        }
        else {

            lyrics.css({"height":"110px","overflow":"hidden"});
            moreBtn.html('CLICK <span class="glyphicon glyphicon-menu-down" aria-hidden="true"></span>');
            data = 0;
        }
    });

    //分类列表特效
    var cateList = $('#cateList');
    var cateUrlParam = getUrlParam('category');
    cateList.find('li input').each(function () {
        if ($(this).val() == ''){
            cateList.find('li').eq(0).addClass('list-shadow bg-yellow moveup-3');
        }else if($(this).val() == cateUrlParam){
            cateList.find('li').eq(0).removeClass('list-shadow bg-yellow moveup-3');
            $(this).parent().addClass('list-shadow bg-yellow moveup-3');
        }else {
            $(this).parent().removeClass('list-shadow bg-yellow moveup-3');
        }

    });
    var sortUrlParam = getUrlParam('sort');
    var sortList = $('#sortList li');
    sortList.each(function () {
        if ($(this).data('name') == sortUrlParam){
            $(this).addClass('list-shadow bg-yellow');
        }else {
            $(this).removeClass('list-shadow bg-yellow');
        }
    });
    transform('#cateList','li','mouseover','bg-grey','mouseout');

    //选中特效
    transform('#newsList','div','mouseover','bg-grey','mouseout');
    transform('#musicNav','li','click','list-shadow bg-yellow moveup-3');
    transform('#musicNav','li','mouseover','bg-grey','mouseout');
    transform('#musicList','.thumbnail','mouseover','bg-grey','mouseout');
    //排序
    var selectList = $('#selectList option');
    selectList.on('click',function () {
        window.location.href="/main?sort=likes";
        idx = $(this).index('#selectList option');
        selectList.eq(idx).attr('selected','selected');
        selectList.not(selectList.eq(idx)).removeAttr('selected');

    });
    like('#list','.label');
    like('#likeBtn','');
    //显示当前时间
    $('#currentTime').html(currentTime);
    setInterval(function(){$('#currentTime').html(currentTime)},1000);

});


//点赞
function like(parentID,childID) {
    if (childID == ''){
        var likeBtn =$(parentID);
    }else {
        var likeBtn =$(parentID).find(childID);
    }
    likeBtn.on('click', function () {
        idx=$(this).index(parentID+' '+childID);
        likeVal = likeBtn.eq(idx).next().val();
        contentVal = likeBtn.eq(idx).prev().val();
        $.ajax({
            url: '/like',
            data: {
                like: likeVal,
                contentid: contentVal
            },
            success: function (likes) {
                likeBtn.eq(idx).html('<span class="glyphicon glyphicon-thumbs-up padded-r-5"></span>'+likes);
            }
        })
    });
}


//自定义变化
function transform(parentID,childID,action,style,afterAction) {
    var thisOne = $(parentID).find(childID);
    thisOne.on(action, function () {
        var idx = $(this).index(parentID+' '+childID);
        $(this).addClass(style);
        thisOne.not(thisOne.eq(idx)).removeClass(style);
    });
    thisOne.on(afterAction, function () {
        var idx = $(this).index(parentID+' '+childID);
        thisOne.removeClass(style);
    });
}


//获取当前时间
function currentTime(){
    var d = new Date();
    str = '';
    str += d.getFullYear()+'-';
    str  += d.getMonth() + 1+'-';
    str  += d.getDate()+' ';
    str += d.getHours()+':';
    str  += d.getMinutes()+':';
    if (d.getSeconds()<10){
        str+= '0'+d.getSeconds();
    }else {
        str+= d.getSeconds();
    }
    return str;
}


function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return decodeURI(r[2]); return null; //返回参数值
}
