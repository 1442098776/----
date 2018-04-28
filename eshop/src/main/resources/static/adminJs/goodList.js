$(document).ready(function () {
    initOrSearchGood();
    // getByPage(null);
    console.info(List);
})

var List = null;
var searchKey = null;
function initOrSearchGood(input) {
    if(input != null){
        searchKey = $("#searchKey").val();
    }
    $.ajax({
        url:'/admin/manageGood',
        type:'POST',
        data:{
            searchKey:searchKey
        },
        dataType:'JSON',
        async:false,
        success:function (goodList) {
            // console.info(goodList);
            List = goodList;
            getByPage(null);
        }
    })
}
function getByPage(pageNow) {
    var my_pageNum = 1;
    if(pageNow != null){
        my_pageNum = pageNow;
    }
    //获取分页器ul
    var ul=window.document.getElementById("ul");
    var pageSize = 10;
    //计算总页数
    var totalPage = Math.ceil(List.length/pageSize);

    var goodList = window.document.getElementById("goodList");
    var str = "";
    if(List.length > 0){
        if(my_pageNum < totalPage){
            var limit = (my_pageNum-1)*pageSize+pageSize;
        }else {
            limit = List.length;
        }
        for(var i = (my_pageNum-1)*pageSize;i < limit;i++){
            str += '<tr>\n' +
                '    <td>\n' +
                '     <span>\n' +
                '     <input type="checkbox" name="items" class="middle children-checkbox"/>\n' +
                '     <i>'+List[i].id+'</i>\n' +
                '     </span>\n' +
                '    </td>\n'+
                '    <td class="center pic-area">' ;
                var goodPic = List[i].goodPics;
                for(var j = 0;j<goodPic.length;j++){
                    if(goodPic[j].grade == 0){
                        str += '<img src="../img/'+List[i].id+'/'+goodPic[j].picName+'" class="thumbnail"/>';
                    }
                }
                str +=  '</td>\n' +
                '    <td class="td-name">\n' +
                '      <span class="ellipsis td-name block">'+List[i].name+'</span>\n' +
                '    </td>\n' +
                '    <td class="center">\n' +
                '     <span>\n' +
                '      <i>￥</i>\n' +
                '      <em>'+List[i].price.toFixed(2)+'</em>\n' +
                '     </span>\n' +
                '    </td>\n' +
                '    <td class="center">\n' +
                '     <span>\n' +
                '      <i>￥</i>\n' +
                '      <em>'+List[i].salePrice.toFixed(2)+'</em>\n' +
                '     </span>\n' +
                '    </td>\n' +
                '    <td class="center">\n' +
                '     <span>\n' +
                '      <em>'+List[i].saleNum+'</em>\n' +
                '      <i>件</i>\n' +
                '     </span>\n' +
                '    </td>\n' +
                '    <td class="center">\n' +
                '     <span>\n' +
                '      <em>'+List[i].stock+'</em>\n' +
                '      <i>件</i>\n' +
                '     </span>\n' +
                '    </td>\n' +
                '    <td class="center">\n';
            if(List[i].status == 1){
                str +=  '<button type="button" onclick="upOrDownGood('+List[i].id+',0)">下架商品</button>';
            }else {
                str += '<button type="button" onclick="upOrDownGood('+List[i].id+',1)">上架商品</button>';
            }
                str += '    </td>\n' +
                '    <td class="center">\n' +
                '     <a href="/introduction/'+List[i].id+'" title="查看" target="_blank"><button>查看商品</button></a>\n' +
                '     <a href="/admin/editGood/'+List[i].id+'" title="编辑"><button>编辑商品</button></a>\n' +
                '    </td>\n' +
                '   </tr>';
        }
        goodList.innerHTML = str;
    }else{
        str += '<tr>\n' +
            '    <td colspan="9" style="background-color:#e9e9e9;width: 100%;height: 100px;text-align: center;line-height: 100px;font-size: 24px;color: #9C9C9C">\n' +
            '没有任何商品'+
            '    </td>\n' +
            '   </tr>';
        goodList.innerHTML = str;
    }
    var li = "";
    if(totalPage > 1){
        // 如果不是第一页
        if(my_pageNum > 1){
            li+="<li onclick=getByPage("+1+")>" +
                "<a href=\"#\" aria-label=\"nextious\" >" +
                "<span aria-hidden=\"true\">首页</span>" +
                "</a>" +
                "</li>"+
                "<li onclick=getByPage("+my_pageNum+'-'+1+")>" +
                "<a href=\"#\" aria-label=\"nextious\" >" +
                "<span aria-hidden=\"true\">上一页</span>" +
                "</a>" +
                "</li>";

        }
        if(totalPage<=10){//当页码不超过10的时候，全部显示
            for(var i=1;i<=totalPage;i++){
                li+="<li onclick=getByPage("+i+")><a href='#' >"+i+"</a></li>";

            }
        }else{//当大于10页时，根据当前页做处理。
            if(my_pageNum < 5) {//如果当前页小于5， 则显示 前面五个页码+省略号+最后一页。总页数大于10且当前页远离总页数(小于5)
                for(var i = 1; i <=5; i++) {
                    li+="<li onclick='getByPage("+i+")'><a href='#' >"+i+"</a></li>";
                }
                // li+="<li><a href='#' >..</a></li>"+
                //     "<li onclick='getByPage("+totalPage+")'><a href='#' >"+totalPage+"</a></li>";
            }else if(my_pageNum >=totalPage-3){//如果当前页是接近最后几页的，输出 首页码+省略号+后面几页（包括当前页）。总页数大于10且当前页接近总页数(小于总页数-3)
                // pages.push('<a class="page-link" href="javascript:void(0);">' + 1 + '</a> …');
                // li+="<li onclick=getByPage(1)><a href='#' >"+1+"</a></li>"+
                //     "<li><a href='#' >..</a></li>";
                for(var i=totalPage-4;i<=totalPage;i++){
                    li+="<li onclick=getByPage("+i+")><a href='#' >"+i+"</a></li>";
                }
            }else{ //剩下的情况，输出首页+省略号+中间几页（包含当前页）+省略号+最后一页。除开上面两个情况
                // pages.push('<a class="page-link" href="javascript:void(0);">' + 1 + '</a> … ');
                // li+="<li onclick=getByPage(1)><a href='#' >"+1+"</a></li>"+
                //     "<li><a href='#' >..</a></li>";
                for(var i=my_pageNum-2;i<=my_pageNum+2;i++){
                    li+="<li onclick=getByPage("+i+")><a href='#' >"+i+"</a></li>";
                }
                // pages.push(' … <a class="page-link" href="javascript:void(0);">' + total + '</a>');
                // li+="<li><a href='#' >..</a></li>"+
                //     "<li onclick=getByPage("+totalPage+")><a href='#' >"+totalPage+"</a></li>";
            }
        }
        // 如果不是最后一页
        if (my_pageNum < totalPage) {
            li+="<li onclick=getByPage("+my_pageNum+'+'+1+")>" +
                "<a href=\"#\" aria-label=\"Next\" >" +
                "<span aria-hidden=\"true\">下一页</span>" +
                "</a>" +
                "</li>"+
                "<li onclick=getByPage("+totalPage+")>" +
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

function upOrDownGood(goodId,status) {
    $.ajax({
        url:'/admin/updateGood',
        type:'POST',
        data:{
            id:goodId,
            status:status
        },
        dataType:'JSON',
        async:false,
        success:function (msg) {
            // console.info(goodList);
            // List = goodList;
            if(msg == 1){
                layer.msg("操作成功");
                initOrSearchGood(searchKey);
            }else{
                layer.msg("操作失败")
            }
        }
    })
}