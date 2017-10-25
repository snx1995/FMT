var mode = "";
var p_x,p_y;
var route = [];
var movieSelected = null;
var movieDisplay = null;

var search = document.getElementById('search');
search.addEventListener('keydown',function () {
    if(event.keyCode === 13){
        var m = document.getElementById('search').value;
        searchMovie(m);
    }
});
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
    if(mode!=='add')movieSelected = null;
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
function getMovieInfo(id) {
    $.ajax({
        url:"https://api.douban.com/v2/movie/subject/"+id,
        dataType:'jsonp',
        success:showMovieInfo
    });
}
function confirmMovie(){
    movieSelected = movieDisplay;
    jumpClose('movieInfo','my-fade','my-fade-reverse');
    notice.showDialog("\nYou selected :"+movieSelected.title);
}
function showMovieInfo(data){
    document.getElementById('movieTitle').innerHTML = data.title;
    var d = "";
    for(var i=0;i<data.directors.length;i++){
        d += i===0? data.directors[0].name:(", "+data.directors[i].name);
    }
    document.getElementById('movieDirectors').innerHTML = d;
    document.getElementById('movieYear').innerHTML = data.year;
    document.getElementById('movieRating').innerHTML = data.rating.average;
    d = "";
    for(i=0;i<data.casts.length;i++){
        d += i===0? data.casts[0].name:(", "+data.casts[i].name);
    }
    document.getElementById("movieCasts").innerHTML = d;
    for(i=0;i<data.countries.length;i++){
        d += i===0? data.countries[0]:("/"+data.countries[i]);
    }
    document.getElementById('movieYear').innerHTML = data.year;
    document.getElementById('movieSummary').innerHTML = data.summary;
    d="";
    for(i=0;i<data.genres.length;i++){
        d += i===0? data.genres[0]:("/"+data.genres[i]);
    }
    document.getElementById('movieGenres').innerHTML = d;
    document.getElementById('moviePic').src = data.images.medium;
    jump('movieInfo','my-fade','my-fade-reverse');
    movieDisplay = data;
}
function searchMovie(key){
    $.ajax({
        url:"https://api.douban.com/v2/movie/search?q="+key,
        dataType:'jsonp',
        success:showSearchResult
    });
}
function showSearchResult(data) {
    var sresult = document.getElementById('searchResult');
    var fid;
    var rs = " <a class=\"btn glyphicon glyphicon-remove b-close\" onclick=\"jumpClose('searchResult','result-sld','result-sld-re')\"></a>";
    for(var i=0;i<data.subjects.length;i++){
        fid = data.subjects[i].id;
        rs+="<div class='result-item' onclick='getMovieInfo(this.id)' id='"+fid+"'>" +
            "<table class='table'>" +
            "<tr><td rowspan='2'><img src='" +data.subjects[i].images.small+
            "' alt='图片加载失败:(' style='width: 75px;height: 75px;' rel='v:image'></td>" +
            "<td>" + data.subjects[i].title+
            "</td></tr>" +
            "<tr><td>" + data.subjects[i].genres.join('/')+
            "</td></tr>"+
            "</table>" +
            "</div>"
    }
    sresult.innerHTML = rs;
    jump('searchResult','result-sld','result-sld-re');
}
