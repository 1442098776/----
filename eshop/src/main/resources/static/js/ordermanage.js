var List = null;
$(document).ready(function () {
    initOrderManage();
    getOrderByPage(null);
});

function initOrderManage() {
    $.ajax({
        url:'/order/getAllOrderBuUserId',
        type:'POST',
        dataType:'JSON',
        async:false,
        success:function (orderVoList) {
            console.info(orderVoList);
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
            str += '<div class="order-status">' +
                '<div class="order-title">' +
                '<div class="dd-num">订单编号：<a>'+List[i].orderId+'</a></div>';
                if(List[i].state == 0){
                    str += '<span>下单时间：'+new Date(List[i].createTime).Format('yyyy-MM-dd hh:mm')+'</span>';
                }else if(List[i].state == 1){
                    str += '<span>下单时间：'+new Date(List[i].createTime).Format('yyyy-MM-dd hh:mm')+'</span>'+
                        '<span>发货时间：'+new Date(List[i].sendTime).Format('yyyy-MM-dd hh:mm')+'</span>';
                }else if(List[i].state == 2){
                    str += '<span>下单时间：'+new Date(List[i].createTime).Format('yyyy-MM-dd hh:mm')+'</span>'+
                        '<span>发货时间：'+new Date(List[i].sendTime).Format('yyyy-MM-dd hh:mm')+'</span>'+
                        '<span>完成时间：'+new Date(List[i].receiveTime).Format('yyyy-MM-dd hh:mm')+'</span>';
                }else{
                    str += '<span>下单时间：'+new Date(List[i].createTime).Format('yyyy-MM-dd hh:mm')+'</span>'+
                        '<span>取消时间：'+new Date(List[i].cancelTime).Format('yyyy-MM-dd hh:mm')+'</span>';
                }
                str += '</div>' +
                '<div class="order-content">' +
                '<div class="order-left">';
            var orderDetail = List[i].orderDetailVoList;
            for(var j = 0;j<orderDetail.length;j++){
                var good = orderDetail[j].good;
                str += '<ul class="item-list">' +
                        '<li class="td td-item">' +
                            '<div class="item-pic">' +
                                '<a href="#" class="J_MakePoint">';
                                for(var k = 0;k<good.goodPics.length;k++){
                                    if(!good.goodPics[k].grade) {
                                        str += '<img src="../img/'+good.id+'/'+good.goodPics[k].picName+'" class="itempic J_ItemImg">'
                                    }
                                }
                                str += '</a>' +
                            '</div>' +
                            '<div class="item-info">' +
                                '<div class="item-basic-info">' +
                                    '<a href="#">'+
                                        '<p>'+good.name+'</p>' +
                                    '</a>' +
                                '</div>' +
                        '</li>' +
                        '<li class="td td-price">' +
                            '<div class="item-price">' +
                            '+orderDetail[j].goodPrice+'+
                            '</div>' +
                        '</li>' +
                        '<li class="td td-number">' +
                            '<div class="item-number">' +
                                '<span>'+orderDetail[j].goodCount+'</span>' +
                            '</div>' +
                        '</li>'+
                    '</ul>' +
                    '</div>';
                    total += orderDetail[j].goodPrice * orderDetail[j].goodCount;
            }
            str += '<div class="order-right">' +
                    '<li class="td td-amount">' +
                        '<div class="item-amount">' +
                        '合计：'+total.toFixed(2)+
                        '</div>' +
                    '</li>' +
                '<div class="move-right">' +
                    '<li class="td td-status">' +
                        '<div class="item-status">' ;
                    if(orderList.state == 0){
                        str += '<p class="Mystatus">取消订单</p>';
                    }else if(orderList.state == 1){
                        str += '<p class="Mystatus">商品已发货</p>';
                    }else {
                        str += '<p class="Mystatus">交易完成</p>';
                    }
                    str += '</div>' +
                    '</li>' +
                    '<li class="td td-change">';
                        if(orderList.state != 1){
                            str += '<div class="am-btn am-btn-danger anniu">删除订单</div>';
                        }
                        str += '<p class="order-info"><a href="orderinfo.html">订单详情</a></p>'+
                    '</li>' +
                '</div>' +
                '</div>' +
            '</div>';
                
        }
        orderList.innerHTML = str;
    }else{
        str += '<div style="background-color:#e9e9e9;width: 100%;height: 100px;text-align: center;line-height: 100px;font-size: 24px;color: #9C9C9C">您没有任何订单</div>' +
            '<div class="clear"></div>';
        orderList.innerHTML = str;
    }
    var li = "";
    // 如果不是第一页
    if(my_pageNum > 1){
        li+="<li onclick=getCartByPage("+1+")>" +
            "<a href=\"#\" aria-label=\"Previous\" >" +
            "<span aria-hidden=\"true\">首页</span>" +
            "</a>" +
            "</li>"+
            "<li onclick=getCartByPage("+my_pageNum+'-'+1+")>" +
            "<a href=\"#\" aria-label=\"Previous\" >" +
            "<span aria-hidden=\"true\">上一页</span>" +
            "</a>" +
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
            "<span aria-hidden=\"true\">下一页</span>" +
            "</a>" +
            "</li>"+
            "<li onclick=getCartByPage("+totalPage+")>" +
            "<a href=\"#\" aria-label=\"Next\" >" +
            "<span aria-hidden=\"true\">末页</span>" +
            "</a>" +
            "</li>";
    }
    ul.innerHTML=li;
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