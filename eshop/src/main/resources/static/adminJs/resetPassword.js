$(document).ready(function () {
    // 是否为空
    $(".password").blur(function () {
        if($("#oldPassword").val() != null | $("#oldPassword").val() != "") {
            if ($(this).val() == null | $(this).val() == "") {
                $(this).parent().next().children().text("不能为空！").attr("style", "color:red;padding: 0.5em;float: left;");
            } else {
                var passwordReg = /^[0-9a-zA_Z]+$/
                if (!passwordReg.test($(this).val())) {
                    $(this).parent().next().children().text("输入有误").attr("style", "color:red;padding: 0.5em;float: left;");
                } else {
                    $(this).parent().next().children().text("✔").attr("style", "color:green;padding: 0.5em;float: left;");
                }
            }
        }else{
            $("#oldPassword").parent().next().children().text("原密码不能为空").attr("style", "color:red;")
        }
    });
})

function updatePassword() {
    var oldPassword = $("#oldPassword").val();
    var newPassword = $("#newPassword").val();
    var confirmNewPassword = $("#confirmNewPassword").val();
    if(oldPassword != "" && newPassword != "" && confirmNewPassword != ""){
        if(newPassword == confirmNewPassword){
            $.ajax({
                url:'/admin/updatePassword',
                data:{
                    oldPassword:oldPassword,
                    newPassword:confirmNewPassword
                },
                type:'POST',
                dataType:'JSON',
                success:function (msg) {
                    if(msg == 1){
                        $("#confirmNewPassword").val("");
                        $("#newPassword").val("");
                        $("#oldPassword").val("");
                        layer.msg("修改成功");
                    }else if(msg == 2){
                        layer.msg("原密码不正确");
                    }else{
                        layer.msg("修改密码错处,请稍后重试");
                    }
                }
            })
        }else {
            layer.msg("两次新密码不一样");
        }
    }else {
        layer.msg("不能为空");
    }

}
