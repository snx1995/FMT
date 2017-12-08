function getPointsByFilmId(id) {
    $.ajax({
        url:"getPointsByFilmId.php?filmid="+id,
        dataType:"json",
        success:function (data) {
            PointsOnMap.delete();
            for(var i=0;i<data.length;i++){
                var p = new point(data[i].id,data[i].posx,data[i].posy,data[i].user,map);
                PointsOnMap.push(p);
            }
        }
    })
}
function showPoints(){
    $.ajax({
        url:"getAllPoints.php",
        dataType:"json",
        success:function (data){
            PointsOnMap.delete();
            for(var i=0;i<data.length;i++){
                var p = new point(data[i].id,data[i].posx,data[i].posy,data[i].user,map);
                PointsOnMap.push(p);
            }
        }
    })
}