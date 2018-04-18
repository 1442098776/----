/**
 * jQuery的load方法
 * @param url
 */
function href(url) {
    $("#content").load(url);
}

$(document).ready(function () {
    // 是否为空
    $(".password").blur(function () {
        if ($(this).val() == null | $(this).val() == "") {
            $(this).next().text("不能为空！").attr("style","color:red;padding: 0.5em;float: left;");
        }else {
            var passwordReg = /^[0-9a-zA_Z]+$/
            if(!passwordReg.test($(this).val())){
                $(this).next().text("✘").attr("style","color:red;padding: 0.5em;float: left;");
            }else{
                $(this).next().text("✔").attr("style","color:green;padding: 0.5em;float: left;");
            }
        }
    });
    // 是否为空
    $("#user-email").blur(function () {
        var emailReg = /^[A-Za-zd]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/;
        if(!emailReg.test($(this).val())){
            $(this).next().text("✘").attr("style","color:red;padding: 0.5em;float: left;");
        }else{
            $(this).next().text("✔").attr("style","color:green;padding: 0.5em;float: left;");
        }
    });
})


function updataPassword() {
    var oldPassword = $("#user-old-password").val();
    var newPassword = $("#user-new-password").val();
    var confirmNewPassword = $("#user-confirm-password").val();
    console.info(oldPassword+","+newPassword+","+confirmNewPassword);
    if(oldPassword != "" && newPassword != "" && confirmNewPassword != ""){
        if(newPassword == confirmNewPassword){
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
                        $('.step-2 .u-stage-icon-inner .bg').attr("style","opacity:1");
                        $('.u-progress-bar').attr("style","background-color:#23C279;");
                        $('.password').next().text("");
                        layer.msg("修改成功");
                    }else if(msg == 2){
                        layer.msg("原密码不正确");
                    }else{
                        layer.msg("修改密码错处,请稍后重试");
                    }
                }
            })
        }else {
            layer.msg("两次新密码不正确");
        }
    }else {
        layer.msg("不能为空");
    }


}

function updateInformation() {

    var userName = $('#user_name').val();
    var userName = $('#user-name2').val();
    var userName = $('#user-email').val();
}