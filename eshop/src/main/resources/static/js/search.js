<!--截取商品名的14位-->
var good_name = window.document.getElementsByClassName('title');
function getGood(){

    for(var i = 0;i<good_name.length;i++){
        var name = good_name[i].innerText.substring(0,14);
        // console.info(name);
        good_name[i].innerText = name;
    }
}
$(function () {
    getGood();
})
/**
 * 综合排序
 * @type {boolean}
 */
var flag = true;
var type = null;
function sort(inputType) {
    if(type != inputType){
        flag = true;
        alert(inputType);
    }
    alert(flag);
    type =inputType;
    var typeId = window.document.getElementById("typeId").value;
    $.ajax({
        url:'/sort',
        data:{
            type:type,
            typeId:typeId
        },
        type:'POST',
        success:function (data) {
            console.info(data);
            var center = window.document.getElementById("center");
            var str = "";
            if(flag){
                for(var i = 0;i<data.length;i++){
                    str +='<li>' +
                        '<div class="i-pic limit">';
                    var goodPic = data[i].goodPics;
                    for(var j = 0;j < goodPic.length;j++){
                        if(!goodPic[j].grade){
                            str += '<img src="../img/'+data[i].id+'/'+goodPic[j].picName+' />';
                        }
                    }
                    var name = data[i].name.substring(0,14);
                        str +='<p class="title fl">'+name+'</p>' +
                        '<p class="price fl">';
                        if(data[i].salePrice != null){
                            str += '<div style="padding: 5px">' +
                                '<span class="price fl" >￥'+data[i].salePrice+'</span>' +
                                '<s><span class="good_price" >￥'+data[i].price+'</span></s>' +
                                '</div>';
                        }else{
                            str += '<div style="padding: 5px">' +
                                '<span class="price fl">￥'+data[i].price+'</span>' +
                                '</div>\n';
                        }

                        str +='</p>'+
                        '<p class="number fl">' +
                        '销量<span>'+data[i].saleNum+'</span>' +
                        '</p>' +
                        '</div>' +
                        '</li>'
                }
                center.innerHTML = str;
                flag = false;
            }else {
                for(var i = data.length;i >= 0;i--){
                    str +='<li>' +
                        '<div class="i-pic limit">';
                    var goodPic2 = data[i].goodPics;
                    for(var j = 0;j < goodPic2.length;j++){
                        if(!goodPic2[j].grade){
                            str += '<img src="../img/'+data[i].id+'/'+goodPic2[j].picName+' />';
                        }
                    }
                    var name = data[i].name.substring(0,14);
                    str +='<p class="title fl">'+name+'</p>' +
                        '<p class="price fl">';
                    if(data[i].salePrice != null){
                        str += '<div style="padding: 5px">' +
                            '<span class="price fl" >￥'+data[i].salePrice+'</span>' +
                            '<s><span class="good_price" >￥'+data[i].price+'</span></s>' +
                            '</div>';
                    }else{
                        str += '<div style="padding: 5px">' +
                            '<span class="price fl">￥'+data[i].price+'</span>' +
                            '</div>\n';
                    }

                    str +='</p>'+
                        '<p class="number fl">' +
                        '销量<span>'+data[i].saleNum+'</span>' +
                        '</p>' +
                        '</div>' +
                        '</li>'
                }
                center.innerHTML = str;
                flag = true;
            }
        }
    })
}