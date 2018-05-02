$(document).ready(function () {

    initOrSearch();
    getOrderByPage(null);

})

var List = null;
// function getAllOrderByAdmin() {
//     $.ajax({
//         url:'/order/getAllOrderByAdmin',
//         type:'POST',
//         dataType:'JSON',
//         async:false,
//         success:function (orderVoList) {
//             console.info(orderVoList);
//             List = orderVoList;
//         }
//     })
// }

function initOrSearch() {
    var orderId = $("#orderId").val();
    var status = $("#status option:selected").val();
    $.ajax({
        url:'/order/getAllOrderByAdmin',
        type:'POST',
        dataType:'JSON',
        data:{
            orderId:orderId,
            status:status
        },
        async:false,
        success:function (orderVoList) {
            console.info(orderVoList);
            List = orderVoList;
            getOrderByPage(null);
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

    var orderList = window.document.getElementById("orderList");
    var str = "";
    if(List.length > 0){
        if(my_pageNum < totalPage){
            var limit = (my_pageNum-1)*pageSize+pageSize;
        }else {
            limit = List.length;
        }
        var total = 0;
        for(var i = (my_pageNum-1)*pageSize;i < limit;i++){
            str += '<tr>\n' +
                '    <td>\n';
            if(List[i].status == 2 || List[i].status == 3){
                str += '     <input type="checkbox" name="items" value="'+List[i].orderId+'"/></td>\n' ;
            }else{
                str += '</td>';
            }
            str +='     <td><a href="/order/orderDetail/'+List[i].orderId+'">'+List[i].orderId+'</a>\n' +
                '    </td>\n' +
                '    <td class="center">\n' +
                '     <span class="block">'+List[i].user.userName+'</span>\n' +
                '     <span class="block">'+new Date(List[i].createTime).Format("yyyy-MM-dd hh:mm")+'</span>\n' +
                '    </td>\n' +
                '    <td width="300">\n' +
                '     <span class="block">'+List[i].address.consignee+'['+List[i].address.phone+']</span>\n' +
                '     <address>'+List[i].address.addressName+'</address>\n' +
                '    </td>\n' +
                '    <td class="center">\n' +
                '     <span><i>￥</i><b>'+List[i].sum.toFixed(2)+'</b></span>\n' +
                '    </td>\n' +
                '    <td class="center">\n';
            if(List[i].status == 0){
                str += '     <span>未发货</span>\n';
            }else if(List[i].status == 1){
                str += '     <span>已发货</span>\n' ;
            }else if(List[i].status == 2){
                str += '     <span>订单已完成</span>\n' ;
            }else if(List[i].status = 3){
                str += '     <span>订单已取消</span>\n' ;
            }
             str += '    </td>\n' +
                '    <td class="center">\n' +
                '     <a href="/order/orderDetail/'+List[i].orderId+'" class="inline-block" title="查看订单"><button class="btn btn-info" style="text-decoration: none">订单详情</button></a>\n';
            if(List[i].status == 2 || List[i].status == 3){
                str += '     <button type="button" class="btn btn-danger" onclick="deleteOrder('+List[i].orderId+')">删除订单</button>\n';

            }else if(List[i].status == 0){
                str += '<button type="button" class="btn btn-primary" onclick="updateOrderStatus('+List[i].orderId+','+1+')">确认发货</button>';
            }else if(List[i].status == 1){
                str += '<button type="button" class="btn btn-primary" onclick="updateOrderStatus('+List[i].orderId+','+2+')">完成订单</button>';
            }
            str +=
                '    </td>\n' +
                '   </tr>';
        }
        orderList.innerHTML = str;
    }else{
        str += '<tr>\n' +
            '    <td colspan="7" style="background-color:#e9e9e9;width: 100%;height: 100px;text-align: center;line-height: 100px;font-size: 24px;color: #9C9C9C">\n' +
            '没有任何订单'+
            '    </td>\n' +
            '   </tr>';
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
 *  全选与取消全选
 */

function selectAll() {
    var checkboxTag = document.getElementsByName("items");
    var selectAll = document.getElementById("del");
    if(selectAll.checked){
        for(i in checkboxTag){
            checkboxTag[i].checked = true;
        }
    }else{
        for(i in checkboxTag){
            checkboxTag[i].checked = false;
        }
    }
}

function deleteOrder(inputId) {
    //获取所有的复选框列表
    var checkboxTag = document.getElementsByName("items");
    var orderId = "";
    var flag = 0;
    if(inputId == null){
        for (var i = 0; i < checkboxTag.length; i++) {
            if (checkboxTag[i].checked) {
                // check_val.push(checkbox[i].value);
                orderId += checkboxTag[i].value + ',';
                flag++;
            }
        }
        var idLastIndex = orderId.lastIndexOf(",");
        orderId = orderId.substring(0, idLastIndex);
    }else {
        orderId = inputId;
        flag++;
    }
    if (flag > 0) {
        $.ajax({
            url:'/order/deleteOrder',
            data:{
                orderId:orderId
            },
            type:'POST',
            dataType:'JSON',
            success:function (msg) {
                if(msg == 1){
                    layer.msg("删除成功");
                    initOrSearch();
                    getOrderByPage(null);
                }else{
                    alert("发生错误请稍后刷新重试");
                }
            }
        })
    } else {
        alert("没有选择任何订单");
    }
}

/**
 * 修改订单状态
 * @param orderId
 * @param status
 */
function updateOrderStatus(orderId,status) {
    $.ajax({
        url:'/order/adminUpdateOrder',
        data:{
            orderId:orderId,
            status:status
        },
        type:'POST',
        dataType:'JSON',
        success:function (msg) {
            if(msg == 1){
                layer.msg("操作成功");
                initOrSearch();
                getOrderByPage(null);
            }else if(msg == 2){
                layer.msg("现在没有权限确认收货");
            }else{
                layer.msg("发生错误请稍后刷新重试")
            }
        }
    })
}

