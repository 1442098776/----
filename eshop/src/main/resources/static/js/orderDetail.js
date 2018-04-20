/**
 * jQuery的load方法
 * @param url
 */
$(document).ready(function () {
    $("#content").load("orderinfo.html");
});
function href(url) {
    $("#content").load(url);
}
