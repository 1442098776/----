/**
 * 修改订单状态
 * @param orderId
 * @param status
 */
function updateOrderStatus(input,status) {
    var orderId = $(input).attr('value');
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