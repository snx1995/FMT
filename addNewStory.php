<?php
/**
 * Created by IntelliJ IDEA.
 * User: Snxt
 * Date: 2017/11/13
 * Time: 15:11
 */
    $servername = "localhost";
    $username = "root";
    $password = "123456789";
    $dbname = "fmt";

    $conn = new mysqli($servername,$username,$password,$dbname);

    if($conn->connect_error){
        die("Connection failed: ".$conn->connect_error);
    }

    $filmid = $_GET["filmid"];
    $placedes = $_GET["placedes"];
    $details = $_GET["details"];
    $keywords = $_GET["keywords"];
    $user = $_GET["user"];
    $pointid = $_GET["pointid"];
    $filmtitle = $_GET["filmtitle"];

    $sql = "insert into stories(filmid,placedes,details,keywords,user,pointid,filmtitle)values(".$filmid.",'".$placedes."','".$details."','".$keywords."','".$user."',".$pointid.",'".$filmtitle."')";

    if($conn->query($sql)!==true) echo $sql;
    else{
        echo "success";
    }