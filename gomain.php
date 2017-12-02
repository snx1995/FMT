<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>跟着电影去旅行</title>
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="css/font-awesome.min.css">
    <link rel="stylesheet" href="css/fmt.css">
</head>
<body>
<header>

</header>
    <div class="map-content">
        <div class="side-menu">
            <div class="menu-side">
                <img src="img/menuSideImg.png" class="menu-side-img" alt="1">
            </div>
            <div class="menu-item">
                <div class="user-picture">
                    <img src="img/userPicTmp.png" alt="Your avatar">
                    <div class="user-overly"></div>
                    <h3 id="username">
                        <?php
                            $username = $_GET["username"];
                            echo $username;
                        ?>
                    </h3>
                    <a href="#" class="my-btn" onclick="jumpAndClose('tips','my-slide-down','my-slide-down-re')"></a>
                </div>
                <ul class="nav">
                    <li>
                        <div class="menu-option">
                            <div class="overly">
                                <a href="#" class="my-btn" onclick="jumpAndClose('info','my-fade','my-fade-reverse')"></a>
                            </div>
                            <img src="img/menuTmp1.png" class="option-img" alt="1">
                        </div>
                    </li>
                    <li>
                        <div class="menu-option">
                            <div class="overly">
                                <a href="#" class="my-btn" onclick="jumpClose('info','my-fade-reverse')"></a>
                            </div>
                            <img src="img/menuTmp2.png" class="option-img" alt="1">
                        </div>
                    </li>
                    <li>
                        <div class="menu-option">
                            <div class="overly">
                                <a href="#" class="my-btn" onclick="jump('info','my-fade')"></a>
                            </div>
                            <img src="img/menuTmp3.png" class="option-img" alt="1">
                        </div>
                    </li>
                    <li>
                        <div class="menu-option">
                            <div class="overly">
                                <a href="#" class="my-btn" onclick="jump('routeBrowser','side-sld',true)"></a>
                            </div>
                            <img src="img/menuTmp4.png" class="option-img" alt="1">
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="map-region">
            <div class="jump-window route-browser window-radius" id="routeBrowser">
                <div class="window-header">
                    <h1>浏览路线</h1>
                    <a class="btn glyphicon glyphicon-remove b-close" onclick="jumpClose('routeBrowser','side-sld-re')"></a>
                </div>
                <div>
                    <form>
                        <input type="text" class="form-control input-sm route-input" placeholder="搜地点">
                        <input type="text" class="form-control input-sm route-input" placeholder="搜电影">
                        <label for="mine">我的</label>
                        <input type="radio" class="my-radio" checked name="routeKind" value="mine" id="mine">
                        <label for="all">所有人</label>
                        <input type="radio" class="my-radio" name="routeKind" value="all" id="all">
                    </form>
                </div>
                <div class="items-content" id="paths">

                </div>
            </div>
            <div class="jump-window search-result" id="searchResult">
            </div>
            <div class="jump-window window-lg abs-center" id="movieInfo">
                <div class="window-header">
                    <a class="btn glyphicon glyphicon-remove b-close" onclick="jumpClose('movieInfo','my-fade-reverse')"></a>
                    <h1>电影详情</h1>
                </div>
                <div class="movieInfoContent">
                    <table class="table">
                        <tr><td colspan="3"><h1 id="movieTitle" style="text-align: center"></h1></td></tr>
                        <tr>
                            <td rowspan="6"><img src="" onerror="imgLoadError(this)" alt="1" id="moviePic" class="movieInfoPic" style="width: 225px;height: 300px"></td>
                            <td>导演：</td>
                            <td id="movieDirectors"></td>
                        </tr>
                        <tr>
                            <td>主演：</td>
                            <td id="movieCasts"></td>
                        </tr>
                        <tr>
                            <td>类型：</td>
                            <td id="movieGenres"></td>
                        </tr>
                        <tr>
                            <td>地区：</td>
                            <td id="movieCountry"></td>
                        </tr>
                        <tr>
                            <td>年代：</td>
                            <td id="movieYear">2017</td>
                        </tr>
                        <tr>
                            <td>豆瓣评分：</td>
                            <td id="movieRating">9.0</td>
                        </tr>
                        <tr>
                            <td colspan="3">
                                <p id="movieSummary"></p>
                            </td>
                        </tr>
                    </table>
                    <button class="btn btn-default btn-lg" onclick="confirmMovie()" style="margin: 0 auto;display: block">就是他</button>
                </div>
            </div>
            <div class="jump-window window-warning" id="tips">
                <div class="tip-close" onclick="jumpClose('tips','my-slide-down-re')">
                    <img src="img/close-icon-black.png" class="abs-center" alt="">
                </div>
                <div class="msg-board" id="msgBoard"><p id="msg" class="abs-center"></p></div>
            </div>
            <div class="jump-window abs-center window-md window-radius" style="background-color: rgba(255,255,255,0.8);" id="info">
                <div class="window-header">
                    <h1>在这里发生了那些情节呢？</h1>
                    <a class="btn glyphicon glyphicon-remove b-close" onclick="jumpClose('info','my-fade-reverse',true)"></a>
                </div>
                <div class="window-content" style="background-color: rgba(255,255,255,0)">
                    <h2 id="selectedFilm" style="display: block;width: 100%;height: 50px;text-align: center;line-height: 50px">机器人九号</h2>
                    <div style="width: 100%;height: 60%;">
                        <img src="img/3.jpg" onerror="imgLoadError(this)" class="story-pic" id="newFilmPic">
                        <div>
                            <div style="width: 100%;height: 30px">
                                <span style="font-size: 18px;float: left;text-align: center">坐标：</span>
                                <input type="text" id="pos_x" class="form-control input-md" readonly style="float: left;width: 35%;margin-left: 10px;">
                                <input type="text" id="pos_y" class="form-control input-md" readonly style="float: left;width: 35%;margin-left: 10px;">
                            </div>
                            <input type="text" class="form-control input-lg bg-transparent" id="placeDescription" style="margin-top: 20px;" placeholder="Place description here...">
                            <textarea class="form-control bg-transparent" id="storyDetails" cols="30" rows="7" style="width: 100%;" placeholder="The story details here..."></textarea>
                        </div>
                    </div>
                    <input type="text"class="form-control input-lg bg-transparent" id="keyword" style="margin-top: 20px;" placeholder="输入关键词，以空格分割">
                    <div style="width: 100%;padding-top: 20px;">
                        <button style="margin:auto;display: block" class="b-btn b-blue b-md" onclick="addNewPoint()">确认</button>
                    </div>
                </div>

            </div>
            <div class="jump-window abs-center window-md window-radius" style="background-color: rgba(255,255,255,0.8);" id="newStory">
                <div class="window-header">
                    <h1>你知道的新故事是什么呢？</h1>
                    <a class="btn glyphicon glyphicon-remove b-close" onclick="jumpClose('newStory','my-fade-reverse',true)"></a>
                </div>
                <div class="window-content" style="background-color: rgba(255,255,255,0)">
                    <h2 id="filmOfStory" style="display: block;width: 100%;height: 50px;text-align: center;line-height: 50px">机器人九号</h2>
                    <div style="width: 100%;height: 60%;">
                        <img src="img/3.jpg" onerror="imgLoadError(this)" class="story-pic" id="filmPicOfStory">
                        <div>
                            <div style="width: 100%;height: 30px">
                                <span style="font-size: 18px;float: left;text-align: center">坐标：</span>
                                <input type="text" id="pos_xNew" class="form-control input-md" readonly style="float: left;width: 35%;margin-left: 10px;">
                                <input type="text" id="pos_yNew" class="form-control input-md" readonly style="float: left;width: 35%;margin-left: 10px;">
                            </div>
                            <input type="text" class="form-control input-lg bg-transparent" id="placeDescriptionNew" style="margin-top: 20px;" placeholder="Place description here...">
                            <textarea class="form-control bg-transparent" id="storyDetailsNew" cols="30" rows="7" style="width: 100%;" placeholder="The story details here..."></textarea>
                        </div>
                    </div>
                    <input type="text" class="form-control input-lg bg-transparent" id="keywordNew" style="margin-top: 20px;" placeholder="输入关键词，以空格分割">
                    <div style="width: 100%;padding-top: 20px;">
                        <button style="margin:auto;display: block" class="b-btn b-blue b-md" onclick="confirmNewStory()">确认</button>
                    </div>
                </div>

            </div>
            <div class="jump-window abs-center window-radius window-path" id="addNewPath">
                <div class="window-header" style="height: 50px">
                    <h3>简单描述一下您的路线吧~</h3>
                    <a class="btn glyphicon glyphicon-remove b-close" onclick="jumpClose('addNewPath','my-fade-reverse',true)"></a>
                </div>
                <div class="window-content">
                    <textarea class="form-control" id="newPathDesc" cols="30" rows="5" placeholder="说点什么吧"></textarea>
                    <button class="b-btn b-grey b-md" style="display: block;margin: 30px auto;" onclick="route.submit()">写好了~</button>
                </div>
            </div>
            <div class="jump-window movie-select" id="movieSelect">
                <h4 id="movieInUse">If you see this, something goes wrong. Refresh and try again.</h4>
            </div>
            <div class="story-detail" id="storyDetailWindow">
                <h3></h3>
                <h5></h5>
                <span></span>
                <p></p>
                <span></span>
            </div>
            <div class="f-header">
                <div class="adapter">
                    <img src="img/logo.png" class="f-logo">
                    <div class="f-options" data-index="0">
                        <h3 style="">个人中心</h3>
                        <div></div>
                    </div>
                    <div class="f-options active" data-index="1">
                        <h3 style="">地图</h3>
                        <div></div>
                    </div>
                    <div class="f-options" data-index="2">
                        <h3 style="">动态</h3>
                        <div></div>
                    </div>
                    <div class="f-options" data-index="3">
                        <h3 style="">关于FMT</h3>
                        <div></div>
                    </div>
                    <div class="f-user">
                        <img src="img/userFront.png">
                    </div>
                    <div class="f-search">
                        <input type="text" class="form-control" id="search">
                        <div>
                            <img src="img/searchB1.png" onclick="searchMovie(document.getElementById('search').value)">
                        </div>
                    </div>
                </div>
            </div>
            <div id="about">
                <div class="content">
                </div>
            </div>
            <div id="dynamicInfo">
                <div class="duser">

                </div>
                <div class="dinfo">
                    <div class="header">
                        <h4 class="title">用户动态</h4>
                        <i class="fa fa-refresh fa-2x b-refresh"></i>
                    </div>
                </div>
            </div>
            <div id="userCenter">
                <div style="width: 100%;min-height: 150px;overflow: hidden">
                    <img src="img/userCenter.png" class="img-responsive">
                </div>
                <div class="uc-content">
                    <div class="uco-content">
                        <div class="user-center-header">
                            <h4>个人中心</h4>
                        </div>
                        <div class="user-center-btn active" data-index="0">
                            <h4><i class="fa fa-home">&nbsp;&nbsp;</i>首页</h4>
                        </div>
                        <div class="user-center-btn" data-index="1">
                            <h4><i class="fa fa-user">&nbsp;&nbsp;</i>我的信息</h4>
                        </div>
                        <div class="user-center-btn" data-index="2">
                            <h4><i class="fa fa-heart">&nbsp;&nbsp;</i>我的关注</h4>
                        </div>
                        <div class="user-center-btn" data-index="3">
                            <h4><i class="fa fa-map-marker">&nbsp;&nbsp;</i>我的地点</h4>
                        </div>
                        <div class="user-center-btn" data-index="4">
                            <h4><i class="fa fa-book">&nbsp;&nbsp;</i>我的故事</h4>
                        </div>
                        <div class="user-center-btn" data-index="5">
                            <h4><i class="fa fa-map-signs">&nbsp;&nbsp;</i>我的路线</h4>
                        </div>
                        <div class="user-center-btn" data-index="6">
                            <h4><i class="fa fa-shield">&nbsp;&nbsp;</i>账号管理</h4>
                        </div>
                        <div class="user-center-btn" data-index="7">
                            <h4><i class="fa fa-share">&nbsp;&nbsp;</i>分享</h4>
                        </div>
                    </div>
                    <div class="uci-header">
                        <h4>首页</h4>
                    </div>
                    <div class="uci-content" id="uciContent">

                    </div>
                </div>
            </div>
            <div id="googleMap"></div>
            <div id="shade"></div>
            <div id="mapOptions">
                <div>
                    <img src="img/exploreBtn.png" alt="1" onclick="changeMode('exploring',pointsAdded)" title="浏览模式">
                    <img src="img/routeBtn.png" alt="1" onclick="changeMode('route',pointsAdded)" title="路径模式">
                    <img src="img/routeExplore.png" alt="1" onclick="changeMode('routeExplore',pointsAdded)" title="看看大家分享的路线">
                    <img src="img/addBtn2.png" alt="1" onclick="changeMode('add',pointsAdded)" title="标记新的地点">
                </div>
            </div>
        </div>
    </div>
    <script src="js/jquery-3.2.1.min.js"></script>
    <script src="http://maps.google.cn/maps/api/js?key=AIzaSyBXUVPlSWsNh2fpMJYsjur-zHd8n04vDVM"></script>
    <script src="js/fmt.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script>
        document.onmousemove = storyDetailsWindow;
        var map;
        var myCenter = new google.maps.LatLng(46.195042108660154,126.73828125);
        var prePath = new google.maps.Polyline();
        var pointsAdded = {
            points:[],
            push:function (p) {
                this.points.push(p);
            },
            clear:function () {
                for(var i=0;i<this.points.length;i++){
                    this.points[i].setVisible(false);
                }
                this.points=[];
            }
        };
        function initialize()
        {
            var mapProp = {
                center:myCenter,
                zoom:5,
                mapTypeId:google.maps.MapTypeId.ROADMAP
            };
            map=new google.maps.Map(document.getElementById("googleMap"), mapProp);
            showPoints(map);
            google.maps.event.addListener(map,'click',function (event) {
                infowindow.close();
                if(mode==="add"){
                    if(movieSelected!==null)
                        placeMaker(event.latLng);
                    else{
                        notice.showDialog("\nPlease choose the movie you want first!");
                    }
                }
            });
        }
        function placeMaker(location) {
            p_x = location.lat();
            p_y = location.lng();
            notice.showDialog("You clicked the position marked \nx: "+p_x+" y: "+p_y);
            var marker = new google.maps.Marker({
                position:location,
                map:map,
                icon:"img/markerCL.png",
                animation:google.maps.Animation.DROP
            });
            pointsAdded.push(marker);
            google.maps.event.addListener(marker,'dblclick',function () {
                if(mode==='add') {
                    marker.setVisible(false);
                    notice.showDialog("\nMarker deleted!\n")
                }else if(mode==='route'){
                    if(arrayContains(route,marker)===-1){
                        route.push(marker);
                    }
                    else{
                        var j = arrayContains(route,marker);
                        var rtmp = [];
                        for(var i=0;i<route.length;i++){
                            if(i!==j) rtmp.push(route[i]);
                        }
                        route=rtmp;
                    }
                    var points = showRoute(map);
                    var myPath = new google.maps.Polyline({
                        path:points,
                        strokeColor:"#00b3ee",
                        strokeOpacity:0.8,
                        strokeWeight:2
                    });
                    prePath.setVisible(false);
                    myPath.setMap(map);
                    prePath=myPath;
                }
            });
            google.maps.event.addListener(marker,'click',function () {
                if(mode==='add') {
                    p_x = marker.position.lat();
                    p_y = marker.position.lng();
                    notice.showDialog("You have selected this marker with position:\n\
                        X: " + marker.position.lat() + " Y: " + marker.position.lng() + "\
                        \nClick here to complete film info!", "addNewPlace")
                }
            });
        }
        google.maps.event.addDomListener(window, 'load', initialize);
    </script>
</body>
</html>