var List = null;
$(document).ready(function () {
    getOrderByStatus();
    getOrderByPage(null);
    $('#close').click(function () {
        $(document.body).css("overflow","visible");
        $('.theme-popover-mask').hide();
        $('.theme-popover').attr("style","display:none");
    })
});

function initOrderManage() {
    $.ajax({
        url:'/order/getAllOrderByUserId',
        type:'POST',
        dataType:'JSON',
        async:false,
        success:function (orderVoList) {
            console.info("initOrderManage"+orderVoList);
            List = orderVoList;
        }
    })
}
function getOrderByPage(pageNow) {
    var my_pageNum = 1;
    if(pageNow != null){
        my_pageNum = pageNow;
    }
    //获取分页器ul
    var ul=window.document.getElementById("ul");
    var pageSize = 5;
    //计算总页数
    var totalPage = Math.ceil(List.length/pageSize);

    var orderList = window.document.getElementById("order-list");
    var str = "";
    if(List.length > 0){
        if(my_pageNum < totalPage){
            var limit = (my_pageNum-1)*pageSize+pageSize;
        }else {
            limit = List.length;
        }
        var total = 0;
        for(var i = (my_pageNum-1)*pageSize;i < limit;i++){

            str += '<div class="order-status">\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t<div class="order-title">\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="dd-num">订单编号：<a href="javascript:;">'+List[i].orderId+'</a></div>\n';
                if(List[i].status == 0){
                    str += '<span>下单时间：'+new Date(List[i].createTime).Format('yyyy-MM-dd hh:mm')+'</span>';
                }else if(List[i].status == 1){
                    str += '<span>下单时间：'+new Date(List[i].createTime).Format('yyyy-MM-dd hh:mm')+'</span>'+
                            '<span style="padding-left: 20px;">发货时间：'+new Date(List[i].sendTime).Format('yyyy-MM-dd hh:mm')+'</span>';
                }else if(List[i].status == 2){
                    str += '<span>下单时间：'+new Date(List[i].createTime).Format('yyyy-MM-dd hh:mm')+'</span>'+
                        '<span style="padding-left: 20px;">发货时间：'+new Date(List[i].sendTime).Format('yyyy-MM-dd hh:mm')+'</span>'+
                        '<span style="padding-left: 20px;">完成时间：'+new Date(List[i].receiveTime).Format('yyyy-MM-dd hh:mm')+'</span>';
                }else{
                    str += '<span>下单时间：'+new Date(List[i].createTime).Format('yyyy-MM-dd hh:mm')+'</span>'+
                        '<span style="padding-left: 20px;">取消时间：'+new Date(List[i].cancelTime).Format('yyyy-MM-dd hh:mm')+'</span>';
                }
                    str +=
                '\t\t\t\t\t\t\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t<div class="order-content">\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="order-left">\n';
            var orderDetail = List[i].orderDetailVoList;
            for(var j = 0;j<orderDetail.length;j++){
                var good = orderDetail[j].good;
                var goodPics = good.goodPics;
                str += '\t\t\t\t\t\t\t\t\t\t\t\t\t\t<ul class="item-list">\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<li class="td td-item">\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="item-pic">\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<a href="#" class="J_MakePoint">\n';
                    for(var k = 0;k<goodPics.length;k++){
                        if(goodPics[k].grade == 0){
                            str += '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<img src="../img/'+good.id+'/'+goodPics[k].picName+'" class="itempic J_ItemImg">\n';
                        }

                    }
                    str +=
                    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</a>\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="item-info">\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="item-basic-info">\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<a href="#">\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p>'+good.name+'</p>\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</a>\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</li>\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<li class="td td-price">\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="item-price">\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t'+orderDetail[j].goodPrice.toFixed(2)+'\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</li>\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<li class="td td-number">\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="item-number">\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span>'+orderDetail[j].goodCount+'</span>\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</li>\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<li class="td td-operation">\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="item-operation">\n' +
                    '\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</li>\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t</ul>\n';
                    total += orderDetail[j].goodPrice*orderDetail[j].goodCount;
            }
                str +=
                '\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="order-right">\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t<li class="td td-amount">\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="item-amount" >\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t'+total.toFixed(2)+'\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t</li>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="move-right">\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<li class="td td-status">\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="item-status" style="padding-top: 25px;\n' +
                    '    padding-left: 25px;">\n';
                if(List[i].status == 0){
                    str += '<p class="Mystatus" onclick="updateOrder('+List[i].orderId+','+1+')" style="cursor: pointer;position: absolute;transform: translateY(-50%);top: 50%;">取消订单</p>';
                }else if(List[i].status == 1){
                    str += '<p class="Mystatus" style="position: absolute;transform: translateY(-50%);top: 50%;">商品已发货</p>';
                }else if(List[i].status == 2){
                    str += '<p class="Mystatus" style="position: absolute;transform: translateY(-50%);top: 50%;">交易完成</p>';
                }else{
                    str += '<p class="Mystatus" style="position: absolute;transform: translateY(-50%);top: 50%;">订单已取消</p>';
                }
                str +=
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</li>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<li class="td td-status">\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div onclick="showEdit('+List[i].orderId+')" style="position: absolute;transform: translateY(-50%);top: 50%;padding-left: 20px;"><p class="order-info" style="cursor: pointer">订单详情</p>\n';
                if(List[i].status == 2 || List[i].status == 3 ){
                    str += '<p class="order-info" onclick="updateOrder('+List[i].orderId+','+2+')" style="cursor: pointer">删除订单</p>';
                }
                str +=
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div></li>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t</div>';
                total = 0;
        }
        orderList.innerHTML = str;
    }else{
        str += '<div style="background-color:#e9e9e9;width: 100%;height: 100px;text-align: center;line-height: 100px;font-size: 24px;color: #9C9C9C">没有任何订单</div>' +
            '<div class="clear"></div>';
        orderList.innerHTML = str;
    }
    var li = "";
    if(totalPage > 1){
        // 如果不是第一页
        if(my_pageNum > 1){
            li+="<li onclick=getOrderByPage("+1+")>" +
                "<a href=\"#\" aria-label=\"Previous\" >" +
                "<span aria-hidden=\"true\">首页</span>" +
                "</a>" +
                "</li>"+
                "<li onclick=getOrderByPage("+my_pageNum+'-'+1+")>" +
                "<a href=\"#\" aria-label=\"Previous\" >" +
                "<span aria-hidden=\"true\">上一页</span>" +
                "</a>" +
                "</li>";

        }
        if(totalPage<=10){//当页码不超过10的时候，全部显示
            for(var i=1;i<=totalPage;i++){
                li+="<li onclick=getOrderByPage("+i+")><a href='#' >"+i+"</a></li>";

            }
        }else{//当大于10页时，根据当前页做处理。
            if(my_pageNum < 5) {//如果当前页小于5， 则显示 前面五个页码+省略号+最后一页。总页数大于10且当前页远离总页数(小于5)
                for(var i = 1; i <=5; i++) {
                    li+="<li onclick='getOrderByPage("+i+")'><a href='#' >"+i+"</a></li>";
                }
                // li+="<li><a href='#' >..</a></li>"+
                //     "<li onclick='getOrderByPage("+totalPage+")'><a href='#' >"+totalPage+"</a></li>";
            }else if(my_pageNum >=totalPage-3){//如果当前页是接近最后几页的，输出 首页码+省略号+后面几页（包括当前页）。总页数大于10且当前页接近总页数(小于总页数-3)
                // pages.push('<a class="page-link" href="javascript:void(0);">' + 1 + '</a> …');
                // li+="<li onclick=getOrderByPage(1)><a href='#' >"+1+"</a></li>"+
                //     "<li><a href='#' >..</a></li>";
                for(var i=totalPage-4;i<=totalPage;i++){
                    li+="<li onclick=getOrderByPage("+i+")><a href='#' >"+i+"</a></li>";
                }
            }else{ //剩下的情况，输出首页+省略号+中间几页（包含当前页）+省略号+最后一页。除开上面两个情况
                // pages.push('<a class="page-link" href="javascript:void(0);">' + 1 + '</a> … ');
                // li+="<li onclick=getOrderByPage(1)><a href='#' >"+1+"</a></li>"+
                //     "<li><a href='#' >..</a></li>";
                for(var i=my_pageNum-2;i<=my_pageNum+2;i++){
                    li+="<li onclick=getOrderByPage("+i+")><a href='#' >"+i+"</a></li>";
                }
                // pages.push(' … <a class="page-link" href="javascript:void(0);">' + total + '</a>');
                // li+="<li><a href='#' >..</a></li>"+
                //     "<li onclick=getOrderByPage("+totalPage+")><a href='#' >"+totalPage+"</a></li>";
            }
        }
        // 如果不是最后一页
        if (my_pageNum < totalPage) {
            li+="<li onclick=getOrderByPage("+my_pageNum+'+'+1+")>" +
                "<a href=\"#\" aria-label=\"Next\" >" +
                "<span aria-hidden=\"true\">下一页</span>" +
                "</a>" +
                "</li>"+
                "<li onclick=getOrderByPage("+totalPage+")>" +
                "<a href=\"#\" aria-label=\"Next\" >" +
                "<span aria-hidden=\"true\">末页</span>" +
                "</a>" +
                "</li>";
        }
        ul.innerHTML=li;
    }else{
        ul.innerHTML = "";
    }
}

//格式化时间
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
/**
 * 根据状态获取订单
 * @type {null}
 */
var inputType = null;
function getOrderByStatus(type) {
    inputType = type;
    alert("status"+inputType);
    $.ajax({
        url:'/order/getOrderByStatus',
        type:'POST',
        data:{
            status:inputType
        },
        dataType:'JSON',
        async:false,
        success:function (orderVoList) {
            console.info(orderVoList);
            List = orderVoList;
        }
    });
    getOrderByPage(null);
}

/**
 * 更新订单
 * @param orderId
 * @param type 1：取消订单 2：删除订单
 */
function updateOrder(orderId,type) {
    var status = null;
    if (type == 1) {
        status = 3;
        var cancelTime = new Date();
    }
    if (type == 2) {
        status = 4;
    }
    alert(orderId);
    $.ajax({
        url: '/order/updateOrder',
        type: 'POST',
        data: {
            orderId: orderId,
            status: status,
            cancelTime: cancelTime
        },
        dataType: 'JSON',
        async: false,
        success: function (msg) {
            if (msg == 1) {
                getOrderByStatus(inputType);
                getOrderByPage(null);
            } else {
                layer.msg("发生错误请稍后重试");
            }
        }
    });
}

// 弹出地址选择
function showEdit(id) {
    alert(id)
    $.ajax({
        url:'/order/getOrderDetail',
        type:'POST',
        data:{
            orderId:id
        },
        dataType:'JSON',
        success:function (messageCheck) {
            console.info(messageCheck);
            var addressList = window.document.getElementById("addressList");
            var message = window.document.getElementById("message");
            var str = "";
            str += '<li class=\"user-addresslist defaultAddr\" style="width: 100%;height: 0px;">'+
                    '<span class=\"new-option-r\"><i class=\"am-icon-check-circle\"></i>收货地址</span>';
            str +='<p class=\"new-tit new-p-re\" style="padding: 0px;">' +
                '<span class="new-txt">'+messageCheck.address.consignee+'</span>';
            var phoneStr=messageCheck.address.phone;
            var phone = phoneStr.substr(0,3)+"****"+phoneStr.substr(7);
            str += "<span class=\"new-txt-rd2\">"+phone+"</span>"+
                "</p>" +
                "<div class=\"new-mu_l2a new-p-re\">" +
                "<p class=\"new-mu_l2cw\">" +
                "<span class=\"title\">地址："+messageCheck.address.addressName+"</span>" +
                "</p></div>" +
                "</li>";
            addressList.innerHTML = str;
            if(messageCheck.message != null){
                message.innerText = "下单留言:"+messageCheck.message;
            }
        }
    })
//					禁止遮罩层下面的内容滚动
    $(document.body).css("overflow","hidden");
    $('.theme-popover-mask').show();
    $('.theme-popover-mask').height($(window).height());
    $('.theme-popover').attr("style","display:block");
}

