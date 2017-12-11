<?php
/**
 * Created by IntelliJ IDEA.
 * User: Snxt
 * Date: 2017/11/10
 * Time: 15:42
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
    $password = $_GET["password"];

    $sql = "select * from users where userid='".$userid."'";
    $result = $conn->query($sql);
    $realpasswd = "";
    if($result->num_rows>0){
        $row = $result->fetch_assoc();
        $realpasswd = $row["password"];
        $user = $row["username"];
    }
    $response = array();
    if($password===$realpasswd){
        $response = array(
            "id"=> $userid,
            "result"=>"success",
            "username"=>$user,
        );
    }
    else{
        $response["result"] = "账号或密码错误！！";
    }

    echo json_encode($response);
