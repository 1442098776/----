$(document).ready(function () {
    var time = window.document.getElementsByClassName("time");
    for( var i =0 ;i < time.length ;i ++){
        time[i].innerText = new Date(time[i].innerText).Format("yyyy-MM-dd hh:mm");
    }
})
/**
 * 修改订单状态
 * @param orderId
 * @param status
 */
function updateOrderStatus(status) {
    var orderId = $("#orderId").val();
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
                window.location.reload();
            }else if(msg == 2){
                layer.msg("现在没有权限确认收货");
            }else{
                layer.msg("发生错误请稍后刷新重试")
            }
        }
    })
}

function toPrint() {
    window.print();
}