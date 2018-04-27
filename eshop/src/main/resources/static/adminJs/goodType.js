var flag = true;
$(function(){
    initGoodType();
})

function initGoodType() {
    var typeList = window.document.getElementById("typeList");
    $.ajax({
        url:'/admin/getGoodType',
        type:'POST',
        dataType:'JSON',
        success:function (goodTypeList) {
            var str = "";
            for(var i = 0;i < goodTypeList.length;i++){
                str += '<tr class="parent">\n' +
                    '    <td class="center"><img onclick="toggle('+goodTypeList[i].id+')" name="1" id="'+goodTypeList[i].id+'" width="20px" height="20px" src="../adminImages/add1.png"></td>\n' +
                    '    <td>\n' +
                    // '     <input type="checkbox" name="items" value='+goodTypeList[i].id+'"/>\n' +
                    '     <span>'+goodTypeList[i].name+'</span>\n' +
                    '    </td>'+
                    '    <td class="center">'+new Date(goodTypeList[i].createTime).Format("yyyy-MM-dd hh:mm")+'</td>\n' +
                    '    <td class="center"></td>';
                for( var j = 0;j<goodTypeList[i].goodTypes.length;j++){
                    str += '<tr class="child'+goodTypeList[i].id+'" hidden>\n' +
                        '    <td  class="center"></td>\n' +
                        '    <td>\n' +
                        '     <input type="checkbox" name="items" value="'+goodTypeList[i].goodTypes[j].id+'"/>\n' +
                        '     <span>'+goodTypeList[i].goodTypes[j].name+'</span>\n' +
                        '    </td>\n' +
                        '    <td class="center">'+new Date(goodTypeList[i].goodTypes[j].createTime).Format("yyyy-MM-dd hh:mm")+'</td>\n' +
                        '    <td class="center"><button onclick="showModel('+goodTypeList[i].id+')" type="button">删除</button></td>\n' +
                        '   </tr>'
                }
            }
            typeList.innerHTML = str;
        }
    })
}

/**
 * 折叠与展开
 * @type {null}
 */
var input = null;
function toggle(inputId){   // 获取所谓的父行
    // console.info("inputId"+inputId);
    // console.info("input"+input);
    // console.info($("#"+inputId).attr("name"));
    if($("#"+inputId).attr("name") == 1){
        flag = true;
    }else {
        flag = false;
    }
    if(flag){
        $("#"+inputId).attr("src","../adminImages/error.png");
        $("#"+inputId).attr("name","2");
        flag = false;
    }else {
        $("#"+inputId).attr("src","../adminImages/add1.png");
        $("#"+inputId).attr("name","1");
        flag = true;
    }
    $(".child"+inputId).toggle();  // 隐藏/显示所谓的子行
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


function deleteGoodType(inputId) {
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
        // Id = inputId;
        Id = $("#typeId").val();
        flag++;
    }
    if (flag > 0) {
        $.ajax({
            url:'/admin/deleteGoodType',
            data:{
                id:Id
            },
            type:'POST',
            dataType:'JSON',
            success:function (msg) {
                if(msg == 1){
                    layer.msg("删除成功");
                    initGoodType(null);
                    $("#tip").modal('hide');
                }else{
                    alert("发生错误请稍后刷新重试");
                }
            }
        })
    } else {
        alert("没有选择任何用户");
    }
}

function showModel(typeId) {
    $("#typeId").val(typeId);
    $("#tip").modal('show');
}


function showAddTypeModel() {
    $("#addGoodType").modal('show');
    $.ajax({
        url:'/admin/getAllType',
        type:'POST',
        dataType:'JSON',
        async:false,
        success:function (typeList) {
            var parentType = window.document.getElementById("parentType");
            var str = '<option value="">--请选择--</option>';
            if(typeList.length > 0){
                for(var i = 0;i < typeList.length; i++){
                    str += '      <option value="'+typeList[i].id+'">'+typeList[i].name+'</option>\n';
                }
                parentType.innerHTML = str;
            }else{
                parentType.innerHTML = str;
            }
        }
    })
}