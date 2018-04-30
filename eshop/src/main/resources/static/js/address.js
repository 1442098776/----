$(document).ready(function(){

    /**
     * 计算总支付价钱
     */
    allPay();
    /**
     * 添加、减少、修改数量
     */
    // $(function(){
    //     $(".add").click(function(){
    //         var t=$(this).parent().find('input[class*=text_box]');
    //         t.val(parseInt(t.val())+1)
    //         goodTotal();
    //
    //     })
    //     $(".min").click(function(){
    //         var t=$(this).parent().find('input[class*=text_box]');
    //         t.val(parseInt(t.val())-1)
    //         if(parseInt(t.val())<1){
    //             t.val(1);
    //         }
    //         goodTotal();
    //     })
    //     $(".text_box").change(function () {
    //         goodTotal();
    //     })
    // })


    // <!--兼容IE浏览器 -->
    if (!document.getElementsByClassName) {
        document.getElementsByClassName = function (cls) {
            var ret = [];
            var els = document.getElementsByTagName('*');
            for (var i = 0, len = els.length; i < len; i++) {

                if (els[i].className.indexOf(cls + ' ') >=0 || els[i].className.indexOf(' ' + cls + ' ') >=0 || els[i].className.indexOf(' ' + cls) >=0) {
                    ret.push(els[i]);
                }
            }
            return ret;
        }
    }
 
 
    //地址选择
    $(function() {
        //默认地址
        var defaultAddress = $(".user-addresslist").find("ins");
        // alert(defaultAddress.length);
        if(defaultAddress.length > 0){
            $(".user-addresslist").find("ins").parent().parent().addClass("defaultAddr").siblings().removeClass("defaultAddr");
            var buy_address_detail = window.document.getElementById("buy_address_detail");
            var consignee_name = window.document.getElementById("consignee_name");
            var consignee_phone = window.document.getElementById("consignee_phone");
            var buyAddressId = window.document.getElementById("buyAddress");
            var input = $(".user-addresslist").find("ins").parent().parent().find("input");
            var user_name = $(".user-addresslist").find("ins").parent().parent().find("span.buy-user");
            var user_phone = $(".user-addresslist").find("ins").parent().parent().find("span.buy-phone");
            var user_address_detail = $(".user-addresslist").find("ins").parent().parent().find("span.buy--address-detail");
            // alert(input.length);
            // alert(user_name.length);
            // alert(user_phone.length);
            // alert(user_address_detail.length);
            consignee_name.innerText = user_name[0].innerText;
            consignee_phone.innerText = user_phone[0].innerText;
            buy_address_detail.innerText = user_address_detail[0].innerText;
            buyAddressId.value = input[0].value;
        }
        //点击更换地址
        $(".user-addresslist").click(function() {
            $(this).addClass("defaultAddr").siblings().removeClass("defaultAddr");
            var buy_address_detail = window.document.getElementById("buy_address_detail");
            var consignee_name = window.document.getElementById("consignee_name");
            var consignee_phone = window.document.getElementById("consignee_phone");
            var buyAddressId = window.document.getElementById("buyAddress");
            var input = $(this).find("input");
            var user_name = $(this).find("span.buy-user");
            var user_phone = $(this).find("span.buy-phone");
            var user_address_detail = $(this).find("span.buy--address-detail");
            // alert(input.length);
            // alert(user_name.length);
            // alert(user_phone.length);
            // alert(user_address_detail.length);
            consignee_name.innerText = user_name[0].innerText;
            consignee_phone.innerText = user_phone[0].innerText;
            buy_address_detail.innerText = user_address_detail[0].innerText;
            buyAddressId.value = input[0].value;
            // alert($(this).find("input").value);
            // alert(input[0].value);
            // alert(user_name[0].innerText);
            // alert(user_phone[0].innerText);
            // alert(user_address_detail[0].innerText);
        });
        $(".logistics").each(function() {
            var i = $(this);
            var p = i.find("ul>li");
            p.click(function() {
                if (!!$(this).hasClass("selected")) {
                    $(this).removeClass("selected");
                } else {
                    $(this).addClass("selected").siblings("li").removeClass("selected");
                }
            })
        })
    });
})
 
// 弹出地址选择
 
$(document).ready(function($) {

    var $ww = $(window).width();

    $('.theme-login').click(function() {
//					禁止遮罩层下面的内容滚动
        $(document.body).css("overflow","hidden");

        $(this).addClass("selected");
        $(this).parent().addClass("selected");


        $('.theme-popover-mask').show();
        $('.theme-popover-mask').height($(window).height());
        $('.theme-popover').slideDown(200);

    })

    $('.theme-poptit .close,.btn-op .close').click(function() {

        $(document.body).css("overflow","visible");
        $('.theme-login').removeClass("selected");
        $('.item-props-can').removeClass("selected");
        $('.theme-popover-mask').hide();
        $('.theme-popover').slideUp(200);
    })

    //失去焦点验证手机格式
    $("#user-phone").blur(function () {
        var phoneReg = /^1[34578]\d{9}$/;
        var inputPhone = $('#user-phone').val();
        console.info("inputPhone"+inputPhone);
        if (!phoneReg.test(inputPhone)) {
            $(this).next().text("格式错误，请输入正确手机号！").attr("style","color:red").attr("font-size","12px");
        } else {
            $(this).next().text("正确").attr("style","color:green").attr("font-size","12px");
        }
    });


});

/**
 * 计算商品总价格
 */
function goodTotal() {
    var price = window.document.getElementsByClassName("price-now");
    var num = window.document.getElementsByClassName("text_box");
    var number = window.document.getElementsByClassName("number");
    for(var i = 0;i<price.length;i++){
        var sum = (parseFloat(price[i].innerText)*num[i].value).toFixed(2);
        number[i].innerText = sum;
    }

    allPay();

}

/**
 * 根据选择的商品计算总价格
 */
function allPay() {

    //等到商品的总价格列表
    var priceTag = document.getElementsByClassName("number");
    //总价
    var totalTag = document.getElementById("total");
    var totalTag2 = document.getElementById("J_ActualFee");
    var freight = window.document.getElementsByClassName("sys_item_freprice");
    var total = 0;
    for(var i = 0;i<priceTag.length;i++){
        total += parseFloat(priceTag[i].innerText);
    }
    if(total > 20){
        freight[0].innerText = 0.00;
    }else{
        total += 10;
    }
    totalTag.innerText = total.toFixed(2);
    totalTag2.innerText = total.toFixed(2);
}

/**
 * 保存地址
 */
function saveAddress(){

    $.ajax({
        url: '/address/getAddressCount',
        type: 'POST',
        dataType: 'JSON',
        success: function (data) {
            //地址条数少于20可以添加
            if(data == 1){
                var username = window.document.getElementById("user-name").value;
                var phone = window.document.getElementById("user-phone").value;
                var province = getAddress("province");
                var city = getAddress("city");
                var area = getAddress("area");
                var addressInfo = window.document.getElementById("user-intro").value;

                var address = province + city + area + addressInfo;

                alert(username+","+phone+","+address);

                $.ajax({
                    url:'/address/saveAddress',
                    type:'POST',
                    data:{
                        phone:phone,
                        consignee:username,
                        addressName:address
                    },
                    dataType:'JSON',
                    success:function (msg) {
                        if(msg == 1){
                            //关闭
                            $(document.body).css("overflow","visible");
                            $('.theme-login').removeClass("selected");
                            $('.item-props-can').removeClass("selected");
                            $('.theme-popover-mask').hide();
                            $('.theme-popover').slideUp(200);
                            alert("添加地址成功");
                            //获取当前的url
                            var url = window.location.href;
                            location.href = url;
                            // $('#address').append('<div class="per-border"></div>' +
                            //     '<li class="user-addresslist">' +
                            //     '<div class="address-left"><div class="user DefaultAddr">' +
                            //     '<span class="buy-address-detail">' +
                            //     '<span class="buy-user" >'+username+' </span>' +
                            //     '<span class="buy-phone">'+phone+'</span>' +
                            //     '</span></div><div class="default-address DefaultAddr">' +
                            //     '<span class="buy-line-title buy-line-title-type">收货地址：</span>' +
                            //     '<span class="buy--address-detail" >'+address+'</span>' +
                            //     '<div class="clear"></div>' +
                            //     '</li>');
                            // buy_address_detail.innerText = address;
                            // consignee_name.innerText = username;
                            // consignee_phone.innerText = phone;
                        }else if(msg == 2) {
                            //关闭
                            $(document.body).css("overflow","visible");
                            $('.theme-login').removeClass("selected");
                            $('.item-props-can').removeClass("selected");
                            $('.theme-popover-mask').hide();
                            $('.theme-popover').slideUp(200);
                            alert("添加地址成功");
                            // buy_address_detail.innerText = address;
                            // consignee_name.innerText = username;
                            // consignee_phone.innerText = phone;
                        }else {
                            alert("发生一个未知错误，请稍后重试!!!")
                        }
                    }
                })
            }else {
                alert("地址条数已超限制");
            }
        }
    })



}

//得到省市县地址
function getAddress(id) {
    //得到select对象
    var select = window.document.getElementById(id);
    //得到被选的option的下标
    var index = select.selectedIndex;
    //得到option对象
    var option = select.options[index];
    //获取option的value
    var value = option.value;
    return value;
}

/**
 * 确定购买
 */
function sureBuy() {
    //得到所有商品的id
    var goodIdTag = window.document.getElementsByClassName("goodId");
    var goodCountTag = window.document.getElementsByClassName("text_box");
    var goodPriceTag = window.document.getElementsByClassName("price-now");
    var address = window.document.getElementById("buyAddress").value;
    var sum = parseFloat(window.document.getElementById("J_ActualFee").innerText);
    var goodId = "";
    var goodCount = "";
    var goodPrice = "";
    for(var i = 0;i < goodIdTag.length;i++){
        goodId += goodIdTag[i].value + ",";
        goodCount += goodCountTag[i].value + ",";
        goodPrice += goodPriceTag[i].innerText + ",";
    }
    var goodIdlastindex = goodId.lastIndexOf(",");
    var goodCountlastindex = goodCount.lastIndexOf(",");
    var goodPricelastindex = goodPrice.lastIndexOf(",");
    goodId = goodId.substring(0, goodIdlastindex);
    goodCount = goodCount.substring(0, goodCountlastindex);
    goodPrice = goodPrice.substring(0, goodPricelastindex);

    // alert(address);
    var message = window.document.getElementById("message").value;
    $.ajax({
        url:'/order/createOrder',
        type:'POST',
        data:{
            goodIds:goodId,
            goodCounts:goodCount,
            goodPrices:goodPrice,
            message:message,
            receiveAddress:address,
            sum:sum
        },
        dataType:'JSON',
        success:function (msg) {
            console.info(msg);
            if(msg == 1){
                location.href = "/success";
            }else{
                alert("发生错误请稍后重试");
            }
        }
    })
}

function add(type) {
    var t = $(type).parent().find('input.text_box');
    t.val(parseInt(t.val()) + 1)
    goodTotal();
}

function reduce(type) {
    var t = $(type).parent().find('input.text_box');
    t.val(parseInt(t.val()) - 1)
    if (parseInt(t.val()) < 1) {
        t.val(1);
    }
    goodTotal();
}

function change() {
    goodTotal();
}

function showModal() {
    $("#sureBuy").modal('show');
    setTimeout("closeModal()",1000*5);
}
function closeModal() {
    $("#sureBuy").modal('hide');
    sureBuy();
}

 
 
 
 
 
 
 
 
 
 
 
 

