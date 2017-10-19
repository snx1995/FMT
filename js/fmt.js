var mode = "";
var p_x,p_y;
var route = [];
function jump(id,effect1,effect2){
    var w = document.getElementById(id);
    if(effect2!==undefined) w.classList.remove(effect2);
    w.classList.add(effect1);
    w.style.visibility="visible";
    if(id==='info'){
        var m =document.getElementById("shade");
        m.style.visibility='visible';
    }

}
function jumpClose(id,effect1,effect2) {
    var w = document.getElementById(id);
    w.classList.remove(effect1);
    if(effect2!==undefined){
        w.classList.add(effect2);
        w.addEventListener("animationend",function () {
            if(w.classList.contains(effect2)){
                w.style.visibility="hidden";
                if(id==='info'){
                    var m =document.getElementById("shade");
                    m.style.visibility='hidden';
                }
            }
        })
    }
}
function jumpAndClose(id,effect1,effect2){
    var w = document.getElementById(id);
    if(!(w.classList.contains(effect1))||w.classList.contains(effect2)){
        w.classList.remove(effect2);
        w.classList.add(effect1);
        w.style.visibility="visible";
    }else{
        w.classList.remove(effect1);
        w.classList.add(effect2);
        w.addEventListener("animationend",function () {
            if(w.classList.contains(effect2))
                w.style.visibility="hidden";
        })
    }
}
var notice;
notice = {
    windowId:"info",
    msgId:"msg",
    showDialog:function (m,action) {
        var w= document.getElementById(notice.msgId);
        w.innerText=m;
        var mb = document.getElementById('msgBoard');
        w.onclick = function () {
            switch (action){
                case "addNewPlace":
                    document.getElementById("pos_x").value = p_x;
                    document.getElementById("pos_y").value = p_y;
                    jump('info','my-fade','my-fade-reverse');
                    break;
                default:
                    jumpClose('tips','my-slide-down','my-slide-down-re');
                    break;
            }
        };
        jump('tips','my-slide-down','my-slide-down-re');
    }
};
function changeMode(mod) {
    mode = mod;
    notice.showDialog("\nSwitch mode to "+mod+'\n');
}
function showRoute(mp) {
    var points = [];
    for(var i =0;i<route.length;i++){
        points.push(route[i].position);
    }
    return points;
}
function arrayContains(a,p) {
    for(var i=0;i<a.length;i++){
        if(a[i]===p) return i;
    }
    return -1;
}
