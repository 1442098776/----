/**
 * 获取省数据
 */
function getProvince() {
    var province = window.document.getElementById("province");
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
function getCity() {
    //得到select对象
    var select = window.document.getElementById("province");
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
    var city = window.document.getElementById("city");
    var area = window.document.getElementById("area");
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
function getArea() {
    //得到select对象
    var select = window.document.getElementById("city");
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
    var area = window.document.getElementById("area");
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
 * 购买商品,并跳转到信息却界面
 */
function pay() {
    $.ajax({
        url: '/checkLogin',
        type: 'POST',
        dataType: 'JSON',
        success: function (msg) {
            if(msg == 1){
                //    获取商品id
                var goodId = window.document.getElementById("goodId").value;
                //    获取价格
                var price = window.document.getElementById("price").innerText
                //    获取数量
                var num = window.document.getElementById("text_box").value;
                //    获取运费
                var freight = window.document.getElementById("freight").innerText;

                console.info("price"+price);
                console.info("num"+num);
                console.info("freight"+freight);
                $.ajax({
                    url:'/buy',
                    type:'POST',
                    data:{
                        goodId:goodId,
                        price:price,
                        num:num,
                        freight:freight
                    },
                    dataType:'JSON',
                    success:function (data) {
                        if(data == 1){
                            location.href = "/pay"
                        }else {
                            location.href = "/login"
                        }
                    }

                })
            }else {
                location.href = "/login"
            }
        }
    })



}

/**
 * 添加商品到购物车
 */
function addCart() {
    //先检查是否已登录
    $.ajax({
        url:'/checkLogin',
        type:'POST',
        dataType:'JSON',
        success:function (msg) {
            if(msg == 1){
                //    获取商品id
                var goodId = window.document.getElementById("goodId").value;
                //    获取价格
                var price = window.document.getElementById("price").innerText
                //    获取数量
                var num = window.document.getElementById("text_box").value;
                console.info("price"+price);
                console.info("num"+num);
                $.ajax({
                    url:'/addCart',
                    type:'POST',
                    data:{
                        goodId:goodId,
                        goodPrice:price,
                        count:num,
                    },
                    dataType:'JSON',
                    success:function (data) {
                        if(data == 1){
                            getCartCount();
                        }else{
                            alert("发生一个未知错误，请刷新重试!")

                        }
                    }

                })
            }else {
                location.href = "/login"
            }
        }
    })

}

/**
 * 初始或省列表
 */
$(function () {
    getProvince();
})