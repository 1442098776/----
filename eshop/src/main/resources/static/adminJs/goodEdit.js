$(document).ready(function () {
    initSelect();

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
            var typeSelect = window.document.getElementById("typeSelect");
            var str = "";
            if(typeList.length > 0){
                str += '<select onchange="select()" class="textBox">\n';
                for(var i = 0;i < typeList.length; i++){
                    str += '      <option name="type" value="'+typeList[i].id+'">'+typeList[i].name+'</option>\n';
                }
                   str += '     </select>';
                typeSelect.innerHTML = str;
            }else{
                str += '<select class="textBox">\n' +
                    '      <option value="">没有类型</option>\n' +
                    '     </select>';
                typeSelect.innerHTML = str;
            }
        }
    })
}

function addGood() {
    var formData = new FormData();
    var formData1 = $("#goodInfo").serialize();
    var formData2 = new FormData($("#goodPic")[0]);
    // formData.append("good",$("#goodInfo").serialize());
    // formData.append("file",$("#goodPic")[0]);

    console.info(formData);
    console.info(formData1);
    console.info(formData2);
    $.ajax({
        url:'/admin/addGood',
        type:'POST',
        dataType:'JSON',
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        data:{
            good:formData1,
            file:formData2
        },
        success:function (typeList) {
        }
    })

}