<?php
/**
 * Created by IntelliJ IDEA.
 * User: Snxt
 * Date: 2017/11/10
 * Time: 19:58
 */
    $servername = "localhost";
    $username = "root";
    $password = "zk199707021";
    $dbname = "fmt";

    $conn = new mysqli($servername,$username,$password,$dbname);

    $posx = $_GET["offsetX"];
    $posy = $_GET["offsetY"];
    $filmid = $_GET["filmid"];
    $place = $_GET["placeDescription"];
    $story = $_GET["storyDetails"];
    $keyword = $_GET["keyword"];
    $user = $_GET["username"];

    if($conn->connect_error){
        die("Connection failed: ".$conn->connect_error);
    }
    $sql = "insert into points(posx,posy,user)values(".$posx.",".$posy.",'".$user."')";
    if($conn->query($sql) !== true){
        echo 'Insert into points error: '.$conn->error;
    }
    $pointid=-1;
    $sql = "select * from points where posx=".$posx." and posy=".$posy." and user='".$user."'";
    $result = $conn->query($sql);

    if($result->num_rows>0){
        $row = $result->fetch_assoc();
        $pointid = $row["id"];
    }else{
        echo "0 results";
    }

    $sql = "insert into stories(filmid,placedes,details,keywords,user,pointid)values".
        "(".$filmid.",'".$place."','".$story."','".$keyword."','".$user."',".$pointid.")";

    if($conn->query($sql) !== true){
        echo 'Insert into stories error: '.$conn->error;
    }

    echo "success";

    $conn->close();
