/**
 * Created by Administrator on 2017/7/20.
 */

$(function() {

    $.ajax({
        url: '/display',
        data: {},
        success: function (data) {
            musicData = data.contents.reverse();
            newsData = data.articles.reverse();
            renderNews();
            Classified();


        }
    });

    $('#changeNews').on('click',function () {
        if (newsPage < 3){
            newsPage++;
            renderNews()
        }else {
            newsPage = 1;
            renderNews()
        }
    });

});
var page = 1;
var newsPage = 1;
var pages = 0;


//渲染首页音乐
function renderMusic(category) {
    var prepage = 12;
    var chooseCate = [];
    var html = '';
    var render = category;

    for (var i=0; i<musicData.length ;i++){
        if( render == musicData[i].category ){
                //html += "<div class='col-sm-6 col-md-2' ><a href='/view?contentid=" + musicData[i]._id + "' class='none-text-decoration'><div class='thumbnail none-border margin-0'><img src='" + musicData[i].thumbnails + "'><div class='caption'><h3 class='ellipsis-1'>" + musicData[i].title + "</h3><p class='ellipsis-1'>" + musicData[i].artist + "</p><div class='clearfix'></div></div></div></a></div>";
            chooseCate.push(musicData[i]);
        }else if(render == '') {
            //html += "<div class='col-sm-6 col-md-2' ><a href='/view?contentid="+musicData[i]._id+"' class='none-text-decoration'><div class='thumbnail none-border margin-0'><img src='"+musicData[i].thumbnails+"'><div class='caption'><h3 class='ellipsis-1'>"+musicData[i].title+"</h3><p class='ellipsis-1'>"+musicData[i].artist+"</p><div class='clearfix'></div></div></div></a></div>";
            chooseCate.push(musicData[i]);
        }
    }
    pages = Math.max(Math.ceil(chooseCate.length / prepage),1);
    var start = Math.max(0,(page-1) * prepage);
    var end = Math.min(start + prepage , chooseCate.length);
    if (chooseCate.length == 0) {
        html ="<img class='center-block' src='/public/image/loadFail.png'>";
    } else {
        for (var j = start; j < end; j++) {
            html += "<div class='col-sm-6 col-md-2 margin-b-15' ><a href='/view?contentid=" + chooseCate[j]._id + "' class='none-text-decoration'><div class='thumbnail none-border margin-0'><img src='" + chooseCate[j].thumbnails + "'><div class='caption'><h4 class='ellipsis-1 margin-0 padded-b-10'>" + chooseCate[j].title + "</h4><p class='ellipsis-1'>" + chooseCate[j].artist + "</p><div class='clearfix'></div></div></div></a></div>";
        }
    }
    //console.log(html);
    $('#musicContentList').html(html);
    transform('#musicContentList','.col-md-2','mouseover','list-shadow','mouseout');
}

//渲染首页新闻
function renderNews() {

    var newsPrepage = 2;
    var start = Math.max(0,(newsPage-1) * newsPrepage);
    var end = Math.min(start + newsPrepage , newsData.length);
    var html = '';
    for (var i=start; i<end;i++) {
        html += "<div class='padded-15'><a class='none-text-decoration' href='/article?articleid="+newsData[i]._id+"'><div class='row '><img class='col-md-2' src='"+newsData[i].thumb+"' alt='"+newsData[i].title+"'><div class='col-md-10'><h3 class='media-heading ellipsis-1'>"+newsData[i].title+"</h3><p style='height: 60px; overflow: hidden'>"+newsData[i].description+"</p></div></div></a></div><div class='clearfix'></div>";
    }
    $('#newsContentList').html(html);
    transform('#newsContentList','.padded-15','mouseover','list-shadow','mouseout');
}

//音乐分类切换
function Classified() {
    var list = $('#musicNav li');
    list.on('click', function () {
        renderMusic($(this).find('input').val());
    });
    renderMusic('');
}




