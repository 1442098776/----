$(document).ready(function () {
    test();
})
function test() {
    alert("666");
    $.ajax({
        url:'/createOrder',
        type:'POST',
        dataType:'JSON',
        success:function (data) {
            if(data == 0){
                location.href = "/";
            }
        }
    })
}