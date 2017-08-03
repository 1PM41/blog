/**
 * Created by admin on 2017/7/25.
 */

$(function() {

    $.ajax({
        url: '/recommendation',
        data: {},
        success: function (data) {
            musicRecommend = data.musicRecommend;
            newsRecommend = data.newsRecommend;
            renderMusicRecommed();
            renderNewsRecommed();
            minHeight();
        }
    });
});


//渲染内容页右侧推荐

function renderMusicRecommed() {
    var html = '';
    for (var i=0; i< musicRecommend.length;i++) {
        html += "<a href='/view?contentid="+musicRecommend[i]._id+"'>" +
            "<p class='padded-10 margin-0 trans'  style='border-bottom: #e2e2e2 1px dashed'>" +
            "<span class='padded-l-5 margin-r-5 vertical-bar-yellow'></span>"+musicRecommend[i].title+"</p>" +
            "</a>";
    }
    $('#musicRecommed').html(html);
}

function renderNewsRecommed() {
    var html = '';
    for (var i=0; i< newsRecommend.length;i++) {
        html += "<a href='/article?articleid="+newsRecommend[i]._id+"'>" +
            "<p class='padded-10 margin-0 trans'  style='border-bottom: #e2e2e2 1px dashed'>" +
            "<span class='padded-l-5 margin-r-5 vertical-bar-yellow'></span>"+newsRecommend[i].title+"</p>" +
            "</a>";
    }
    $('#newsRecommed').html(html);
}

//设置最小高度
function minHeight() {
    var rsHeight = $('#rightSide').outerHeight();
    var lsHeight = $('#leftSide').outerHeight();

    if ( lsHeight < rsHeight ){
        $('#leftSide').css('min-height',rsHeight-'20');
    }
    //console.log(rsHeight);
}