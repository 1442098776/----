
var usernameFlag = true;
var phoneFlag = true;
var passwordFlag = true;
$(document).ready(function () {
    // 失去焦点异步查询是否唯一或者是否为空
    $(".syncVerity").blur(function () {
        if ($(this).val() == null | $(this).val() == "") {
            $(this).parent().next().children().text("此处不能为空！").attr("style","color:red");
        }else {
            $(this).parent().next().children().text("");
        }
    });


    // 失去焦点验证用户名格式
    $("#username").blur(function () {
        //用户名正则，6到16位（非纯字母，非数字，不能含有@）
        var usernameReg = /^(?![0-9]+$)(?![a-zA-Z]+$)(?!@+$)([\u4e00-\u9fa50-9A-Za-z]){3,16}$/;
        var inputUsername = $('#username').val();
        console.info("inputUsername"+inputUsername)
        if (!usernameReg.test(inputUsername)) {
            $(this).parent().next().children().text("3到16位（非纯字母，非数字，不能含有@）！").attr("style","color:red");
            usernameFlag = false;
        } else {
            var status = check("username");
            if(status){
                $(this).parent().next().children().text("✔").attr("style","color:green");
                usernameFlag = true;
            }else{
                $(this).parent().next().children().text("该用户已存在").attr("style","color:red");
                usernameFlag = false
            }


        }
    });

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

    //失去焦点验证手机格式
    $("#phone").blur(function () {
        var phoneReg = /^1[34578]\d{9}$/;
        var inputPhone = $('#phone').val();
        console.info("inputPhone"+inputPhone);
        if (!phoneReg.test(inputPhone)) {
            $(this).parent().next().children().text("手机号格式错误，请输入正确手机号！").attr("style","color:red");
            phoneFlag = false;
        } else {
            var status = check("phone");
            if(status){
                $(this).parent().next().children().text("✔").attr("style","color:green");
                phoneFlag = true;
            }else{
                console.info("已注册")
                $(this).parent().next().children().text("该手机已注册").attr("style","color:red");
                phoneFlag = false
            }

        }
    });
    $("#password").blur(function () {
        if ($(this).val() == null | $(this).val() == "") {
        }else {
            var passwordReg = /^[0-9a-zA_Z]+$/
            if(!passwordReg.test($(this).val())){
                $(this).next().text("输入有误").attr("style","color:red;padding: 0.5em;float: left;");
                passwordFlag = false;
            }else{
                $(this).next().text("✔").attr("style","color:green;");
                passwordFlag = true;
            }
        }
    });
})

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
function insertAdmin() {
    if($("#password").val() != null && passwordFlag){
        if(usernameFlag && phoneFlag) {
            $.ajax({
                type : "POST", //请求方式
                url : "/admin/insertAdmin", //请求路径
                cache : false,
                data : $("#addAdmin").serialize(),  //传参 页数
                dataType : 'json', //返回值类型
                success : function(data) {
                    console.log(data)
                    if(data==1) {
                        layer.msg("添加成功！");
                        $(".textBox").val("");
                        $(".textBox").parent().next().children().text("");
                    } else {
                        layer.msg("发生错误，请刷新重试")
                    }
                }
            });
        }
    }else{
        layer.msg("输入出错了")
    }
}