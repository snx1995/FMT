<?php
/**
 * Created by IntelliJ IDEA.
 * User: Snxt
 * Date: 2017/12/10
 * Time: 16:05
 */
$servername = "localhost";
$username = "root";
$password = "123456789";
$dbname = "fmt";

$conn = new mysqli($servername,$username,$password,$dbname);

if($conn->connect_error){
    die("Connection failed: ".$conn->connect_error);
}

$userid = $_GET["userid"];

$sql = "select * from users where userid=".$userid;
$result = $conn->query($sql);
$response = array();
if($result->num_rows>0){
    $row = $result->fetch_assoc();
    $response["username"] = $row["username"];
    $response["userid"] = $row["userid"];
    $response["birthday"] = $row["birthday"];
    $response["sex"] = $row["sex"];
    $response["address"] = $row["address"];
    $response["selfIntro"] = $row["selfIntro"];
    $response["result"] = "success";
}else $response["result"] = "Np user found!";

echo json_encode($response);