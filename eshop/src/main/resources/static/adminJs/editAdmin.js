$(document).ready(function () {
    // 失去焦点验证邮箱格式
    $("#email").blur(function () {
        if($("#email").val() != ""){
            var emailReg = /^[a-zA-Z0-9][\w\.-]*[a-zA-Z0-9]@[a-zA-Z0-9][\w\.-]*[a-zA-Z0-9]\.[a-zA-Z][a-zA-Z\.]*[a-zA-Z]$/;
            var inputEmail = $('#email').val();
            if (!emailReg.test(inputEmail)) {
                $(this).parent().next().children().text("邮箱格式错误，请输入正确邮箱！").attr("style","color:red");
            } else {
                $(this).parent().next().children().text("✔").attr("style","color:green");
            }
        }
    });
})

/**
 * 更新管理员信息
 */
function editAdmin() {
    $.ajax({
        url:'/admin/updateUser',
        type:"POST",
        data:$("#editAdmin").serialize(),
        dataType:'JSON',
        success:function (msg) {
            if(msg == 1){
                layer.msg("更新成功");
                $(".textBox").parent().next().children().text("");
            }else {
                layer.msg("发生错误，请稍后重试");
            }
        }
    })
}

/**
 * 重置密码
 */
function resetPassword() {
    $.ajax({
        url:'/admin/resetPassword',
        type:"POST",
        data:{
          userId:$("#userId").val()
        },
        dataType:'JSON',
        success:function (msg) {
            if(msg == 1){
                layer.msg("重置密码成功");
                $(".textBox").parent().next().children().text("");
            }else {
                layer.msg("发生错误，请稍后重试");
            }
        }
    })
}