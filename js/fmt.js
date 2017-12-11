var mode = "";
var p_x,p_y;
var movieSelected = null;
var movieDisplay = null;
var username = document.getElementById("username").innerText;
var allpaths=null;
var userID = 0;

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
            PointsOnMap.show();
            route.clear();
            exploreOptCtrl.hide();
            break;
        case "exploring":
            exploreMode(true);
            //showPoints(map);
            route.clear();
            p.clear();
            break;
        case "route":
            exploreOptCtrl.hide();
            p.clear();
            break;
        case "routeExplore":
            exploreOptCtrl.hide();
            getAllPaths();
            route.clear();
            p.clear();
            break;
        default:
            notice.showDialog("\n错误参数!\n");
            break;
    }
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
    document.getElementById('movieInUse').innerHTML = "已选择：<strong>"+movieSelected.title+"</strong>";
    jump("movieSelect","movie-select-drop");
    jumpClose('searchResult','result-sld-re');
    jumpClose('movieInfo','my-fade-reverse');
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
    if(key!=""){
        $.ajax({
            url:"https://api.douban.com/v2/movie/search?q="+key,
            dataType:'jsonp',
            success:showSearchResult
        });
    }else{
        notice.showDialog("\n请输入要搜索的内容~\n")
    }
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
    if(placeDescription&&storyDetails&&keyword){
        var xhr = new XMLHttpRequest();
        var request = "addNewPoint.php?offsetX="+offsetx+"&offsetY="+offsety+"&filmid="+filmid+"&placeDescription="+
            placeDescription+"&storyDetails="+storyDetails+"&keyword="+keyword+"&username="+username+"&filmtitle="+filmtitle+
            "&userid="+userID;
        xhr.open("GET",request,true);
        xhr.onreadystatechange = function () {
            if(xhr.readyState===4&&xhr.status===200){
                if(xhr.responseText==="success"){
                    notice.showDialog("\n添加成功！\n");
                    jumpClose("info","my-fade-reverse");
                    showPoints(map);
                    pointsAdded.clear();
                }
                else{
                    alert(xhr.responseText);
                }
            }
        };
        xhr.send();
    }else{
        notice.showDialog("\n请将每一项都填写完整~\n");
    }

}

var PointsOnMap = {
    points:[],
    delete:function (){
        this.hide();
      this.points=[];
    },
    hide:function (){
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
    },
    getPoint:function (id){
        for(var i=0;i<this.points.length;i++){
            if(this.points[i].id==id){
                return this.points[i];
            }
        }
        return null;
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
            if(this.points[i])pathinfo+=this.points[i].id;
        }
        $.ajax({
            url:"storepath.php",
            data:{
                pathinfo:pathinfo,
                user:username,
                pathdes:pathdes,
                userid:userID
            },
            success:function (data){
                if(data=="success"){
                    notice.showDialog("\n添加成功~\n");
                    jumpClose("addNewPath","my-fade-reverse");
                }else alert(data);

            }
        })
    },
    push:function (p) {
        this.points.push(p);
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
function getPointsByFilmId(id,m) {
    notice.showDialog("\n加载中，请稍后...");
    $.ajax({
        url:"getPointsByFilmId.php?filmid="+id,
        dataType:"json",
        success:function (data) {
            PointsOnMap.delete();
            for(var i=0;i<data.length;i++){
                var p = new point(data[i].id,data[i].posx,data[i].posy,data[i].user,m);
                PointsOnMap.push(p);
            }
            notice.showDialog("\n切换完成,共有"+data.length+"个相关地点~");
        }
    })
}
function getPointsByKeyword(key,m){
    notice.showDialog("\n查询中，请稍后...");
    $.ajax({
        url:"getPointsByKeyword.php?keyword="+key,
        dataType:"json",
        success:function (data) {
            PointsOnMap.delete();
            for(var i=0;i<data.length;i++){
                var p = new point(data[i].id,data[i].posx,data[i].posy,data[i].user,m);
                PointsOnMap.push(p);
            }
            notice.showDialog("\n搜索完成,共有"+data.length+"个相关地点~");
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
                var storyid = data[i].storyid;
                contentString+= "<div class='story-item'>" +
                    "<h4>在<strong>" + data[i].filmtitle+"</strong>中，<a style='font-size: 14px;cursor: hand;' onclick='getMovieInfo(" +filmid+
                    ")'>电影详情>></a>"+
                    "</h4>" +
                    "<p>" +data[i].placedes+
                    "</p>" +
                    "<p>" +data[i].keywords+
                    "</p>" +
                    "<div class='story-btn-c'>"+
                    "<a onmouseenter='showStoryDetail(" + storyid +
                    ")' onmouseleave='hideStoryDetails()'>更多>></a>"+
                    "<i class='fa fa-share fa-2x story-btn' title='分享'></i>"+
                    "<i class='fa fa-heart-o fa-2x story-btn' title='喜欢'></i>" +
                    "<i class='fa fa-plus fa-2x story-btn' data-user='" + data[i].userid +
                    "' title='关注TA'></i>"+
                    "</div></div>";
            }
            contentString+="</div>" +
                "<div style='width: 100%'>" +
                "<button class='b-btn b-grey b-md' style='margin: 10px auto;display: block' onclick='addNewStory("+id +
                ")'>我知道新的故事~</button>" +
                "</div>" +
                "</div>";
            infowindow.setContent(contentString);
            infowindow.open(map,marker);
            enableOption();
        }
    })
}
function getAllPaths(){
    $.ajax({
        url:"findpath.php",
        dataType:"json",
        success:function (data){
            allpaths = data;
            var pathContent = document.getElementById("paths");
            var pathsInner = "";
            for(var i=0;i<data.length;i++){
                pathsInner+="<div class='item-route'>" +
                    "<h3>用户：<strong>" + data[i].user +
                    "</strong>创建</h3>" +
                    "<h5>路线中共有" + data[i].points.length +
                    "个地点，TA说这条路线：</h5>"+
                    "<p style='font-size: 16px'>" + data[i].pathdes+
                    "</p>" +
                    "<div class='story-btn-c'>" +
                    "<i class='fa fa-map fa-2x story-btn' onclick='pathShowOnMap(" +i +
                    ")' title='展示在地图上'></i>" +
                    "<i class='fa fa-share fa-2x story-btn' title='分享'></i>" +
                    "<i class='fa fa-heart-o fa-2x story-btn' title='喜欢'></i>" +
                    "<i class='fa fa-plus fa-2x story-btn' data-user='" + data[i].userid +
                    "' title='关注TA'></i>" +
                    "</div>"+
                    "</div>";
                // "<a class='pull-right' onclick='pathShowOnMap(" +i+
                // ")'>在地图上查看>></a>" +
            }
            pathContent.innerHTML = pathsInner;
            jump('routeBrowser','side-sld');
            enableOption();
        }
    });
}
function enableOption(){
    $(".fa-heart-o").click(function (){
        $(this).removeClass("fa-heart-o");
        $(this).addClass("fa-heart");
    });
    $(".fa-plus").click(function () {
        follow($(this).attr("data-user"));
    });
}
function follow(id){
    $.ajax({
        url:"follow.php?userid="+userID+"&followid="+id,
        dataType:"json",
        success:function (data) {
            if(data.result=="success") notice.showDialog("\n您成功关注:"+data.follow);
            else notice.showDialog("\n"+data.result);
        }
    })
}
function pathShowOnMap(p){
    route.clear();
    var path = allpaths[p];
    for(var i=0;i<path.points.length;i++){
        route.push(PointsOnMap.getPoint(path.points[i].id));
    }
    route.setMap();
    map.setCenter(PointsOnMap.getPoint(path.points[0].id).marker.position);
}
var pointIdOfNewStory=undefined;
function addNewStory(pointid) {
    var p = PointsOnMap.getPoint(pointid);
    pointIdOfNewStory=pointid;
    if(movieSelected){
        if(p){
            document.getElementById("filmOfStory").innerText=movieSelected.title;
            document.getElementById("pos_xNew").value = p.posx;
            document.getElementById("pos_yNew").value = p.posy;
            document.getElementById("filmPicOfStory").src = movieSelected.images.medium;
            jump("newStory","my-fade");
        }else{
            alert("p is null");
        }
    }else{
        notice.showDialog("\n请先选择电影~\n")
    }


}
function confirmNewStory(){
    var des = document.getElementById("placeDescriptionNew").value;
    var det = document.getElementById("storyDetailsNew").value;
    var key = document.getElementById("keywordNew").value;
    if(!des || !det || !key){
        notice.showDialog("\n请将每一项都填写完整~\n");
    }
    else{
        $.ajax({
            url:"addNewStory.php",
            data:{
                pointid:pointIdOfNewStory,
                filmid:movieSelected.id,
                placedes:document.getElementById("placeDescriptionNew").value,
                details:document.getElementById("storyDetailsNew").value,
                keywords:document.getElementById("keywordNew").value,
                user:username,
                filmtitle:movieSelected.title,
                userid:userID
            },
            dataType:"text",
            success:function (data) {
                if(data==="success"){
                    notice.showDialog("\n添加成功！\n");
                    jumpClose("newStory","my-fade-reverse");
                    getAllStories(pointIdOfNewStory,map,PointsOnMap.getPoint(pointIdOfNewStory).marker);
                }
                else{
                    notice.showDialog(data);
                }
            }
        })
    }
}

function showStoryDetail(storyid) {
    var story=null;
    $.ajax({
        url:"getStoryBySId.php?storyid="+storyid,
        dataType:"json",
        async:false,
        success:function (data) {
            story=data;
        }
    });
    $("#storyDetailWindow h3").text(story.filmtitle);
    $("#storyDetailWindow h5").text("by "+story.user);
    $("#storyDetailWindow h5+span").text("关于地点："+story.placedes);
    $("#storyDetailWindow p").text("故事："+story.details);
    $("#storyDetailWindow p+span").text("关键词："+story.keywords);
    $("#storyDetailWindow").css("visibility","visible");
}
function hideStoryDetails() {
    $("#storyDetailWindow").css("visibility","hidden");
}
function mouseAbsPos(ev) {
    if(ev.pageX || ev.pageY){
        return {x:ev.pageX, y:ev.pageY};
    }
    return {
        x:ev.clientX + document.body.scrollLeft - document.body.clientLeft,
        y:ev.clientY + document.body.scrollTop - document.body.clientTop
    };
}
function storyDetailsWindow(ev){
    ev = ev||window.event;
    var mousePos = mouseAbsPos(ev);
    var swin = document.getElementById("storyDetailWindow");
    swin.style.top = (mousePos.y-2)+"px";
    swin.style.left = (mousePos.x+2)+"px";
}
var navCtrl = {
    navOptions:document.getElementsByClassName("f-options"),
    preOption:1,
    navTabs:[
        $("#userCenter"),
        $("#googleMap"),
        $("#dynamicInfo"),
        $("#about")
    ],
    change:function (n) {
        var nav=this;
        n = parseInt(n);
        if(n!==nav.preOption){
            if(n!==1){
                closeAllJumpWindow();
                $("#mapOptions").css("visibility","hidden");
                $("#movieSelect").css("visibility","hidden");
            }
            else{
                $("#mapOptions").css("visibility","visible");
                if(movieSelected!==null) $("#movieSelect").css("visibility","visible");
            }
            var preTab = nav.navTabs[nav.preOption];
            var newTab = nav.navTabs[n];
            this.navOptions[this.preOption].classList.remove("active");
            this.navOptions[n].classList.add("active");
            if(n<nav.preOption){
                newTab.css({"left":"-100%"});
                preTab.animate({left:"100%",opacity:"0"},500);
                newTab.animate({left:"0",opacity:"1"},500);
            }else{
                newTab.css("left","100%");
                preTab.animate({left:"-100%",opacity:"0"},500);
                newTab.animate({left:"0",opacity:"1"},500);
            }
            this.preOption=n;
        }


    },
    init:function (){
        for(var i=0;i<this.navOptions.length;i++){
            var m = this.navOptions[i];
            m.addEventListener("click",function () {
                navCtrl.change(this.getAttribute("data-index"));
            })
        }
    }
};
function closeAllJumpWindow(){
    exploreOptCtrl.hide();
    $("#searchResult").css("visibility","hidden");
    $("#routeBrowser").css("visibility","hidden");
    $("#movieInfo").css("visibility","hidden");
    $("#tips").css("visibility","hidden");
    $("#info").css("visibility","hidden");
    $("#newStory").css("visibility","hidden");
    $("#addNewPath").css("visibility","hidden");
}

var userCenterCtrl = {
    userOptions:document.getElementsByClassName("user-center-btn"),
    preOption:0,
    text:["首页","我的信息","我的关注","我的地点","我的故事","我的路线","账号管理","分享"],
    change:function (n) {
        this.userOptions[this.preOption].classList.remove("active");
        this.userOptions[n].classList.add("active");
        this.preOption=n;
        document.getElementsByClassName("uci-header")[0].innerHTML="<h4>"+this.text[n]+"</h4>";
        showUserCenterTab(n);
    },
    init:function () {
        for(var i=0;i<this.userOptions.length;i++){
            this.userOptions[i].addEventListener("click",function () {
                userCenterCtrl.change(this.getAttribute("data-index"));
            })
        }
        getMainUserInfo();
    }
};
function showUserCenterTab(n){
    switch(n){
        case '0':
            getMainUserInfo();
            break;
        case '1':
            var w = document.getElementById("uciContent");
            w.innerHTML = "<div class='content'>" +
                "<table class='table'>" +
                "<tr><td>昵称：</td><td><input type='text' class='form-control input-md'></td></tr>" +
                "<tr><td>FMTID：</td><td>12345678</td></tr>" +
                "<tr><td>生日：</td><td><input type='date' class='form-control input-md'></td></tr>" +
                "<tr><td>性别：</td><td><select name='sex'><option value='1'>男</option>" +
                "<option value='0'>女</option>" +
                "<option value='2'>保密</option></select></td></tr>" +
                "<tr><td>所在地：</td><td><input type='text' class='form-control input-md'></td></tr>" +
                "<tr><td>个人简介：</td><td><textarea name='self-introduction' id='selfIntroduction' cols='30' rows='5'></textarea></td></tr>"+
                "</table>"+
                "</div>";
            break;
        case '2':
            testBlank();
            break;
        case '3':
            testBlank();
            break;
        case '4':
            testBlank();
            break;
        case '5':
            testBlank();
            break;
        case '6':
            testBlank();
            break;
        case '7':
            testBlank();
            break;
        default:
            break;
    }
}
function getMainUserInfo(id) {
    $.ajax({
        url:"getUserInfo.php?userid="+id,
        dataType:"json",
        success:function (data) {
            var w = document.getElementById("uciContent");
            w.innerHTML = "<div class='uci-item'>" +
                "<div class='uci-user-img'>" +
                "<img src='img/userPicTmp.png'>" +
                "</div>" +
                "<div class='uci-item-content'>" +
                "<h3>长风茗宇</h3>" +
                "<span style='float: left;margin-left: 10px;color: #00b3ee' class='fa fa-male fa-2x'></span>" +
                "<div class='user-experience'>" +
                "<div>" +
                "<h4 class='experience-level'>Lv.50</h4>" +
                "</div>" +
                "</div>" +
                "<div style='margin-top: 20px;'>" +
                "<p class='record-sign'><i class='fa fa-map-marker' title='我的地点'>&nbsp;&nbsp;</i>56</p>" +
                "<p class='record-sign'><i class='fa fa-map-signs' title='我的路线'>&nbsp;&nbsp;</i>18</p>" +
                "<p class='record-sign'><i class='fa fa-book' title='我的故事'>&nbsp;&nbsp;</i>32</p>" +
                "<p class='record-sign'><i class='fa fa-heart' title='粉丝'>&nbsp;&nbsp;</i>226</p>" +
                "</div>" +
                "</div>" +
                "</div>"+
                "<div class=\"uci-item\">" +
                "<div class=\"user-statistics\">" +
                "<p style=\"font-size: 14px;color: #8c8c8c;\">您来到FMT已经6年零5月27天啦, 领先98.6%的朋友哦~</p>" +
                "<h4>获得的成就：</h4>" +
                "<div style=\"width: 100%;margin-top: 20px;\">" +
                "<div class=\"user-achievement\">" +
                "</div>" +
                "<div class=\"user-achievement\">" +
                "</div>" +
                "<div class=\"user-achievement\">" +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>"
            ;
        }
    });
}
function getUserInfo(id){
    $.ajax({
        url:"getUserInfo.php?userid="+id,
        dataType:"json",
        success:function (data){
            var w = document.getElementById("uciContent");
            w.innerHTML = "<div class='content'>" +
                "<table class='table'>" +
                "<tr><td>昵称：</td><td><input type='text' class='form-control input-md'></td></tr>" +
                "<tr><td>生日：</td><td><input type='date' class='form-control input-md'></td></tr>" +
                "<tr><td>性别：</td><td><select name='sex'><option value='1'>男</option>" +
                "<option value='0'>女</option>" +
                "<option value='2'>保密</option></select></td></tr>" +
                "<tr><td>所在地：</td><td><input type='text' class='form-control input-md'></td></tr>" +
                "</table>"+
                "</div>";
        }
    })
}
function exploreMode(flag){
    var searchBar = $("#exploreSearch");
    if(flag){
        searchBar.animate({bottom:"20px",left:"50px",opacity:1},500);
    }
    else{
        searchBar.animate({bottom:"-100%",left:"-100%",opacity:0},500);
    }
}
function testBlank() {
    var w = document.getElementById("uciContent");
    w.innerHTML="";
}
var exploreOptCtrl = {
    options:document.getElementsByClassName("explore-options"),
    preOption:0,
    init:function () {
        for(var i=0;i<this.options.length;i++){
            this.options[i].addEventListener("click",function () {
               exploreOptCtrl.changeTo(this.getAttribute("data-index"));
            })
        }
    },
    changeTo:function (n) {
        if(n!==this.preOption) {
            exploreOptCtrl.options[n].classList.add("active");
            exploreOptCtrl.options[exploreOptCtrl.preOption].classList.remove("active");
            exploreOptCtrl.preOption = n;
        }
        this.show(n);
    },
    show:function (n) {
        var a1 = $("#eoContent");
        var a2 = $("#byFilm");
        var a3 = $("#byKeyword");
        switch(n){
            case '0':
                showPoints(map);
                a1.animate({opacity:'0'},300);
                a1.css("visibility","hidden");
                a2.css({visibility:"hidden"});
                a3.css({visibility:"hidden"});
                break;
            case '1':
                a1.css("visibility","visible");
                a2.css({visibility:"visible",top:"0"});
                a3.css({visibility:"hidden",top:"-100%"});
                a1.animate({opacity:'1'},300);
                break;
            case '2':
                a1.css("visibility","visible");
                a2.css({visibility:"hidden",top:"-100%"});
                a3.css({visibility:"visible",top:"0"});
                a1.animate({opacity:1,transform:"scale(1)",webkitTransform:"scale(1)"},300);
                break;
            default:
                alert("Something goes wrong about explore-options-control.")
        }
    },
    hide:function () {
        exploreMode(false);
        var a1 = $("#eoContent");
        var a2 = $("#byFilm");
        var a3 = $("#byKeyword");
        a1.css("visibility","hidden");
        a2.css({visibility:"hidden"});
        a3.css({visibility:"hidden"});
    }
};
var fSelectCtrl = {
    selects:$(".f-select"),
    init:function (m){
        this.map = m;
        this.selects.bind('click',function (e) {
            e.stopPropagation();
            $(this).children().filter(".content").css("visibility","visible");
            if($(this).attr("id")=="allFilms") getAllFilmDB();
        });
        this.selects.children().children().children().filter("li").bind("click",function (e) {
            e.stopPropagation();
            $(this).parent().parent().parent().children().filter('.f-selected').text($(this).text());
            $(this).parent().parent().parent().children().filter('.content').css("visibility","hidden");
        })
    }
};
function getAllFilmDB(){
    $.ajax({
        url:"getAllFilms.php",
        dataType:"json",
        success:function (data) {
            function compare(w1,w2) {
                return w1.filmtitle.localeCompare(w2.filmtitle,"ch");
            }
            var options = "";
            data.sort(compare);
            for(var i=0;i<data.length;i++){
                options += "<li data-index='" + data[i].filmid+
                    "'>" + data[i].filmtitle +
                    "</li>"
            }
            $("#allFilms ul").html(options);
            $("#allFilms li").on("click",function (e) {
                e.stopPropagation();
                $(this).parent().parent().parent().children().filter('.f-selected').text($(this).text());
                $(this).parent().parent().parent().children().filter('.content').css("visibility","hidden");
                getPointsByFilmId($(this).attr("data-index"),fSelectCtrl.map);
            })
        }
    })
}
function signup() {
    var usr = document.getElementById("usr-main").value;
    var pass = document.getElementById("pass-main").value;
    var passre = document.getElementById("passre-main").value;
    var ureg = /^[\u4e00-\u9fff\w]{4,25}$/;
    var preg = /^[a-zA-Z0-9]{4,16}$/;
    if(!usr||!pass) alert("请输入用户名和密码！");
    else if(!passre) alert("请确认密码！");
    else if(!ureg.test(usr)) alert("不合法的用户名,请不要包含特殊符号！");
    else if(!preg.test(pass)) alert("不合法的密码！");
    else if(pass!=passre) alert("两次输入不一致！");
    else{
        var loading = document.getElementById("loading");
        loading.style.visibility = "visible";
        $.ajax({
            url:"signup.php",
            data:{
                username:usr,
                password:pass
            },
            dataType:"json",
            success:function (data) {
                if(data.result=="success"){
                    Cookies.set("FMTUser",usr,{expires:1,path:''});
                    document.getElementById("username").innerText = usr;
                    username = usr;
                    userID = data.id;
                    showCInfonWin(data.id,usr);
                }
                else alert(data.result);
                loading.style.visibility = "hidden";
            }
        })
    }
}
function login(){
    var usr = document.getElementById("usr-main").value;
    var pass = document.getElementById("pass-main").value;
    if(!usr||!pass) alert("请输入账号或密码");
    else{
        var loading = document.getElementById("loading");
        loading.style.visibility = "visible";
        $.ajax({
            url:"login.php",
            data:{
                userid:usr,
                password:pass
            },
            dataType:"json",
            success:function (data) {
                if(data.result=="success"){
                    Cookies.set("FMTUser",data.username,{expires:1,path:''});
                    document.getElementById("loginOverlyMain").style.visibility = "hidden";
                    notice.showDialog("\n欢迎回来，"+data.username+"!\n");
                    document.getElementById("username").innerText = data.username;
                    username = data.username;
                    userID = data.id;
                }
                else alert(data.result);
                loading.style.visibility = "hidden";
            }
        })
    }
}
function logout(){
    Cookies.set("FMTUser","####",{expires:1,path:''});
    location.reload(true);
}
function showCInfonWin(id,usr){
    var imsg = $("#IMsg");
    var iuser = $("#IUser");
    var h = "<h4>你的FMT ID是：<strong style=\"font-size: 1.5em\">" +
        id +
        "</strong>,请记住此ID，完善一下你的个人信息吧~</h4>";
    imsg.html(h);
    iuser.val(usr);
    document.getElementById("loginMain").style.visibility="hidden";
    document.getElementById("completeInfo").style.visibility="visible";
}
function completeInfo(){
    var isex = $("#ISex");
    var idate = $("#IDate");
    var iaddr = $("#IAddress");
    var intro = $("#ISIntroduction");
    var cbtn = $("#cbtn");
    var clogo = $("#cbtn li");
    cbtn.html("<li></li>提交中...");
    clogo.addClass("fa fa-spinner fa-pulse fa-fw");
    $.ajax({
        url:"completeInfo.php",
        data:{
            sex:isex.val(),
            birthday:idate.val(),
            address:iaddr.val(),
            introduction:intro.val(),
            userid:userID
        },
        success:function (data) {
            if(data=="success"){
                clogo.removeClass("fa fa-spinner fa-pulse fa-fw");
                document.getElementById("loginOverlyMain").style.visibility = "hidden";
                document.getElementById("completeInfo").style.visibility="hidden";
                notice.showDialog("\n欢迎来到FMT~"+username);
            }
            else alert(data);
        }
    })
}
function ctrlInit(m){
    navCtrl.init();
    userCenterCtrl.init();
    exploreOptCtrl.init();
    fSelectCtrl.init(m);
}
