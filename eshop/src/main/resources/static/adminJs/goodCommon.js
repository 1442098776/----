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