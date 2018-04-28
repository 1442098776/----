var flag = true;
$(function(){
    initGoodType();
})
var List = null;
function initGoodType() {
    var typeList = window.document.getElementById("typeList");
    $.ajax({
        url:'/admin/getGoodType',
        type:'POST',
        dataType:'JSON',
        success:function (goodTypeList) {
            List = goodTypeList;
            var str = "";
            for(var i = 0;i < goodTypeList.length;i++){
                str += '<tr class="parent">\n' +
                    '    <td class="center"><img onclick="toggle('+goodTypeList[i].id+')" name="1" id="'+goodTypeList[i].id+'" width="20px" height="20px" src="../adminImages/add1.png"></td>\n' +
                    '    <td>\n' +
                    // '     <input type="checkbox" name="items" value='+goodTypeList[i].id+'"/>\n' +
                    '     <span>'+goodTypeList[i].name+'</span>\n' +
                    '    </td>'+
                    '    <td class="center">'+new Date(goodTypeList[i].createTime).Format("yyyy-MM-dd hh:mm")+'</td>\n';
                if(goodTypeList[i].modifyTime != null){
                    str += '    <td class="center">'+new Date(goodTypeList[i].modifyTime).Format("yyyy-MM-dd hh:mm")+'</td>\n';
                }else {
                    str += '    <td class="center"></td>\n';
                }
                str += '    <td class="center"><button onclick="showEditModel('+goodTypeList[i].id+','+0+')" type="button">编辑</button></td>';
                for( var j = 0;j<goodTypeList[i].goodTypes.length;j++){
                    str += '<tr class="child'+goodTypeList[i].id+'" hidden>\n' +
                        '    <td  class="center"></td>\n' +
                        '    <td>\n' +
                        '     <input type="checkbox" name="items" value="'+goodTypeList[i].goodTypes[j].id+'"/>\n' +
                        '     <span>'+goodTypeList[i].goodTypes[j].name+'</span>\n' +
                        '    </td>\n' +
                        '    <td class="center">'+new Date(goodTypeList[i].goodTypes[j].createTime).Format("yyyy-MM-dd hh:mm")+'</td>\n';
                    if(goodTypeList[i].goodTypes[j].modifyTime != null){
                        str += '    <td class="center">'+new Date(goodTypeList[i].goodTypes[j].modifyTime).Format("yyyy-MM-dd hh:mm")+'</td>\n';
                    }else {
                        str += '    <td class="center"></td>\n';
                    }
                    str += '    <td class="center"><button onclick="showEditModel('+goodTypeList[i].goodTypes[j].id+','+goodTypeList[i].id+')" type="button">编辑</button>\n' +
                        '    <button onclick="showModel('+goodTypeList[i].goodTypes[j].id+')" type="button">删除</button></td>\n' +
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

/**
 * 删除分类提示框
 * @param typeId
 */
function showModel(typeId) {
    $("#typeId").val(typeId);
    $("#tip").modal('show');
}

/**
 * 删除商品分类
 * @param inputId
 */
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
        alert("没有选择任何商品分类");
    }
}



/**
 * 编辑分类显示模态框
 * @param typeId
 * @param parentId
 */
function showEditModel(typeId,parentId) {
    $("#editGoodType").modal('show');
    var parentType = window.document.getElementById("edit_parentType");
    $("#id").val(typeId);
    if(parentId != 0){
        var str = '';
        if(List.length > 0){
            for(var i = 0;i < List.length; i++){
                if(parentId == List[i].id){
                    str += '      <option value="'+List[i].id+'" selected>'+List[i].name+'</option>\n';
                    for(var j = 0;j<List[i].goodTypes.length;j++){
                        if(typeId == List[i].goodTypes[j].id){
                            $("#edit_typeName").val(List[i].goodTypes[j].name);
                        }
                    }
                }else {
                    str += '      <option value="'+List[i].id+'">'+List[i].name+'</option>\n';
                }
            }
            parentType.innerHTML = str;

        }else{
            parentType.innerHTML = str;
        }
    }else {
        $("#parentTitle").addClass("hide");
        $("#edit_parentType").addClass("hide");
        for(var i = 0;i < List.length; i++){
            if(typeId == List[i].id){
                $("#edit_typeName").val(List[i].name);
            }
        }
    }

}

/**
 * 修改分类
 */
function updateGoodType() {
    $.ajax({
        url:'/admin/updateGoodType',
        type:'POST',
        data:$('#editGoodTypeForm').serialize(),
        dataType:'JSON',
        success:function (msg) {
            if(msg == 1){
                $('#typeName').val("");
                layer.msg("修改商品分类成功");
                $("#editGoodType").modal('hide');
                initGoodType();
            }else if(msg == 2){
                layer.msg("该分类已存在");
            }else {
                layer.msg("修改分类失败");
            }
        }
    })
}


/**
 * 添加分类显示模态框
 */
function showAddTypeModel() {
    $("#addGoodType").modal('show');
    var parentType = window.document.getElementById("parentType");
    var str = '<option value="">--请选择--</option>';
    if(List.length > 0){
        for(var i = 0;i < List.length; i++){
            str += '      <option value="'+List[i].id+'">'+List[i].name+'</option>\n';
        }
        parentType.innerHTML = str;
    }else{
        parentType.innerHTML = str;
    }
}

/**
 * 添加分类
 */
function addType() {
    $.ajax({
        url:'/admin/insertGoodType',
        type:'POST',
        data:$('#addGoodTypeForm').serialize(),
        dataType:'JSON',
        success:function (msg) {
            if(msg == 1){
                $('#typeName').val("");
                layer.msg("添加商品分类成功");
                $("#addGoodType").modal('hide');
                initGoodType();
            }else if(msg == 2){
                layer.msg("该分类已存在");
            }else {
                layer.msg("添加分类失败");
            }
        }
    })
}