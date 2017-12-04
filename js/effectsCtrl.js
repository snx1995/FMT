$(document).on('click',function (e) {
    $('.f-select .content').css("visibility","hidden");
});
var fSelectCtrl = {
    selects:$(".f-select"),
    init:function (){
        this.selects.on('click',function (e) {
            e.stopPropagation();
            $(this).children().filter(".content").css("visibility","visible");
        });
        this.selects.children().children().children().filter("li").click(function (e) {
            e.stopPropagation();
            $(this).parent().parent().parent().children().filter('.f-selected').text($(this).text());
            $(this).parent().parent().parent().children().filter('.content').css("visibility","hidden");
        })
    }
};
fSelectCtrl.init();