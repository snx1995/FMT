<?php
/**
 * Created by IntelliJ IDEA.
 * User: Snxt
 * Date: 2017/12/10
 * Time: 18:15
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
$followid = $_GET["followid"];
$response = array();
if($userid===$followid) $response["result"] = "您不能关注自己哦";
else{
    $sql = "select * from follow where userid=".$userid." and followid=".$followid;
    $result = $conn->query($sql);
    if($result->num_rows>0) $response["result"] = "您已关注过TA~";
    else{
        $sql = "insert into follow(userid, followid)VALUES(".$userid.",".$followid.")";
        if($conn->query($sql)!==true) $response["result"] = $conn->error;
        else{

            $sql = "select * from users where userid=".$followid;
            $result = $conn->query($sql);
            if($result->num_rows>0){
                $row = $result->fetch_assoc();
                $response["follow"] = $row["username"];
                $response["result"] = "success";
            }
            else $response["result"] = "查找用户错误!";
        }
    }
}

echo json_encode($response);
