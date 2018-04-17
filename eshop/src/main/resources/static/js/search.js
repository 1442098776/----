<!--截取商品名的14位-->
var good_name = window.document.getElementsByClassName('title');
function getGood(){

    for(var i = 0;i<good_name.length;i++){
        var name = good_name[i].innerText.substring(0,14);
        // console.info(name);
        good_name[i].innerText = name;
    }
}

/**
 * 保存ajax返回的array
 * @type {null}
 */
var List = null;
/**
 * 判断排序的
 * @type {boolean}
 */
var flag = true;
/**
 * 什么排序 0:综合 1:销量 2:价格
 * @type {null}
 */
var type = null;
$(function () {
    getGood();
    initGood();
    goodContent(flag,1);
})
function initGood() {
    var typeId = window.document.getElementById("typeId").value;
    $.ajax({
        url: '/initGoodList',
        type: 'POST',
        data:{
            typeId:typeId
        },
        dataType: 'JSON',
        async: false,
        success: function (goodList) {
            List = goodList;
        }
    })
}
/**
 * 综合排序
 * @type {boolean}
 */
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
            List = data;
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
                            str += '<img style="width: 278px;height: 278px;" src="../img/'+data[i].id+'/'+goodPic[j].picName+' />';
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
                                '</div>';
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
                for(var i = data.length-1;i >= 0;i--){
                    str +='<li><a href=/introduction/'+List[i].id+'>' +
                        '<div class="i-pic limit">';
                    var goodPic2 = data[i].goodPics;
                    for(var j = 0;j < goodPic2.length;j++){
                        if(!goodPic2[j].grade){
                            str += '<img style="width: 278px;height: 278px;" src="../img/'+data[i].id+'/'+goodPic2[j].picName+' />';
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
                            '</div>';
                    }

                    str +='</p>'+
                        '<p class="number fl">' +
                        '销量<span>'+data[i].saleNum+'</span>' +
                        '</p>' +
                        '</div></a>' +
                        '</li>'
                }
                center.innerHTML = str;
                flag = true;
            }
        }
    })
}


function goodContent(flag,pageNow) {
    var my_pageNum = 1;
    if(pageNow != null){
        my_pageNum = pageNow;
    }
    //获取分页器ul
    var ul=window.document.getElementById("ul");
    var pageSize = 20;
    var totalPage = Math.ceil(List.length/pageSize);
    var center = window.document.getElementById("center");
    var str = "";
    if(flag){
        if(List.length > 0){
            if(my_pageNum < totalPage){
                var limit = ((my_pageNum-1)*pageSize+pageSize)
            }else {
                limit = List.length;
            }
            for(var i = (my_pageNum-1)*pageSize;i < limit;i++){
                str += '<li >' +
                    '<a href=/introduction/'+List[i].id+'>' +
                    '<div class="i-pic limit">';
                var goodPics = List[i].goodPics;
                for(var j = 0;j<goodPics.length;j++){
                    if(!goodPics[j].grade){
                        str += '<img style="width: 278px;height: 278px;" src="../img/'+List[i].id+'/'+goodPics[j].picName+'"/>';
                    }

                }
                var name = List[i].name.substring(0,14);
                str +='<p class="title fl">'+name+'</p>' +
                    '<p class="price fl">';
                if(List[i].salePrice != null){
                    str += '<div style="padding: 5px">' +
                        '<span class="price fl" >￥'+List[i].salePrice+'</span>' +
                        '<s><span class="good_price">￥'+List[i].price+'</span></s>' +
                        '</div>';
                }else {
                    str += '<div style="padding: 5px">' +
                        '<span class="price fl">￥'+List[i].price+'</span>' +
                        '</div>';
                }
                str += '</p>' +
                    '<p class="number fl">' +
                    '销量<span>'+List[i].saleNum+'</span>' +
                    '</p>' +
                    '</div>' +
                    '</a>' +
                    '</li>'
            }
            str += '<div class="clear"></div>';
            center.innerHTML = str;
        }else{
            str += '<div style="background-color:#e9e9e9;width: 100%;height: 100px;text-align: center;line-height: 100px;font-size: 24px;color: #9C9C9C">没有该商品</div>' +
                '<div class="clear"></div>';
            center.innerHTML = str;
        }
    }else{
        if(List.length > 0){
            if(my_pageNum < totalPage){
                var limit = List.length -((my_pageNum-1)*pageSize);
            }else {
                limit = 0;
            }
            for(var i = List.length-1-(my_pageNum-1)*pageSize;i > limit;i--){
                str += '<li >' +
                    '<a href=/introduction/'+List[i].id+'>' +
                    '<div class="i-pic limit">';
                var goodPics = List[i].goodPics;
                for(var j = 0;j<goodPics.length;j++){
                    if(!goodPics[j].grade){
                        str += '<img style="width: 278px;height: 278px;" src="../img/'+List[i].id+'/'+goodPics[j].picName+'"/>';
                    }

                }
                var name = List[i].name.substring(0,14);
                str +='<p class="title fl">'+name+'</p>' +
                    '<p class="price fl">';
                if(List[i].salePrice != null){
                    str += '<div style="padding: 5px">' +
                        '<span class="price fl" >￥'+List[i].salePrice+'</span>' +
                        '<s><span class="good_price">￥'+List[i].price+'</span></s>' +
                        '</div>';
                }else {
                    str += '<div style="padding: 5px">' +
                        '<span class="price fl">￥'+List[i].price+'</span>' +
                        '</div>';
                }
                str += '</p>' +
                    '<p class="number fl">' +
                    '销量<span>'+List[i].saleNum+'</span>' +
                    '</p>' +
                    '</div>' +
                    '</a>' +
                    '</li>'
            }
            str += '<div class="clear"></div>';
            center.innerHTML = str;
        }else{
            str += '<div style="background-color:#e9e9e9;width: 100%;height: 100px;text-align: center;line-height: 100px;font-size: 24px;color: #9C9C9C">没有该商品</div>' +
                '<div class="clear"></div>';
            center.innerHTML = str;
        }
    }

    var li = "";
    // 如果不是第一页
    if(my_pageNum > 1){
        li+="<li onclick=goodContent("+flag+","+1+")>" +
            "<a href=\"#\" aria-label=\"Previous\" >" +
            "<span aria-hidden=\"true\">首页</span>" +
            "</a>" +
            "</li>"+
            "<li onclick=goodContent("+flag+","+my_pageNum+"-"+1+")>" +
            "<a href=\"#\" aria-label=\"Previous\" >" +
            "<span aria-hidden=\"true\">上一页</span>" +
            "</a>" +
            "</li>";

    }
    if(totalPage<=10){//当页码不超过10的时候，全部显示
        for(var i=1;i<=totalPage;i++){
            li+="<li onclick=goodContent("+flag+","+i+")><a href="+"#"+" >"+i+"</a></li>";

        }
    }else{//当大于10页时，根据当前页做处理。
        if(my_pageNum < 5) {//如果当前页小于5， 则显示 前面五个页码+省略号+最后一页。总页数大于10且当前页远离总页数(小于5)
            for(var i = 1; i <=5; i++) {
                li+="<li onclick='goodContent("+flag+","+i+")'><a href='#' >"+i+"</a></li>";
            }
            // li+="<li><a href='#' >..</a></li>"+
            //     "<li onclick='goodContent("+flag,List,totalPage+")'><a href='#' >"+totalPage+"</a></li>";
        }else if(my_pageNum >=totalPage-3){//如果当前页是接近最后几页的，输出 首页码+省略号+后面几页（包括当前页）。总页数大于10且当前页接近总页数(小于总页数-3)
            // pages.push('<a class="page-link" href="javascript:void(0);">' + 1 + '</a> …');
            // li+="<li onclick=goodContent(1)><a href='#' >"+1+"</a></li>"+
            //     "<li><a href='#' >..</a></li>";
            for(var i=totalPage-4;i<=totalPage;i++){
                li+="<li onclick=goodContent("+flag+","+i+")><a href='#' >"+i+"</a></li>";
            }
        }else{ //剩下的情况，输出首页+省略号+中间几页（包含当前页）+省略号+最后一页。除开上面两个情况
            // pages.push('<a class="page-link" href="javascript:void(0);">' + 1 + '</a> … ');
            // li+="<li onclick=goodContent(1)><a href='#' >"+1+"</a></li>"+
            //     "<li><a href='#' >..</a></li>";
            for(var i=my_pageNum-2;i<=my_pageNum+2;i++){
                li+="<li onclick=goodContent("+flag+","+i+")><a href='#' >"+i+"</a></li>";
            }
            // pages.push(' … <a class="page-link" href="javascript:void(0);">' + total + '</a>');
            // li+="<li><a href='#' >..</a></li>"+
            //     "<li onclick=goodContent("+flag,List,totalPage+")><a href='#' >"+totalPage+"</a></li>";
        }
    }

    // 如果不是最后一页
    if (my_pageNum < totalPage) {
        li+="<li onclick=goodContent("+flag+","+my_pageNum+'+'+1+")>" +
            "<a href=\"#\" aria-label=\"Next\" >" +
            "<span aria-hidden=\"true\">下一页</span>" +
            "</a>" +
            "</li>"+
            "<li onclick=goodContent("+flag,totalPage+")>" +
            "<a href=\"#\" aria-label=\"Next\" >" +
            "<span aria-hidden=\"true\">末页</span>" +
            "</a>" +
            "</li>";
    }
    ul.innerHTML=li;
}