function moveWithMouse(el) {
    alert($("#"+el.id).css("top"));
}
function mousePosition(ev) {
    /*
    * 获取鼠标定位，相对于窗口中间
    * */
    if(ev.pageX || ev.pageY){
        return {x:ev.pageX-document.body.clientWidth/2, y:ev.pageY-document.body.clientHeight/2};
    }
    return {
        x:ev.clientX + document.body.scrollLeft - document.body.clientLeft,
        y:ev.clientY + document.body.scrollTop - document.body.clientTop
    };
}