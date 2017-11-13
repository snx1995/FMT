var mode = "";
var p_x,p_y;
var movieSelected = null;
var movieDisplay = null;
var username = document.getElementById("username").innerText;

function jump(id,effect1,enableOverly){
    var w = document.getElementById(id);
    w.classList.add(effect1);
    w.style.visibility="visible";
    function windowOpen(){
        this.style.visibility='visible';
        this.classList.remove(effect1);
    }
    w.addEventListener('animationend',windowOpen);
    w.removeEventListener('animationend',function () {
    });
    if(enableOverly===true){
        var m = document.getElementById("shade");
        m.style.visibility='visible';
    }
}
function jumpClose(id,effect2) {
    var w = document.getElementById(id);
    w.classList.add(effect2);
    function windowClose(){
        this.style.visibility='hidden';
        this.classList.remove(effect2);
    }
    w.addEventListener('animationend',windowClose);
    w.removeEventListener('animationend',function () {
    });
    var m =document.getElementById("shade");
    m.style.visibility='hidden';
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
                    document.getElementById("selectedFilm").innerText = movieSelected.title;
                    document.getElementById("newFilmPic").src = movieSelected.images.medium;
                    jump('info','my-fade');
                    break;
                case "addNewPath":
                    jump("addNewPath","my-fade");
                    break;
                default:
                    jumpClose('tips','my-slide-down-re');
                    break;
            }
        };
        jump('tips','my-slide-down');
    }
};
function changeMode(mod,p) {
    mode = mod;
    switch(mode){
        case "add":
            notice.showDialog("\nSwitch mode to add.\n");
            PointsOnMap.show();
            route.clear();
            break;
        case "exploring":
            notice.showDialog("\nSwitch mode to exploring.\n");
            showPoints(map);
            route.clear();
            p.clear();
            break;
        case "route":
            notice.showDialog("\nSwitch mode to route.\n");
            p.clear();
            break;
        case "other":
            notice.showDialog("\n这是备用按钮\n");
            route.clear();
            p.clear();
            break;
        default:
            notice.showDialog("\n错误参数!\n");
            break;
    }
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
    jumpClose('movieInfo','my-fade-reverse');
    notice.showDialog("\nYou selected :"+movieSelected.title);
}
function showMovieInfo(data,type){
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
    document.getElementById('movieYear').innerHTML = data.year;
    document.getElementById('movieSummary').innerHTML = data.summary;
    document.getElementById('movieGenres').innerHTML = data.genres.join('/');
    document.getElementById('movieCountry').innerHTML = data.countries.join('/');
    document.getElementById('moviePic').src = data.images.medium;
    jump('movieInfo','my-fade');
    movieDisplay = data;
}
function searchMovie(key){
    $.ajax({
        url:"https://api.douban.com/v2/movie/search?q="+key,
        dataType:'jsonp',
        success:showSearchResult
    });
}
function imgLoadError(el) {
    el.src='img/imgLoadError.png';
}
function showSearchResult(data) {
    var sresult = document.getElementById('searchResult');
    var fid;
    var rs = "<a class=\"btn glyphicon glyphicon-remove b-close\" onclick=\"jumpClose('searchResult','result-sld-re')\"></a>";
    for(var i=0;i<data.subjects.length;i++){
        fid = data.subjects[i].id;
        rs+="<div class='my-item item-result' onclick='getMovieInfo(this.id)' id='"+fid+"'>" +
            "<img alt='图片加载失败' onerror='imgLoadError(this)' src='"+data.subjects[i].images.medium+"'>"+
            "<div><h4>" + data.subjects[i].title+"</h4>"+
            "<span>" +data.subjects[i].genres.join('/')+
            "</span>"+
            "</div>"+
            "</div>"
    }
    sresult.innerHTML = rs;
    jump('searchResult','result-sld');
}
function playAnimation(id,cn) {
    var el = document.getElementById(id);
    el.style.visibility='visible';
    el.classList.add(cn);
}
var entered = false;
function routePointsDropDown(){
    if(!entered){
        entered = true;
        var points = document.getElementsByClassName('route-point');
        for(var i=0;i<points.length;i++){

        }
    }

}

function addNewPoint() {
    var offsetx = document.getElementById("pos_x").value;
    var offsety = document.getElementById("pos_y").value;
    var filmid = movieSelected.id;
    var filmtitle = movieSelected.title;
    var placeDescription = document.getElementById("placeDescription").value;
    var storyDetails = document.getElementById("storyDetails").value;
    var keyword = document.getElementById("keyword").value;
    var xhr = new XMLHttpRequest();
    var request = "addNewPoint.php?offsetX="+offsetx+"&offsetY="+offsety+"&filmid="+filmid+"&placeDescription="+
            placeDescription+"&storyDetails="+storyDetails+"&keyword="+keyword+"&username="+username+"&filmtitle="+filmtitle;
    xhr.open("GET",request,true);
    xhr.onreadystatechange = function () {
        if(xhr.readyState===4&&xhr.status===200){
            if(xhr.responseText==="success"){
<<<<<<< HEAD
                notice.showDialog("\n添加成功！\n")
                jumpClose("info","my-fade-reverse")
                PointsOnMap.show();
            }else{
=======
                notice.showDialog("\n添加成功！\n");
                jumpClose("info","my-fade-reverse");
                showPoints(map);
                pointsAdded.clear();
            }
            else{
>>>>>>> c78d2cf22940104fd7ac5a9481341f3bcc1485cf
                notice.showDialog(xhr.responseText);
            }
        }
    };
    xhr.send();
}

var PointsOnMap = {
    points:[],
    delete:function (){
      this.points=[];
    },
    clear:function (){
        for(var i=0;i<this.points.length;i++){
            this.points[i].setVisible(false);
        }
    },
    push:function (p) {
        this.points.push(p);
    },
    show:function () {
        for(var i=0;i<this.points.length;i++){
            this.points[i].setVisible(true);
        }
    }
};

var route = {
    points:[],
    myPath:null,
    prePath:new google.maps.Polyline(),
    setMap:function () {
        var pos =[];
        for(var i=0;i<this.points.length;i++){
            if(this.points[i]) pos.push(this.points[i].marker.position);
        }
        this.myPath =new google.maps.Polyline({
            path:pos,
            strokeColor:"#00b3ee",
            strokeOpacity:0.8,
            strokeWeight:2
        });
        this.prePath.setVisible(false);
        this.myPath.setMap(map);
        this.prePath=this.myPath;
    },
    addPoint:function (p) {
        this.points.push(p);
        this.setMap();
        if(this.points.length>1){
            notice.showDialog("\n点击这里可以提交您的路线~\n","addNewPath");
        }else{
            notice.showDialog("\n请继续选择地点~\n");
        }
    },
    removePoint:function (p){
        for(var i=0;i<this.points.length;i++){
            if(this.points[i]===p){
                this.points[i]=null;
                break;
            }
        }
        this.setMap();
    },
    clear:function () {
        this.prePath.setVisible(false);
        this.points=[];
    },
    submit:function (){
        var pathinfo = "";
        var pathdes = document.getElementById("newPathDesc").value;
        for(var i=0;i<this.points.length;i++){
            pathinfo+=this.points[i].id;
        }
        $.ajax({
            url:"storepath.php",
            data:{
                pathinfo:pathinfo,
                user:username,
                pathdes:pathdes
            },
            success:function (){
                notice.showDialog("\n添加成功~\n");
                jumpClose("addNewPath","my-fade-reverse");
            }
        })
    }
};
function point(id,posx,posy,user,m){
    this.id=id;
    this.posx=posx;
    this.posy=posy;
    this.user=user;
    this.inRoute = false;
    this.marker=new google.maps.Marker({
        position:new google.maps.LatLng(posx,posy),
        id:this.id,
        user:this.user,
        map:m
    });
    this.setVisible=function (b) {
        this.marker.setVisible(b);
    };
    var p = this;
    var marker = this.marker;
    google.maps.event.addListener(marker,"click",function () {
            getAllStories(marker.id,marker.map,marker);
    });
    google.maps.event.addListener(marker,"dblclick",function () {
        infowindow.close();
        if(mode==="add"){

        }else if(mode==="route"){
            if(!p.marker.inRoute){
                p.marker.inRoute=true;
                route.addPoint(p);
            }else{
                p.marker.inRoute=false;
                route.removePoint(p);
            }
        }
    })
}

function showPoints(m){
    $.ajax({
        url:"getAllPoints.php",
        dataType:"json",
        success:function (data){
            PointsOnMap.delete();
            for(var i=0;i<data.length;i++){
                    var p = new point(data[i].id,data[i].posx,data[i].posy,data[i].user,m);
                    PointsOnMap.push(p);
            }
        }
    })
}
var contentString = "";

var infowindow  = new google.maps.InfoWindow({
    content: "If you see this, something goes wrong..."
});

function getAllStories(id,map,marker) {
    $.ajax({
        url:"getStories.php?id="+id,
        dataType:"json",
        success:function (data) {
            contentString = "<div id='infoWindow'>" +
                "<h2 id='infoTitle'>这里发生了"+data.length+"个故事："+
                "</h2>" +
                "<div class='info-window-content'>";
            for(var i=0;i<data.length;i++){
                var filmid = data[i].filmid;
                contentString+= "<div class='story-item'>" +
                    "<h4>在<strong>" + data[i].filmtitle+"</strong>中，<a style='font-size: 14px;cursor: hand;' onclick='getMovieInfo(" +filmid+
                    ")'>电影详情>></a>"+
                    "</h4>" +
                    "<p>" +data[i].placedes+
                    "</p>" +
                    "<p>" +data[i].keywords+
                    "</p>" +
                    "<a>更多>></a>"+
                    "</div>";
            }
            contentString+="</div>" +
                "<div style='width: 100%'>" +
                "<button class='b-btn b-grey b-md' style='margin: 10px auto;display: block'>我知道新的故事~</button>" +
                "</div>" +
                "</div>";
            infowindow.setContent(contentString);
            infowindow.open(map,marker);
        }
    })
}function addNewStory(pointid) {

}


function getAllPaths(){
    $.ajax({
        url:"getAllPaths.php",
        dataType:"json",
        success:function (data){

        }
    });
}

