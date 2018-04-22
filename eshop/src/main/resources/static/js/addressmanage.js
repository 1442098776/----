$(document).ready(function (){
    getAllAddress();
    getProvince2();
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
    //失去焦点验证手机格式
    $("#consignee_phone").blur(function () {
        var phoneReg = /^1[34578]\d{9}$/;
        var inputPhone = $('#consignee_phone').val();
        console.info("inputPhone"+inputPhone);
        if (!phoneReg.test(inputPhone)) {
            $(this).next().text("格式错误，请输入正确手机号！").attr("style","color:red").attr("font-size","12px");
        } else {
            $(this).next().text("正确").attr("style","color:green").attr("font-size","12px");
        }
    });


})

/**
 * 获取该用户的所以地址
 */
function getAllAddress() {
    $.ajax({
        url:'/address/getAllAddress',
        type:'POST',
        dataType:'JSON',
        success:function (data) {
            console.info(data);
            if(data != null){
                var addressList = window.document.getElementById("addressList");
                var str = "";
                for (var i = 0;i < data.length;i++){

                        if(data[i].level == 1){
                            str += "<li class=\"user-addresslist defaultAddr\">"+
                                "<span class=\"new-option-r\"><i class=\"am-icon-check-circle\"></i>默认地址</span>"
                        }else {
                            str += "<li class=\"user-addresslist\">"+
                                "<span class=\"new-option-r\" onclick='modifyDefaultAddress("+data[i].addressId+")' ><i class=\"am-icon-check-circle\" ></i>设为默认</span>"
                        }
                    str +="<p class=\"new-tit new-p-re\">" +
                        "<span class=\"new-txt\">"+data[i].consignee+"</span>"
                    var phoneStr=data[i].phone;
                    var phone = phoneStr.substr(0,3)+"****"+phoneStr.substr(7);
                    str += "<span class=\"new-txt-rd2\">"+phone+"</span>"+
                        "</p>" +
                        "<div class=\"new-mu_l2a new-p-re\">" +
                        "<p class=\"new-mu_l2cw\">" +
                        "<span class=\"title\">地址："+data[i].addressName+"</span>" +
                        "</div>" +
                        "<div class=\"new-addr-btn\">" +
                        "<a href='javaScript:showEdit("+data[i].addressId+")'><i class=\"am-icon-edit\"></i>编辑</span>" +
                        "<span class=\"new-addr-bar\">|</span>" +
                        "<a href='javaScript:deleteAddress("+data[i].addressId+")'><i class=\"am-icon-trash\"></i>删除</a>" +
                        "</div>" +
                        "</li>"
                }
                addressList.innerHTML = str;
            }
        }
    })
}

/**
 * 更新默认地址
 * @param id
 */
function modifyDefaultAddress(id) {
    $.ajax({
        url:'/address/updateAddress',
        type:'POSt',
        data:{
            addressId:id,
            type:0
        },
        dataType:'JSON',
        success:function (msg) {
            if(msg == 1){
                getAllAddress();
            }else{
                alert("发生错误请稍后重试")
            }
        }
    })
}
/**
 * 获取省数据
 */
function getProvince2() {
    var province = window.document.getElementById("province2");
    var str = '<option value="null">--请选择--</option>';
    $.ajax({
        url:'/province',
        type:'POST',
        dateType:'json',

        success:function(data) {
            console.info(data);
            for(var i=0; i < data.length; i++){
                str += "<option id = "+data[i].provinceId+" value="+data[i].provinceName+">"+data[i].provinceName+"</option>"
            }
            // console.info(str);
            province.innerHTML = str;
        }
    })

}

/**
 * 根据省获取市
 */
function getCity2() {
    //得到select对象
    var select = window.document.getElementById("province2");
    //得到被选的option的下标
    var index = select.selectedIndex;
    //得到option对象
    var option = select.options[index];
    //获取option的id
    var id = option.id;
    //获取option的value
    var value = option.value;
    // alert(id)
    // alert(value);
    var city = window.document.getElementById("city2");
    var area = window.document.getElementById("area2");
    area.innerHTML = '<option value="null">--请选择--</option>';
    var str = '<option value="null">--请选择--</option>';
    $.ajax({
        url:'/city',
        data:{
            province_id:id
        },
        type:'POST',
        dataType:'json',
        success:function (data) {
            for(var i=0; i < data.length; i++){
                str += "<option id = "+data[i].cityId+" value="+data[i].cityName+">"+data[i].cityName+"</option>"
            }
            // console.info(str);
            city.innerHTML = str;
        }
    })
}

/**
 * 根据市获取县
 */
function getArea2() {
    //得到select对象
    var select = window.document.getElementById("city2");
    //得到被选的option的下标
    var index = select.selectedIndex;
    //得到option对象
    var option = select.options[index];
    //获取option的id
    var id = option.id;
    //获取option的value
    var value = option.value;
    // alert(id)
    // alert(value);
    var area = window.document.getElementById("area2");
    var str = '<option value="null">--请选择--</option>';
    $.ajax({
        url:'/area',
        data:{
            city_id:id
        },
        type:'POST',
        dataType:'json',
        success:function (data) {
            for(var i=0; i < data.length; i++){
                str += "<option id = "+data[i].areaId+" value="+data[i].areaName+">"+data[i].areaName+"</option>"
            }
            // console.info(str);
            area.innerHTML = str;
        }
    })
}
/**
 * 修改地址
 * @param id
 */
function modifyAddress() {
    var id = window.document.getElementById("addressId").value;
    var consignee_name = window.document.getElementById("consignee_name").value;
    var consignee_phone = window.document.getElementById("consignee_phone").value;
    var province = getAddress("province2");
    var city = getAddress("city2");
    var area = getAddress("area2");
    var addressInfo = window.document.getElementById("user-intro2").value;
    var address = "";
    if(province != "" && city != "" && area != "" && addressInfo != ""){
        address =  province + city + area + addressInfo;
    }else {
        address = window.document.getElementById("reveice_address").innerText;
    }
    // alert(consignee_name+","+consignee_phone+","+address);
    $.ajax({
        url:'/address/updateAddress',
        type:'POSt',
        data:{
            addressId:id,
            consignee:consignee_name,
            phone:consignee_phone,
            addressName:address,
            type:1
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
                getAllAddress();
            }else{
                alert("发生错误请稍后重试")
            }
        }
    })
}

// 弹出地址选择
function showEdit(id) {
    alert(id)
    $.ajax({
        url:'/address/getAddressById',
        type:'POST',
        data:{
            addressId:id
        },
        dataType:'JSON',
        success:function (data) {
            window.document.getElementById("reveice_address").innerText = data.addressName;
            window.document.getElementById("consignee_name").value = data.consignee;
            window.document.getElementById("consignee_phone").value = data.phone;
            window.document.getElementById("addressId").value = data.addressId;
        }
    })
//					禁止遮罩层下面的内容滚动
    $(document.body).css("overflow","hidden");

    $('.theme-login').addClass("selected");
    $('.theme-login').parent().addClass("selected");


    $('.theme-popover-mask').show();
    $('.theme-popover-mask').height($(window).height());
    $('.theme-popover').slideDown(200);


}
$(document).ready(function($) {

    var $ww = $(window).width();


    $('.theme-poptit .close,.btn-op .close').click(function() {

        $(document.body).css("overflow","visible");
        $('.theme-login').removeClass("selected");
        $('.item-props-can').removeClass("selected");
        $('.theme-popover-mask').hide();
        $('.theme-popover').slideUp(200);
    })

});
/**
 * 添加地址
 */
function saveAddress(){

    $.ajax({
        url:'/address/getAddressCount',
        type:'POST',
        dataType:'JSON',
        success:function (data) {
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
                        if(msg == 1 || msg == 2){

                            alert("添加地址成功");
                            getAllAddress();
                        }else {
                            alert("发生一个未知错误，请稍后重试!!!")
                        }
                    }
                })
            }else{
                alert("地址条数已超限制")
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

function deleteAddress(id) {
    $.ajax({
        url:'/address/deleteAddress',
        type:'POST',
        data:{
            addressId:id
        },
        dataType:'JSON',
        success:function (msg) {
            if(msg == 1){
                getAllAddress();
            }else{
                alert("发生错误请稍后重试");
            }
        }
    })
}