<?php
/**
 * Created by IntelliJ IDEA.
 * User: Snxt
 * Date: 2017/12/7
 * Time: 16:06
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

$sql = "select pointid from stories where filmid=".$filmid;

$result = $conn->query($sql);
$points = array();

if($result->num_rows>0){
    while($row = $result->fetch_assoc()){
        $points[] = $row["pointid"];
    }
}
$points = array_unique($points);
sort($points);

$ps = array();

for($i=0;$i<count($points);$i++){
    $sql = "select * from points where id=".$points[$i];
    $r = $conn->query($sql);
    if($r->num_rows>0){
        $row = $r->fetch_assoc();
        $p = array(
            "id"=>$row["id"],
            "posx"=>$row["posx"],
            "posy"=>$row["posy"],
            "user"=>$row["user"],
        );
        $ps[] = $p;
    }
}
echo json_encode($ps);
