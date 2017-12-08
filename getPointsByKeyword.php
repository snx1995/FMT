<?php
/**
 * Created by IntelliJ IDEA.
 * User: Snxt
 * Date: 2017/12/7
 * Time: 20:22
 */
$servername = "localhost";
$username = "root";
$password = "123456789";
$dbname = "fmt";
$conn = new mysqli($servername,$username,$password,$dbname);
$keyword = $_GET["keyword"];


$sql = "select * from stories";
$stories = $conn->query($sql);
$pids = array();
if($stories->num_rows>0){
    while($row=$stories->fetch_assoc()){
        $keywords = explode(" ",$row["keywords"]);
        for($i=0;$i<count($keywords);$i++){
            if($keywords[$i]==$keyword){
                $pids[] = $row["pointid"];
                break;
            }
        }
    }
}
$points = array();
for($i=0;$i<count($pids);$i++){
    $sql = "select * from points where id=".$pids[$i];
    $result = $conn->query($sql);
    if($result->num_rows>0){
        $row=$result->fetch_assoc();
        $point = array(
            "id"=>$row["id"],
            "posx"=>$row["posx"],
            "posy"=>$row["posy"],
            "user"=>$row["user"],
        );
        $points[] = $point;
    }
}

$conn->close();

echo json_encode($points);











