/**
 * 验证用户名和手机号的唯一性
 * @param id
 * @returns {boolean}
 */
function check(id) {
    var status = true;
    var inputUserName = null;
    var inputPhone = null;
    if(id == "username"){
        inputUserName = $('#username').val();
    }
    if(id == "phone"){
        inputPhone = $('#phone').val();
    }
    $.ajax({
        type : "POST", //请求方式
        url : '/check', //请求路径
        async: false,
        cache : false,
        data : {
            userName:inputUserName,
            phone:inputPhone
        },
        dataType : 'json', //返回值类型
        success : function(data) {
            if(data == 1){
                status = true;
            }else {
                status = false;
            }
        }
    });
    return status;
}

/**
 * 注册按钮
 */
function register() {
    var checkbox=window.document.getElementById("reader-me");
    var register=window.document.getElementById("register")
    if(checkbox.checked == true){
        $("#protocol").modal('show');
        register.disabled=false;
    }else{
        register.disabled=true;
    }
}

$(function() {

    $("#protocol").modal('show');
    // 失去焦点异步查询是否唯一或者是否为空
    $(".syncVerity").blur(function () {
        if ($(this).val() == null | $(this).val() == "") {
            $(this).parent().prev().children().text("此处不能为空！").attr("style","color:red");
        }else {
            $(this).parent().prev().children().text("");
        }
    });

    var usernameFlag = true;
    var phoneFlag = true;
    var passwordFlag = true;


    // 失去焦点验证用户名格式
    $("#username").blur(function () {
        //用户名正则，6到16位（非纯字母，非数字，不能含有@）
        var usernameReg = /^(?![0-9]+$)(?![a-zA-Z]+$)(?!@+$)([\u4e00-\u9fa50-9A-Za-z]){3,16}$/;
        var inputUsername = $('#username').val();
        console.info("inputUsername"+inputUsername)
        if (!usernameReg.test(inputUsername)) {
            $(this).parent().prev().children().text("3到16位（非纯字母，非数字，不能含有@）！").attr("style","color:red");
            usernameFlag = false;
        } else {
            var status = check("username");

            if(status){
                $(this).parent().prev().children().text("");
                usernameFlag = true;
            }else{

                $(this).parent().prev().children().text("该用户已存在").attr("style","color:red");
                usernameFlag = false
            }


        }
    });

    // // 失去焦点验证邮箱格式
    // $("#email").blur(function () {
    //     var emailReg = /^[a-zA-Z0-9][\w\.-]*[a-zA-Z0-9]@[a-zA-Z0-9][\w\.-]*[a-zA-Z0-9]\.[a-zA-Z][a-zA-Z\.]*[a-zA-Z]$/;
    //     var inputEmail = $('#email').val();
    //     if (!emailReg.test(inputEmail)) {
    //         $(this).parent().next().children().text("邮箱格式错误，请输入正确邮箱！").attr("style","color:red");
    //         emailFlag = false;
    //     } else {
    //         $(this).parent().next().children().text("格式正确").attr("style","color:green");
    //         emailFlag = true;
    //     }
    // });

    //失去焦点验证手机格式
    $("#phone").blur(function () {
        var phoneReg = /^1[34578]\d{9}$/;
        var inputPhone = $('#phone').val();
        console.info("inputPhone"+inputPhone);
        if (!phoneReg.test(inputPhone)) {
            $(this).parent().prev().children().text("输入有误").attr("style","color:red");
            $("#dyMobileButton").attr("disabled",true);
            phoneFlag = false;
        } else {
            var status = check("phone");

            if(status){
                $(this).parent().prev().children().text("");
                phoneFlag = true;
            }else{
                console.info("已注册")
                $(this).parent().prev().children().text("该手机已注册").attr("style","color:red");
                phoneFlag = false
            }

        }
    });

    // 失去焦点验证第二次密码
    $("#passwordRepeat").blur(function () {
        var inputPassword = $('#password').val();
        var inputverity = $('#passwordRepeat').val();
        if (inputPassword!=inputverity) {
            $(this).parent().prev().children().text("两次输入的密码不一致！").attr("style","color:red");
            passwordFlag = false;
        } else {
            $(this).parent().prev().children().text("").attr("style","color:green");
            passwordFlag = true;
        }
    });


    //给点击表单提交之前进行是否注册的异步查询操作
    $("#register").click(function() {

        /*
         * 判断是注册页面的还是用户管理添加用户页面的。
         */
        var currentUrl = window.location.pathname;
        console.log(currentUrl);
        if(usernameFlag && phoneFlag && passwordFlag) {
            if($("code").val() == code){
                $.ajax({
                    type : "POST", //请求方式
                    url : "/register2", //请求路径
                    cache : false,
                    data : $("#registerform").serialize(),  //传参 页数
                    dataType : 'json', //返回值类型
                    success : function(data) {
                        console.log(data)
                        if(data==1) {
                            layer.msg("添加成功！");
                            location.href = "/login";
                        } else {
                            location.href = "/register";
                            layer.msg("注册失败");
                        }
                    }
                });
            }else {
                layer.msg("验证码错误");
            }

        }
    });
});

/**
 * 获取手机短信验证码
 * @type {null}
 */
var code = null;
function getCode() {
    var phone = $("#phone").val();
    $.ajax({
        url:'/register/code',
        type:'POST',
        data:{
            phone:phone
        },
        dataType:'JSON',
        async:false,
        success:function (code) {
            code = code;
        }
    })
    var but = $("#dyMobileButton");
    but.attr("disabled",true);
    var time = 180;
    var set = setInterval(function(){
        but.val(--time+"s");
    }, 1000);
    setTimeout(function(){
        but.attr("disabled",false).val("获取");
        clearInterval(set);
    }, 180000);
}

function agreeProtocol() {
    $("#protocol").modal('hide');
    var checkbox=window.document.getElementById("reader-me");
    var register=window.document.getElementById("register")
    checkbox.checked = true;
    register.disabled = false;

}


