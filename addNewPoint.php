<?php
/**
 * Created by IntelliJ IDEA.
 * User: Snxt
 * Date: 2017/11/10
 * Time: 19:58
 */
    $servername = "localhost";
    $username = "root";
    $password = "123456789";
    $dbname = "fmt";

    $conn = new mysqli($servername,$username,$password,$dbname);

    if($conn->connect_error){
        die("Connection failed: ".$conn->connect_error);
    }

    $posx = $_GET["offsetX"];
    $posy = $_GET["offsetY"];
    $filmid = $_GET["filmid"];
    $place = $_GET["placeDescription"];
    $story = $_GET["storyDetails"];
    $keyword = $_GET["keyword"];
    $user = $_GET["username"];
    $filmtitle = $_GET["filmtitle"];
    $userid = $_GET["userid"];

    $sql = "insert into points(posx,posy,user,userid)values(".$posx.",".$posy.",'".$user."',".$userid.")";
    if($conn->query($sql) !== true){
        echo 'Insert into points error: '.$conn->error;
    }
    $pointid=-1;
    $sql = "select max(id) from points";
    $result = $conn->query($sql);

    if($result->num_rows>0){
        $row = $result->fetch_assoc();
        $pointid = $row["max(id)"];
    }else{
        echo "0 results";
    }

    $sql = "insert into stories(filmid,placedes,details,keywords,user,pointid,filmtitle,userid)values".
        "(".$filmid.",'".$place."','".$story."','".$keyword."','".$user."',".$pointid.",'".$filmtitle."',".$userid.")";

    if($conn->query($sql) !== true){
        echo 'Insert into stories error: '.$conn->error;
    }

    //$sql = "insert into dynamic(user,details,date,time)values("
    $sql = "select * from films where filmid=".$filmid;
    $result = $conn->query($sql);
    if($result->num_rows==0){
        $sql = "insert into films(filmid, filmtitle)VALUES(".$filmid.",'".$filmtitle."')";
        if($conn->query($sql)!==true) echo "Insert into films error";
    }
    echo "success";

    $conn->close();
