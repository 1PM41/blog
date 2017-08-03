/**
 * Created by Administrator on 2017/7/26.
 */


var page = 1;
var pages = 0;
var prepage = 8;
var searchResult = [];


$(function() {

    //显示结果数
    $('#count').attr('placeholder',searchResult.length+'条结果');



    $('#searchBtn').on('click', function () {
        if ($('#search').val() == ''){
            $('#count').parent().removeClass('hidden');
            $('#count').html('请输入搜索内容');
        }else {
            var key = $('#search').val();
            var type = $('#type').val();
            location.href = '/search?type=' + type + '&key=' + key ;
        }
    });

    if (getUrlParam('type') == "新闻"){
        $('#type').find('option:eq(1)').attr('selected','selected');
    }else {
        $('#type').find('option:eq(0)').attr('selected','selected');
    }
    $('#type').on('change', function () {
        var key = $('#search').val();
        var type = $('#type').val();
        location.href = '/search?type=' + type + '&key=' + key ;
    });

    $('#newsPager').delegate('a', 'click', function () {
        if ($(this).parent().hasClass('previous')) {
            if (page <= 1) {
                page = 1;
            } else {
                page--;
            }
        } else {
            if (page >= pages) {
                page = pages;
            } else {
                page++;
            }
        }
        renderResult();
        return;
    });

});

function renderResult() {
    pages = Math.max(Math.ceil(searchResult.length / prepage),1);
    var start = Math.max(0,(page-1) * prepage);
    var end = Math.min(start + prepage , searchResult.length);
    var type =  $('#type').data('value');
    var html = '';

    if( type == '新闻'){
        for (var i=start; i<end;i++){
            html += "<a class='none-text-decoration ' href='/article?articleid="+searchResult[i]._id+"' ><div class='row padded-15 transform' style='border-bottom: dashed 1px #e2e2e2'>";
            html += "<img class='col-md-2 ' src='"+searchResult[i].thumb+"' alt='"+searchResult[i].title+"'>" ;
            html += "<div class='col-md-10'><h3 class='media-heading ellipsis-1 padded-b-5 padded-t-5'>"+searchResult[i].title+"</h3>" ;
            html += "<h4 style='min-height: 30px'>"+searchResult[i].description+"</h4>" ;
            html += "<h4 class='float-right' style='color:#8e8e8e'>By : "+searchResult[i].user.username+"<span class='margin-l-10'><span class='glyphicon glyphicon-time'></span> "+formatAddTime(searchResult[i].addTime)+"</span></h4></div></div></a>";
        }

    }else {
        for (var i=start; i<end;i++) {
            var getTime = searchResult[i].addTime;
            var getHour = getTime.substr(11, 2);
            var modified = '';
            if (parseInt(getHour) + 8 > 24) {
                modified = parseInt(getHour) + 8 - 24;
            } else {
                modified = parseInt(getHour) + 8;
            }
            var correctTime = getTime.replace(/T/, ' ').replace(/.889Z/, '').replace(getHour, modified);
            html += "<div class='col-md-3 margin-t-10' ><div class='thumbnail transform'><div class='block-header__tag'>"+searchResult[i].category.name+"</div><img class='padded-t-5' src='"+searchResult[i].thumbnails+"' alt='"+searchResult[i].title+"'>";
            html += "<div class='caption'><h3 class='ellipsis-1 margin-t-10 margin-b-10'>"+searchResult[i].title+"</h3><p class='ellipsis-1'>"+searchResult[i].artist+"<p><p class='padded-b-5 padded-t-5 ellipsis-1'>"+formatAddTime(searchResult[i].addTime)+"</p><p class='ellipsis-1'>浏览数："+searchResult[i].views+"</p>";
            html += "<input type='hidden' value='"+searchResult[i]._id+"'><span class=' float-right label label-danger cursor-pointer'><span class='glyphicon glyphicon-thumbs-up padded-r-5'></span>"+searchResult[i].likes+"</span><input type='hidden' value='"+searchResult[i].likes+"'>";
            html += "<a href='/view?contentid="+searchResult[i]._id+"' class='text-center'><h4 class='col-md-12 bg-primary padded-5 margin-0 margin-t-10'>DETAIL</h4></a><div class='clearfix'></div></div></div></div>";
        }
    }
    //alert(html);

    if (searchResult.length == 0){
        $('#newsCount').html('搜索该内容无结果');
        return false;
    }else {
        $('#newsPager').show();
        $('#searchList').html(html);
    };
    $('#newsPager li').eq(1).html('<span style="cursor: default">'+page + '/' + pages+'</span>');
    if (page <= 1) {
        $('#newsPager li').eq(0).html('<a class="text-gbb" href="javascript:;">没有了</a>')
    }else{
        $('#newsPager li').eq(0).html('<a class="text-gbb" href="javascript:;"><span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span> 上一页</a>')
    }
    if (page >= pages) {
        $('#newsPager li').eq(2).html('<a class="text-gbb" href="javascript:;">没有了</a>')
    }else{
        $('#newsPager li').eq(2).html('<a class="text-gbb" href="javascript:;">下一页<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span></a>')
    }

    $('#newsCount').html('一共找到'+searchResult.length+'条结果');
    transform('#searchList','.transform','mouseover','bg-grey','mouseout');
}

function centerPic() {
    var parentHeight = $('#leftSide').outerHeight();
    var picHeight = $('#center-pic').outerHeight();
    //console.log(parentHeight,picHeight,(parentHeight-100-picHeight)/2);
    $('#center-pic').css('margin-top',(parentHeight-150-picHeight)/2 + 'px');
}


function formatAddTime(addTime){
    var getTime = addTime;
    var getHour =getTime.substr(11,2);
    var getTimezone = getTime.substr(19);
    var modified = '';
    if (parseInt(getHour)+8 > 24){
        modified = parseInt(getHour)+8-24;
    }else {
        modified = parseInt(getHour)+8;
    }
    var correctTime = getTime.replace(/T/,' ').replace(getTimezone,'').replace(getHour,modified);
    return correctTime;
}
