 $(document).ready(function() {
     $(function () {
         $(".add").click(function () {
             var t = $(this).parent().find('input[class*=text_box]');
             t.val(parseInt(t.val()) + 1)
             goodTotal();

         })
         $(".min").click(function () {
             var t = $(this).parent().find('input[class*=text_box]');
             t.val(parseInt(t.val()) - 1)
             if (parseInt(t.val()) < 1) {
                 t.val(1);
             }
             goodTotal();
         })
         $(".text_box").change(function () {
             goodTotal();
         })
     })


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
 
 
 
 
 
 
 
 
 
 
 

