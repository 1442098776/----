var List = null;
var type = null;
$(document).ready(function () {
    var id = $("#id").val();
    $.ajax({
        url:'/admin/toEditGood',
        type:'POST',
        data:{
            id:id
        },
        dataType:'JSON',
        async:false,
        success:function (good) {
            $("#name").val(good.name);
            $("#price").val(good.price.toFixed(2));
            $("#salePrice").val(good.salePrice.toFixed(2));
            $("#stock").val(good.stock);
            var childType = good.type;
            type = childType;
            console.info("childType1"+childType);
            $.ajax({
                url:'/admin/getAllType',
                type:'POST',
                dataType:'JSON',
                async:false,
                success:function (typeList) {
                    console.info("childType2"+childType);
                    List = typeList;
                    var parentType = window.document.getElementById("parentType");
                    var str = '<option value="">--请选择--</option>';
                    var flag = true;
                    if(typeList.length > 0){
                        for(var i = 0;i < typeList.length; i++){
                            for(var j = 0;j<typeList[i].goodTypes.length;j++){
                                console.info("childType3"+childType);
                               if(childType == typeList[i].goodTypes[j].id){
                                   console.info("childType4"+childType);
                                   flag = false;
                               } else {
                                   flag = true;
                               }
                            }
                            if(flag){
                                str += '      <option value="'+typeList[i].id+'">'+typeList[i].name+'</option>\n';
                            }else {
                                str += '      <option value="'+typeList[i].id+'"  selected>'+typeList[i].name+'</option>\n';
                            }

                        }
                        parentType.innerHTML = str;
                    }else{
                        parentType.innerHTML = str;
                    }
                }
            });
            var goodImg = window.document.getElementById("goodImg");
            var imgStr = "";
            for(var i=0;i<good.goodPics.length;i++){
                imgStr += '<img src="../../img/'+good.id+'/'+good.goodPics[i].picName+'" width="150px" height="150px"/>'
            }
            goodImg.innerHTML = imgStr;

        }
    });
    getChildType();
})


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
                if(type == List[i].goodTypes[j].id){
                    str += '      <option selected value="' + List[i].goodTypes[j].id + '">' + List[i].goodTypes[j].name + '</option>\n';
                }else {
                    str += '      <option value="' + List[i].goodTypes[j].id + '">' + List[i].goodTypes[j].name + '</option>\n';
                }
                childType.innerHTML = str;
            }
        }
    }
}


function updateGood() {
    
}
