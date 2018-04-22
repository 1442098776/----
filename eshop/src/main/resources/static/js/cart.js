var List = null;
$(document).ready(function() {
     getCartList();
     console.info(List);
     getCartByPage(null);
     // <!--兼容IE浏览器 -->
     if (!document.getElementsByClassName) {
         document.getElementsByClassName = function (cls) {
             var ret = [];
             var els = document.getElementsByTagName('*');
             for (var i = 0, len = els.length; i < len; i++) {

                 if (els[i].className.indexOf(cls + ' ') >= 0 || els[i].className.indexOf(' ' + cls + ' ') >= 0 || els[i].className.indexOf(' ' + cls) >= 0) {
                     ret.push(els[i]);
                 }
             }
             return ret;
         }
     }
 })
function getCartList() {
    $.ajax({
        url:'/GoodOfCart',
        type:'POST',
        dataType:'JSON',
        async: false,
        success:function (cartList) {
            // var cartTable = window.document.getElementById("cartContent");
            // var str = "";
            // if(cartList.length > 0){
            //     for(var i = 0;i < cartList.length;i++){
            //         str += '<tr class="item-list">' +
            //             '<div class="bundle  bundle-last ">' +
            //             '<div class="clear"></div>' +
            //             '<div class="bundle-main">' +
            //             '<ul class="item-content clearfix">' +
            //             '<li class="td td-chk">' +
            //             '<div class="cart-checkbox ">' +
            //             '<input class="check" id='+cartList[i].id+' onclick="getCartGood()" name="items" value='+cartList[i].id+' type="checkbox">' +
            //             '<label th:for='+cartList[i].id+'></label>' +
            //             '</div>' +
            //             '</li>' +
            //             '<li class="td td-item">';
            //         var good = cartList[i].good;
            //         for(var j = 0;j<good.goodPics.length;j++){
            //             if(!good.goodPics[j].grade){
            //                 str += '<div class="item-pic">' +
            //                     '<a href="#" target="_blank" class="J_MakePoint">' +
            //                     '<img width="80px" height="80px" src="../img/'+good.id+'/'+good.goodPics[j].picName+'" class="itempic J_ItemImg"></a>' +
            //                     '</div>';
            //             }
            //         }
            //         str +=
            //             '<div class="item-info">' +
            //             '<div class="item-basic-info">' +
            //             '<a href="#" target="_blank"  class="item-title J_MakePoint" >'+good.name+'</a>' +
            //             '</div>' +
            //             '</div>' +
            //             '</li>' +
            //             '' +
            //             '<li class="td td-price">' +
            //             '<div class="item-price price-promo-promo">' +
            //             '<div class="price-content">' +
            //             '<div class="price-line">' +
            //             '<em class="price-original" >'+good.price.toFixed(2)+'</em>' +
            //             '</div>' +
            //             '<div class="price-line">' +
            //             '<em class="J_Price price-now" tabindex="0" >'+cartList[i].goodPrice.toFixed(2)+'</em>' +
            //             '</div>' +
            //             '</div>' +
            //             '</div>' +
            //             '</li>' +
            //             '<li class="td td-amount">' +
            //             '<div class="amount-wrapper ">' +
            //             '<div class="item-amount ">' +
            //             '<div class="sl">' +
            //             '<div class="stock">' +
            //             '<input class="min" onclick="min(this)" type="text" value="-" readonly="readonly" style="width:26px;">' +
            //             '<input class="text_box" onchange="change()" name="" type="text" value='+cartList[i].count+' />' +
            //             // '<input class="add am-btn" name="" type="button" value="+" />' ++'"/>' +
            //             '<input class="add" onclick="add(this)" type="text" value="+" readonly="readonly" style="width:26px;">' +
            //             '</div>'+
            //             // '<input class="min am-btn" name="" type="button" value="-" />' +
            //             // '<input class="text_box" name="" type="text" value='+cartList[i].count+' style="width:30px;" />' +
            //             // '<input class="add am-btn" name="" type="button" value="+" />' +
            //             '</div>' +
            //             '</div>' +
            //             '</div>' +
            //             '</li>' +
            //             '<li class="td td-sum">' +
            //             '<div class="td-inner">' +
            //             '<em tabindex="0" class="J_ItemSum number" >'+(cartList[i].count*cartList[i].goodPrice).toFixed(2)+'</em>' +
            //             '</div>' +
            //             '</li>' +
            //             '<li class="td td-op">' +
            //             '<div class="td-inner">' +
            //             '<!--<a title="移入收藏夹" class="btn-fav" href="#">移入收藏夹</a>-->' +
            //             '<span style="cursor: pointer;" onclick="toDelete(this)" id='+cartList[i].id+' value='+cartList[i].id+' data-point-url="#" class="delete">删除</span>' +
            //             '</div>' +
            //             '</li>' +
            //             '</ul>' +
            //             '</div>' +
            //             '</div>' +
            //             '</tr>';
            //     }
            //     str += '<div class="clear"></div>';
            //     cartTable.innerHTML = str;
            // }else{
            //     str += '<div style="background-color:#e9e9e9;width: 100%;height: 100px;text-align: center;line-height: 100px;font-size: 24px;color: #9C9C9C">您的购物车什么也没有哟</div>' +
            //         '<div class="clear"></div>';
            //     cartTable.innerHTML = str;
            // }
            List = cartList;
        }
    });
}

/**
 * 前端分页
 * @param pageNow
 */
function getCartByPage(pageNow) {
    var my_pageNum = 1;
    if(pageNow != null){
        my_pageNum = pageNow;
    }
    //获取分页器ul
    var ul=window.document.getElementById("ul");
    var pageSize = 5;
    var totalPage = Math.ceil(List.length/pageSize);
    var cartTable = window.document.getElementById("cartContent");
    var str = "";
    if(List.length > 0){
        if(my_pageNum < totalPage){
            var limit = (my_pageNum-1)*pageSize+pageSize;
        }else {
            limit = List.length;
        }
        for(var i = (my_pageNum-1)*pageSize;i < limit;i++){
            str += '<tr class="item-list">' +
                '<div class="bundle  bundle-last ">' +
                '<div class="clear"></div>' +
                '<div class="bundle-main">' +
                '<ul class="item-content clearfix">' +
                '<li class="td td-chk">' +
                '<div class="cart-checkbox ">' +
                '<input class="check" id='+List[i].id+' onclick="getCartGood()" name="items" value='+List[i].id+' type="checkbox">' +
                '<label th:for='+List[i].id+'></label>' +
                '</div>' +
                '</li>' +
                '<li class="td td-item">';
            var good = List[i].good;
            for(var j = 0;j<good.goodPics.length;j++){
                if(!good.goodPics[j].grade){
                    str += '<div class="item-pic">' +
                        '<a href="/introduction/'+good.id+'" target="_blank" class="J_MakePoint">' +
                        '<img width="80px" height="80px" src="../img/'+good.id+'/'+good.goodPics[j].picName+'" class="itempic J_ItemImg"></a>' +
                        '</div>';
                }
            }
            str +=
                '<div class="item-info">' +
                '<div class="item-basic-info">' +
                '<a href="#" target="_blank"  class="item-title J_MakePoint" >'+good.name+'</a>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '' +
                '<li class="td td-price">' +
                '<div class="item-price price-promo-promo">' +
                '<div class="price-content">' +
                '<div class="price-line">' +
                '<em class="price-original" >'+good.price.toFixed(2)+'</em>' +
                '</div>' +
                '<div class="price-line">' +
                '<em class="J_Price price-now" tabindex="0" >'+List[i].goodPrice.toFixed(2)+'</em>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="td td-amount">' +
                '<div class="amount-wrapper ">' +
                '<div class="item-amount ">' +
                '<div class="sl">' +
                '<div class="stock">' +
                '<input class="min" onclick="reduce(this)" type="text" value="-" readonly="readonly" style="width:26px;">' +
                '<input class="text_box" onchange="change()" name="" type="text" value='+List[i].count+' />' +
                // '<input class="add am-btn" name="" type="button" value="+" />' ++'"/>' +
                '<input class="add" onclick="add(this)" type="text" value="+" readonly="readonly" style="width:26px;">' +
                '</div>'+
                // '<input class="min am-btn" name="" type="button" value="-" />' +
                // '<input class="text_box" name="" type="text" value='+List[i].count+' style="width:30px;" />' +
                // '<input class="add am-btn" name="" type="button" value="+" />' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="td td-sum">' +
                '<div class="td-inner">' +
                '<em tabindex="0" class="J_ItemSum number" >'+(List[i].count*List[i].goodPrice).toFixed(2)+'</em>' +
                '</div>' +
                '</li>' +
                '<li class="td td-op">' +
                '<div class="td-inner">' +
                '<!--<a title="移入收藏夹" class="btn-fav" href="#">移入收藏夹</a>-->' +
                '<span style="cursor: pointer;" onclick="toDelete(this)" id='+List[i].id+' value='+List[i].id+' data-point-url="#" class="delete">删除</span>' +
                '</div>' +
                '</li>' +
                '</ul>' +
                '</div>' +
                '</div>' +
                '</tr>';
        }
        str += '<div class="clear"></div>';
        cartTable.innerHTML = str;
    }else{
        str += '<div style="background-color:#e9e9e9;width: 100%;height: 100px;text-align: center;line-height: 100px;font-size: 24px;color: #9C9C9C">您的购物车什么也没有哟</div>' +
            '<div class="clear"></div>';
        cartTable.innerHTML = str;
    }
    var li = "";
    if(totalPage > 1){
        // 如果不是第一页
        if(my_pageNum > 1){
            li+="<li onclick=getCartByPage("+1+")>" +
                "<a href=\"#\" aria-label=\"Previous\" >" +
                "<span aria-hidden=\"true\">首页</span>\n" +
                "</a>\n" +
                "</li>"+
                "<li onclick=getCartByPage("+my_pageNum+'-'+1+")>" +
                "<a href=\"#\" aria-label=\"Previous\" >" +
                "<span aria-hidden=\"true\">上一页</span>\n" +
                "</a>\n" +
                "</li>";

        }
        if(totalPage<=10){//当页码不超过10的时候，全部显示
            for(var i=1;i<=totalPage;i++){
                li+="<li onclick=getCartByPage("+i+")><a href='#' >"+i+"</a></li>";

            }
        }else{//当大于10页时，根据当前页做处理。
            if(my_pageNum < 5) {//如果当前页小于5， 则显示 前面五个页码+省略号+最后一页。总页数大于10且当前页远离总页数(小于5)
                for(var i = 1; i <=5; i++) {
                    li+="<li onclick='getCartByPage("+i+")'><a href='#' >"+i+"</a></li>";
                }
                // li+="<li><a href='#' >..</a></li>"+
                //     "<li onclick='getCartByPage("+totalPage+")'><a href='#' >"+totalPage+"</a></li>";
            }else if(my_pageNum >=totalPage-3){//如果当前页是接近最后几页的，输出 首页码+省略号+后面几页（包括当前页）。总页数大于10且当前页接近总页数(小于总页数-3)
                // pages.push('<a class="page-link" href="javascript:void(0);">' + 1 + '</a> …');
                // li+="<li onclick=getCartByPage(1)><a href='#' >"+1+"</a></li>"+
                //     "<li><a href='#' >..</a></li>";
                for(var i=totalPage-4;i<=totalPage;i++){
                    li+="<li onclick=getCartByPage("+i+")><a href='#' >"+i+"</a></li>";
                }
            }else{ //剩下的情况，输出首页+省略号+中间几页（包含当前页）+省略号+最后一页。除开上面两个情况
                // pages.push('<a class="page-link" href="javascript:void(0);">' + 1 + '</a> … ');
                // li+="<li onclick=getCartByPage(1)><a href='#' >"+1+"</a></li>"+
                //     "<li><a href='#' >..</a></li>";
                for(var i=my_pageNum-2;i<=my_pageNum+2;i++){
                    li+="<li onclick=getCartByPage("+i+")><a href='#' >"+i+"</a></li>";
                }
                // pages.push(' … <a class="page-link" href="javascript:void(0);">' + total + '</a>');
                // li+="<li><a href='#' >..</a></li>"+
                //     "<li onclick=getCartByPage("+totalPage+")><a href='#' >"+totalPage+"</a></li>";
            }
        }

        // 如果不是最后一页
        if (my_pageNum < totalPage) {
            li+="<li onclick=getCartByPage("+my_pageNum+'+'+1+")>" +
                "<a href=\"#\" aria-label=\"Next\" >" +
                "<span aria-hidden=\"true\">下一页</span>\n" +
                "</a>" +
                "</li>"+
                "<li onclick=getCartByPage("+totalPage+")>" +
                "<a href=\"#\" aria-label=\"Next\" >" +
                "<span aria-hidden=\"true\">末页</span>\n" +
                "</a>" +
                "</li>";
        }
        ul.innerHTML=li;
    }else {
        ul.innerHTML="";
    }

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
    getCartGood();

}

 /**
  * 根据选择的商品计算总价格
  */
 function getCartGood() {
    //获取所有的复选框列表
    var checkboxTag = document.getElementsByName("items");
    //等到商品的总价格列表
    var priceTag = document.getElementsByClassName("number");
    //购买商品数量
    var ItemsCountTag = document.getElementById("J_SelectedItemsCount");
    //总价
    var totalTag = document.getElementById("J_Total");
    var total = 0;
    var itemTotal = 0;
    for(var i = 0;i<checkboxTag.length;i++){
        if(checkboxTag[i].checked){
            total += parseFloat(priceTag[i].innerText);
            itemTotal++;
        }
    }
    //计算所选商品件数
    ItemsCountTag.innerText = itemTotal;
    totalTag.innerText = total.toFixed(2);
}

 /**
  *  全选与取消全选
  */

function selectAll() {
    var checkboxTag = document.getElementsByName("items");
    var selectAll = document.getElementById("J_SelectAllCbx2");
    if(selectAll.checked){
        for(i in checkboxTag){
            checkboxTag[i].checked = true;
        }
    }else{
        for(i in checkboxTag){
            checkboxTag[i].checked = false;
        }
    }
    getCartGood();
}

 /**
  * 去结算
  */
 function toPay() {
     //获取所有的复选框列表
     var checkboxTag = document.getElementsByName("items");

     var id = "";
     var flag = 0;
     for (var i = 0; i < checkboxTag.length; i++) {
         if (checkboxTag[i].checked) {
             // check_val.push(checkbox[i].value);
             id += checkboxTag[i].id + ',';
             flag++;
         }
     }
     if (flag > 0) {
         var idlastindex = id.lastIndexOf(",");
         id = id.substring(0, idlastindex);
         location.href = "/cartpay?id=" + id;
     } else {
         alert("没有选择任何商品");
     }
 }

 /**
  * 删除购物车
  */
 function toDelete(inputId) {
     //获取所有的复选框列表
     var checkboxTag = document.getElementsByName("items");

     var id = "";
     var flag = 0;
     if(inputId == null){
         for (var i = 0; i < checkboxTag.length; i++) {
             if (checkboxTag[i].checked) {
                 // check_val.push(checkbox[i].value);
                 id += checkboxTag[i].id + ',';
                 flag++;
             }
         }
         var idLastIndex = id.lastIndexOf(",");
         id = id.substring(0, idLastIndex);
     }else {
         id = $(inputId).attr('value');
         flag++;
     }
     if (flag > 0) {
         $.ajax({
             url:'/deleteCartById',
             data:{
                 id:id
             },
             type:'POST',
             dataType:'JSON',
             success:function (msg) {
                 if(msg == 1){
                    layer.msg("删除成功");
                    location.href = "/shopcart";
                 }else{
                     alert("发生错误请稍后刷新重试");
                 }
             }
         })
     } else {
         alert("没有选择任何商品");
     }
 }
 
 
 
 
 
 
 
 
 
 
 

