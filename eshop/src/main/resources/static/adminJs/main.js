$(document).ready(function () {
    $.ajax({
        url:'/admin/count',
        type:'POST',
        dataType:'JSON',
        success:function (count) {
            console.info(count);
            $("#orderNum").innerText = count.orderNum;
            $("#orderNewNum").innerText = count.orderNewNum;
            $("#orderSendNum").innerText = count.orderSendNum;
            $("#orderFinishNum").innerText = count.orderFinishNum;
            $("#orderCancelNum").innerText = count.orderCancelNum;
            $("#goodNum").innerText = count.goodNum;
            $("#goodTypeNum").innerText = count.goodTypeNum;
            $("#userNum").innerText = count.userNum;
            $("#enableUser").innerText = count.enableUser;
            $("#disableUser").innerText = count.disableUser;
            $("#commonUser").innerText = count.commonUser;
            $("#systemManager").innerText = count.systemManager;
        }
    })
})