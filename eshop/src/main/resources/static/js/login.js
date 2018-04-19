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
                $("#code").parent().prev().children().text("");
            } else {
                $("#user").parent().prev().children().text("");
                $("#password").parent().prev().children().text("");
                $("#code").parent().prev().children().text("验证码错误").attr("style","color:red");
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
        //获取该网址，以便重新跳回
        var prevLink = window.document.referrer;
        console.info(prevLink);
        $.ajax({
            type : "POST", //请求方式
            url : "/login2", //请求路径
            cache : false,
            data : $("#loginform").serialize(),  //传参 页数
            dataType : 'json', //返回值类型
            success : function(data) {
                console.info("userlogin"+data);
                if(data == 2){
                    if(prevLink.trim() == "" ){
                        location.href = "/";
                    }else{
                        location.href = prevLink;
                    }

                }else if(data == 1){
                    $("#user").parent().prev().children().text("账号不存在或异常").attr("style","color:red");
                    $("#password").parent().prev().children().text("");
                }else{
                    $("#user").parent().prev().children().text("");
                    $("#password").parent().prev().children().text("密码错误").attr("style","color:red");
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

// //给点击表单提交之前进行是否注册的异步查询操作
// $("#login").click(function() {
//
//     /*
//      * 判断是注册页面的还是用户管理添加用户页面的。
//      */
//
// });