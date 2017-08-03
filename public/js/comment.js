/**
 * Created by Administrator on 2017/6/23.
 */

var page = 1;
var pages = 0;
var prepage = 3;
var comments = [];
//点击评论处登录
$('#plsLogin').on('click', function (){
    $('html,body').animate({scrollTop:0}, 500);
    $('#tip').removeClass('hidden');
    setTimeout(function () {
        $('#tip').addClass('hidden');
    }, 1000);
});
$('#tip').on('mouseover',function (){
    $('#tip').addClass('hidden');
});
//提交评论
$('#msgBtn').on('click', function () {

    $.ajax({
        type: 'POST',
        url: '/api/comment/post',
        data: {
            contentid: $('#contentId').val(),
            content: $('#msgContent').val()
        },
        success: function (responseData) {
            //console.log(responseData);
            $('#msgContent').val('');
            comments = responseData.data.comments.reverse();
            renderComment();
            window.location.reload()
        }
    })
});

$.ajax({
    url: '/api/comment',
    data: {
        contentid: $('#contentId').val(),
        content: $('#msgContent').val()
    },
    success: function (responseData) {
        //console.log(responseData);
        $('#msgContent').val('');
        comments = responseData.data.reverse();
        renderComment();
    }
});

$('.pager').delegate('a', 'click', function () {

    if ($(this).parent().hasClass('previous')) {
        if (page <= 1) {
            page = 1;
        }else {
            page--;
        }
    } else {
        if (page >= pages) {
            page = pages;
        }else {
            page++;
        }
    }
    renderComment();
});

function renderComment() {
    pages = Math.max(Math.ceil(comments.length / prepage),1);
    var start = Math.max(0,(page-1) * prepage);
    var end = Math.min(start + prepage , comments.length);


    var html = '';

    for (var i=start; i<end;i++){
        html += '<ul class="media-list padded-15"><li class="media"  style="border-bottom: 1px #cccccc solid"><span class="media-left" ><img class="media-object" src="'+ comments[i].userpic +'"></span> <div class="media-body"><h5><span class="text-primary text-"> '+comments[i].username+
            ':</span><span>' +comments[i].content+
            '</span></h5><h6>'+formatDate(comments[i].postTime)+'</h6></div></li></ul>'
    }
    //alert(html);

    if (comments.length == 0){
        $('#msgList').html('<div class="panel-body"><h3 class="media-list padded-15 text-center">暂无评论</h3></div>');
        return false;
    }else {
        $('#msgList').html(html);
    };
    $('.pager li').eq(1).html('<span style="cursor: default">'+page + '/' + pages+'</span>');
    if (page <= 1) {
        $('.pager li').eq(0).html('<a class="text-gbb" href="javascript:;">没有了</a>')
    }else{
        $('.pager li').eq(0).html('<a class="text-gbb" href="javascript:;"><span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span> 上一页</a>')
    }
    if (page >= pages) {
        $('.pager li').eq(2).html('<a class="text-gbb" href="javascript:;">没有了</a>')
    }else{
        $('.pager li').eq(2).html('<a class="text-gbb" href="javascript:;">下一页<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span></a>')
    }

    $('#count').html(comments.length+'条评论');

}
function  formatDate(d) {
    var date1 = new Date(d);
    return date1.toDateString()+', '+date1.getHours()+':'+date1.getMinutes()+':'+date1.getSeconds()
}

