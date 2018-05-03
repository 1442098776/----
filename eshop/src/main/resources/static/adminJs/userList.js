$(document).ready(function () {
    initOrSearchUser(null);
})


function initOrSearchUser(input) {
    if(input != null){
        var  searchKey= $("#searchKey").val();
        var role = $("#userType option:selected").val();
    }
    $.ajax({
        url:'/admin/getAllUser',
        type:'POST',
        dataType:'JSON',
        data:{
            searchKey:searchKey,
            role:role
        },
        async:false,
        success:function (userList) {
            console.info(userList);
            List = userList;
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

    var userList = window.document.getElementById("userList");
    var str = "";
    if(List.length > 0){
        if(my_pageNum < totalPage){
            var limit = (my_pageNum-1)*pageSize+pageSize;
        }else {
            limit = List.length;
        }
        for(var i = (my_pageNum-1)*pageSize;i < limit;i++){
            str += '<tr>\n' +
                '    <td class="center">\n';

            if(List[i].role != 1){
                str += '     <input type="checkbox" name="items" value="'+List[i].userId+'"/></td>\n';
            }else {
                str += '</td>'
            }
            str += '<td class="center"><span>'+List[i].userId+'</span>\n' +
                '    </td>\n' +
                '    <td class="center">'+List[i].userName+'</td>\n';
            if(List[i].email != null){
                str += '    <td class="center">'+List[i].email+'</td>\n';
            }else{
                str += '    <td class="center"> </td>\n';
            }
            str +='    <td class="center">'+List[i].phone+'</td>\n' +
                '    <td class="center">'+new Date(List[i].regTime).Format("yyyy-MM-dd hh:mm")+'</td>\n';
            if(List[i].role == 1){
                str += '    <td class="center">普通用户</td>\n';
            }else{
                str += '    <td class="center">系统管理员</td>\n';
            }
            str += 
                '    <td >\n';
            if(List[i].status == 1){
                str += '<button type="button" class="btn btn-warning" onclick="updateUser('+List[i].userId+','+0+')">禁用</button>';
            }else{
                str += '<button type="button" class="btn btn-primary" onclick="updateUser('+List[i].userId+','+1+')">启用</button>';
            }

               if(List[i].role == 1){
                   str += '     <button type="button" class="btn btn-primary" onclick="updateUser('+List[i].userId+','+2+')">设为管理员</button>\n';
               }else {
                   str += '     <button type="button" class="btn btn-primary" onclick="updateUser('+List[i].userId+','+1+')">设为普通用户</button>\n' +
                       '<a href="/admin/userDetail/'+List[i].userId+'" class="inline-block" title="编辑"><button class="btn btn-default" type="button">编辑</button></a>\n'+
                       '     <button type="button" class="btn btn-danger" onclick="deleteUser('+List[i].userId+')">删除</button>\n' ;
               }
                str += '    </td>\n' +
                '   </tr>';
        }
        userList.innerHTML = str;
    }else{
        str += '<tr>\n' +
            '    <td colspan="7" style="background-color:#e9e9e9;width: 100%;height: 100px;text-align: center;line-height: 100px;font-size: 24px;color: #9C9C9C">\n' +
            '没有任何用户'+
            '    </td>\n' +
            '   </tr>';
        userList.innerHTML = str;
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


function deleteUser(inputId) {
    //获取所有的复选框列表
    var checkboxTag = document.getElementsByName("items");
    var Id = "";
    var flag = 0;
    if(inputId == null){
        for (var i = 0; i < checkboxTag.length; i++) {
            if (checkboxTag[i].checked) {
                // check_val.push(checkbox[i].value);
                Id += checkboxTag[i].value + ',';
                flag++;
            }
        }
        var idLastIndex = Id.lastIndexOf(",");
        Id = Id.substring(0, idLastIndex);
    }else {
        Id = inputId;
        flag++;
    }
    if (flag > 0) {
        $.ajax({
            url:'/admin/deleteUser',
            data:{
                id:Id
            },
            type:'POST',
            dataType:'JSON',
            success:function (msg) {
                if(msg == 1){
                    layer.msg("删除成功");
                    initOrSearchUser(null);
                    getByPage(null);
                }else{
                    alert("发生错误请稍后刷新重试");
                }
            }
        })
    } else {
        alert("没有选择任何用户");
    }
}

/**
 * 修改用户状态
 * @param userId
 * @param type
 */
function updateUser(userId,type) {
    if(type == 1 || type == 0){
        var status = type
    }else{
        var role = type;
    }
    $.ajax({
        url:'/admin/updateUser',
        data:{
            userId:userId,
            status:status,
            role:role
        },
        type:'POST',
        dataType:'JSON',
        success:function (msg) {
            if(msg == 1){
                layer.msg("操作成功");
                initOrSearchUser(this);
                getByPage(null);
            }else{
                layer.msg("发生错误请稍后刷新重试")
            }
        }
    })
}
