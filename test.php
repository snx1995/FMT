<?php
/**
 * Created by IntelliJ IDEA.
 * User: Snxt
 * Date: 2017/12/10
 * Time: 14:32
 */

$servername = "localhost";
$username = "root";
$password = "123456789";
$dbname = "fmt";

$conn = new mysqli($servername,$username,$password,$dbname);

if($conn->connect_error){
    die("Connection failed: ".$conn->connect_error);
}

$sql = "select max(userid) from users";

$result = $conn->query($sql);

$row = $result->fetch_assoc();

$response = array();
$response["id"] = 123456;
$response["result"] = "success";
echo json_encode($row);