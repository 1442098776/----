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
                if($("#price").val() != "" && $("#price").val() > $("#price").val()){
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

function validationNumber(e, num) {
    var numberReg = /^[0-9]+\.?[0-9]*$/;
    if (e.value != "") {
        if (!numberReg.test(e.value)) {
            // alert("请输入正确的数字");
            // e.value = e.value.substring(0, e.value.length - 1);
            e.value = "";
            e.focus();
            layer.msg("请输入正确的数字");
            flag = false;
        } else {
            if (num > 0) {
                if (e.value.indexOf('.') > -1) {
                    if (e.value.split('.')[1].length > num) {
                        // e.value = e.value.substring(0, e.value.length - 1);
                        e.value = e.value.substring(0, e.value.indexOf('.')+1+num);
                        e.focus();
                        layer.msg("输入有误!***格式:66.00")
                    }
                }

            }else {
                if (e.value.indexOf('.') > -1) {
                    // e.value = e.value.substring(0, e.value.length - 1);
                    e.value = e.value.substring(0, e.value.indexOf('.'));
                    e.focus();
                    layer.msg("输入有误!***格式:100");
                }
            }

        }
    }
}

/**
 * 图片预览
 * @param file
 * @param id
 * @returns {boolean}
 * @constructor
 */
jQuery.DuoImgsYulan = function(file, id) {
    if(file.length <= 5){
        for (var i = 0; i < 5; i++) {
            if (!/image\/\w+/.test(file.item(i).type)) {
                // alert("请选择图片文件");
                layer.msg("请选择图片文件");
                ClearfirtsImg();
                return false;
            }
            if (file[i].size > 2048 * 1024) {
                // alert("图片不能大于2MB");
                layer.msg("图片不能大于2MB");
                ClearfirtsImg();
                continue;
            }
            var img;
            console.log(document.getElementById("fileImg"));
            console.log(file[i]);
            console.log("file-size=" + file[i].size);
            var reader = new FileReader();
            reader.onloadstart = function(e) {
                console.log("开始读取....");
            }
            reader.onprogress = function(e) {
                console.log("正在读取中....");
            }
            reader.onabort = function(e) {
                console.log("中断读取....");
            }
            reader.onerror = function(e) {
                console.log("读取异常....");
            }
            var j = 0;
            reader.onload = function(e) {
                console.log("成功读取....");
                var div = document.createElement("div"); //外层 div
                div.setAttribute("style", "position:relative;width:inherit;height:inherit;float:left;z-index:2;width:150px;margin-left:8px;margin-right:8px;");
                // var del = document.createElement("div"); //删除按钮div
                // del.setAttribute("style", "position: absolute; bottom: 4px; right: 0px; z-index: 99; width: 30px; height:30px;border-radius:50%;")
                // var delicon = document.createElement("img");
                // delicon.setAttribute("src", "http://www.jq22.com/tp/f26c324f-24db-4f08-91d6-f7ffc9ca1516.png");
                // delicon.setAttribute("title", "删除");
                // delicon.setAttribute("style", "cursor:pointer;width: 30px; height:30px");
                // del.onclick = function() {
                //     this.parentNode.parentNode.removeChild(this.parentElement);
                //     ClearfirtsImg(j);
                //     j++;
                // };
                // del.appendChild(delicon);
                // div.appendChild(del);
                var imgs = document.createElement("img"); //上传的图片
                imgs.setAttribute("name", "loadimgs");
                imgs.setAttribute("src", e.target.result);
                imgs.setAttribute("width", 150);
                if (document.getElementById(id).childNodes.length > 4) {
                    document.getElementById(id).removeChild(document.getElementById(id).firstChild);
                }
                div.appendChild(imgs)
                document.getElementById(id).appendChild(div);
            }
            reader.readAsDataURL(file[i]);
        }
    }else{
        ClearfirtsImg();
        layer.msg("最多只能上传5张图片");
    }

}

/**
 * 获取input的图片
 * @constructor
 */
function FirstImg() {
    document.getElementById("ccc").innerHTML = "";
    $.DuoImgsYulan(document.getElementById("FirstfileImg").files, "ccc");
}

/**
 * 清空文本域
 * @constructor
 */
function ClearfirtsImg() {
    var file = $("#FirstfileImg");
    file.after(file.clone().val(""));
    file.remove();
}