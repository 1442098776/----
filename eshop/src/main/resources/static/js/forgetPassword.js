
function check() {
    var status = true;
    var inputPhone = $('#phone').val();
    $.ajax({
        type : "POST", //请求方式
        url : '/check', //请求路径
        async: false,
        data : {
            phone:inputPhone
        },
        dataType : 'json', //返回值类型
        success : function(data) {
            console.info("data"+data);
            if(data == 1){
                status = true;//已存在
            }else {
                status = false;//不存在
            }
        }
    });
    return status;
}
var phoneFlag = true;
var passwordFlag = true;
$(document).ready(function () {
    //失去焦点验证手机格式
    $("#phone").blur(function () {
        var phoneReg = /^1[34578]\d{9}$/;
        var inputPhone = $('#phone').val();
        console.info("inputPhone"+inputPhone);
        if ($(this).val() == null | $(this).val() == "") {
            $(this).next().text("不能为空！").attr("style", "color:red;padding: 0.5em;float: left;");
        }else {
            if (!phoneReg.test(inputPhone)) {
                $(this).next().text("输入有误！").attr("style","color:red;padding: 0.5em;float: left;");
                $("#dyMobileButton").attr("disabled",true);
                phoneFlag = false;
            } else {
                if(check()){
                    $(this).next().text("尚未注册").attr("style","color:red;padding: 0.5em;float: left;");
                    phoneFlag = true;
                }else{
                    $(this).next().text("✔").attr("style","color:green;padding: 0.5em;float: left;");
                    phoneFlag = false;
                }
            }
        }
    });
    // 是否为空
    $(".password").blur(function () {
        if ($(this).val() == null | $(this).val() == "") {
            $(this).next().text("不能为空！").attr("style", "color:red;padding: 0.5em;float: left;");
        } else {
            var passwordReg = /^[0-9a-zA_Z]+$/
            if (!passwordReg.test($(this).val())) {
                $(this).next().text("输入有误").attr("style", "color:red;padding: 0.5em;float: left;");
            } else {
                $(this).next().text("✔").attr("style", "color:green;padding: 0.5em;float: left;");
            }
        }
    });
    $("#user-confirm-password").blur(function () {
        var inputPassword = $('#user-new-password').val();
        var inputVerity = $('#user-confirm-password').val();
        if (inputPassword!= inputVerity) {
            $(this).next().text("输入不一致！").attr("style", "color:red;padding: 0.5em;float: left;");
            passwordFlag = false;
        } else {
            $(this).next().text("✔").attr("style", "color:green;padding: 0.5em;float: left;");
            passwordFlag = true;
        }
    });

    $("#code").blur(function () {
        if ($(this).val() == null | $(this).val() == "") {
            $(this).next().next().text("不能为空！").attr("style", "color:red;padding: 0.5em;float: left;");
        } else {
            var codeReg = /^[0-9]+$/
            if (!codeReg.test($(this).val())) {
                $(this).next().next().text("输入有误").attr("style", "color:red;padding: 0.5em;float: left;");
            } else {
                $(this).next().next().text("✔").attr("style", "color:green;padding: 0.5em;float: left;");
            }
        }
    });
})


var code = null;
function getCode() {
    var phone = $("#phone").val();
    if(!phoneFlag) {

        // $.ajax({
        //     url:'/register/code',
        //     type:'POST',
        //     data:{
        //         phone:phone
        //     },
        //     dataType:'JSON',
        //     async:false,
        //     success:function (code) {
        //         code = code;
        //     }
        // })
        $("#code").attr("disabled", false);
        var but = $("#dyMobileButton");
        but.attr("disabled", "disabled");
        var time = 10;
        var set = setInterval(function () {
            but.val(--time + "s");
        }, 1000);
        setTimeout(function () {
            but.attr("disabled", false).val("获取");
            clearInterval(set);
        }, 10000);
    }
}

function resetPassword() {
    var phone = $("#phone").val();
    var codeVal = $("#code").val();
    if(!phoneFlag){
        if(code != null && codeVal == code){

        }else{
            layer.msg("短信验证码不正确!")
        }
        if(passwordFlag) {

            $.ajax({
                url: '/userResetPassword',
                data: {
                    phone: phone,
                    password: $("#user-confirm-password").val()
                },
                type: 'POST',
                dataType: 'JSON',
                success: function (msg) {
                    if (msg == 1) {
                        $("#code").val("");
                        $("#user-new-password").val("");
                        $("#user-confirm-password").val("");
                        $("#dyMobileButton").val("获取");
                        code = null;
                        $('.step-2 .u-stage-icon-inner .bg').attr("style", "opacity:1");
                        $('.u-progress-bar').attr("style", "background-color:#23C279;");
                        $('.password').next().text("");
                        layer.msg("重置成功");
                        location.href = "/login";
                    } else {
                        $("#user-new-password").val("");
                        $("#user-confirm-password").val("");
                        $("#dyMobileButton").val("获取");
                        code = null;
                        layer.msg("重置密码出错,请稍后重试");
                    }
                }
            })
        }else {
            layer.msg("密码输入有误");
        }
    }else {
        layer.msg("手机号输入有误");
    }

}