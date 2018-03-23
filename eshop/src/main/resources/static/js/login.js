var is_verity_success = false;

/**
 * 验证码填写框改变监听方法
 */
function blurForVerityCode() {
    //获取用户填写的验证码
    var verityCode = $("#myVerityCode").val();
    $.ajax({
        url: "/verity/beforeLoginForVerityCode",
        async: false,
        type: "POST",
        dataType: "JSON",
        data: "verityCode=" + verityCode,
        success: function (data) {
            console.log(data);
            if (data.code == "1") {
                is_verity_success = true;
            } else {
                is_verity_success = false;
            }
        }
    });
}

// 用于表单提交前返回该函数
function checkVerityCode() {

    changeVerityImg();
    return is_verity_success;
}

/**
 * 更换验证码图片
 */
function changeVerityImg() {
    document.getElementById("myVerityImg").src = "/verity/verityImg?time=" + Math.random();
}

//给点击表单提交之前进行是否注册的异步查询操作
$("#login").click(function() {

    /*
     * 判断是注册页面的还是用户管理添加用户页面的。
     */
    $.ajax({
        type : "POST", //请求方式
        url : "/userlogin", //请求路径
        cache : false,
        data : $("#loginform").serialize(),  //传参 页数
        dataType : 'json', //返回值类型
        success : function() {
            alert("登陆成功！");
        }
    });
});