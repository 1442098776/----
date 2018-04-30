var List = null;
$(document).ready(function () {
    initSelect();
    console.info(List);

})
function select() {
    $("#typeSelect option:selected").attr("name","type")
}
function initSelect() {
    $.ajax({
        url:'/admin/getAllType',
        type:'POST',
        dataType:'JSON',
        async:false,
        success:function (typeList) {
            List = typeList;
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

function getChildType() {
    var parentId = $("#parentType option:selected").val();
    var childType = window.document.getElementById("childType");
    var str = '<option value="">--请选择--</option>';
    for (i in List) {
        if (List[i].id == parentId) {
            for (j in List[i].goodTypes) {
                str += '      <option value="' + List[i].goodTypes[j].id + '">' + List[i].goodTypes[j].name + '</option>\n';
                childType.innerHTML = str;
            }
        }
    }
}

function addGood() {
    var formData = new FormData($("#addGood")[0]);
    console.info(formData);
    var file = window.document.getElementById("FirstfileImg").files;
    if(file.length <= 0){
        layer.msg("请选择上传的图片");
    }else {
        if($("#childType option:selected").val() != ""){
            if($("#name").val() != "" && $("#price").val() != "" && $("#stock").val() != ""){
                if($("#price").val() != "" && $("#salePrice").val() > $("#price").val()){
                    layer.msg("销售价格不该比原价高");
                    return;
                }
                $.ajax({
                    url:'/admin/addGood',
                    type:'POST',
                    dataType:'JSON',
                    async: false,
                    cache: false,
                    contentType: false,
                    processData: false,
                    data:formData,
                    success:function (msg) {
                        if(msg == 1){
                            layer.msg("添加商品成功");
                            $("#addGood")[0].reset();
                            document.getElementById("ccc").innerHTML = "";
                        }else {
                            layer.msg("发生错误，添加商品失败");
                        }
                    }
                })
            }else {
                layer.msg("产品名称、价格、库存填写出错");
            }
        }else{
            layer.msg("请选择类型");
        }
    }
}

