<?php
/**
 * Created by IntelliJ IDEA.
 * User: Snxt
 * Date: 2017/12/5
 * Time: 20:46
 */
$servername = "localhost";
$username = "root";
$password = "123456789";
$dbname = "fmt";

$conn = new mysqli($servername,$username,$password,$dbname);

if($conn->connect_error){
    die("Connection failed: ".$conn->connect_error);
}
$sql = "select * from films";
$result = $conn->query($sql);

$json = array();

if($result->num_rows>0){
    while($row = $result->fetch_assoc()){
        $film = array(
            "filmid"=>$row["filmid"],
            "filmtitle"=>$row["filmtitle"],
        );
        $json[]=$film;
    }
}

$conn->close();
echo json_encode($json);