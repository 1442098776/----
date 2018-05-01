var is_verity_success = false;

/**
 * 验证码填写框改变监听方法
 */
function blurForVerityCode() {
    //获取用户填写的验证码
    var verityCode = $("#code").val();
    $.ajax({
        url: "/verity/beforeLoginForVerityCode",
        async: false,
        type: "POST",
        dataType: "JSON",
        data: {
            verityCode: verityCode
        },
        success: function (data) {
            console.log(data);
            if (data == "1") {
                is_verity_success = true;
                $("#code").prev().prev().text("");
            } else {
                $("#user").prev().prev().text("");
                $("#password").prev().prev().text("");
                $("#code").prev().prev().text("验证码错误").attr("style","color:red;position: absolute; right: 42px;bottom: 140px;");
                is_verity_success = false;
            }
        }
    });
}


// 用于表单提交前返回该函数
function checkVerityCode() {
    blurForVerityCode();
    changeVerityImg();
    if(is_verity_success){
        $.ajax({
            type : "POST", //请求方式
            url : "/admin/adminLogin", //请求路径
            cache : false,
            data : $("#loginform").serialize(),  //传参 页数
            dataType : 'json', //返回值类型
            success : function(data) {
                console.info("userlogin"+data);
                if(data == 2){
                    location.href = "/admin/index";
                }else if(data == 1){
                    $("#user").prev().prev().text("账号不存在或异常").attr("style","color:red;position: absolute; right: 42px;top: 100px;");
                    $("#password").prev().prev().text("");
                }else if(data == 3){
                    $("#user").prev().prev().text("该账户没有权限登录管理系统").attr("style","color:red;position: absolute; right: 42px;top: 100px;");
                    $("#password").prev().prev().text("");
                }else{
                    $("#user").prev().prev().text("");
                    $("#password").prev().prev().text("密码错误").attr("style","color:red;position: absolute; right: 42px;bottom: 220px;");
                }
            }
        });
    }
}

/**
 * 更换验证码图片
 */
function changeVerityImg() {
    document.getElementById("myVerityImg").src = "/verity/verityImg?time=" + Math.random();
}
