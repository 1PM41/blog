/**
 * Created by Administrator on 2017/6/29.
 */


$(function() {
    $('#sendContact').on('click',function () {
        $.ajax({
            type:'post',
            url:'/api/user/contact',
            data:{
                name:$('#contact').find('[name="name"]').val(),
                phone:$('#contact').find('[name="phone"]').val(),
                email:$('#contact').find('[name="email"]').val(),
                userContact:$('#contact').find('[name="message"]').val(),
            },
            dataType:'json',
            success:function (result) {
                console.log(result);
                $('#myModal2').find('.modal-body').html(result.message);
                if (!result.code) {
                    dismiss = setTimeout(function () {
                        window.location.reload();
                    }, 3000);
                }
                $('#myModal2').find('button').on('click', function () {
                    clearTimeout(dismiss);
                    window.location.reload();
                })
            }
        });
    });
});
