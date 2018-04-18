$(document).ready(function () {
    // 是否为空
    $(".password").blur(function () {
        if ($(this).val() == null | $(this).val() == "") {
            $(this).parent().next().children().text("不能为空！").attr("style","color:red");
        }else {
            var passwordReg = /^[0-9a-zA_Z]+$/
            if(!passwordReg.test($(this).val())){
                $(this).parent().next().children().text("✘").attr("style","color:red");
            }else{
                $(this).parent().next().children().text("✔").attr("style","color:green");
            }
        }
    });
})


function updataPassword() {
    var oldPassword = $("#user-old-password").val();
    var newPassword = $("#user-new-password").val();
    var confirmNewPassword = $("#user-confirm-password").val();
    console.info(oldPassword+","+newPassword+","+confirmNewPassword);
    $.ajax({
        url:'/updateUser',
        data:{
            password:oldPassword,
            newPassword:confirmNewPassword
        },
        type:'POST',
        dataType:'JSON',
        success:function (msg) {
            if(msg == 1){
                $("#user-confirm-password").val("");
                $("#user-new-password").val("");
                $("#user-old-password").val("");
                $('.step-2 .u-stage-icon-inner .bg').attr("style","opacity:1")
                $('.u-progress-bar').attr("style","background-color:#5ec27a;")
            }
        }
    })
}