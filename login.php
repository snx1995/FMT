<?php
/**
 * Created by IntelliJ IDEA.
 * User: Snxt
 * Date: 2017/11/10
 * Time: 15:42
 */
    $servername = "localhost";
    $username = "root";
    $password = "950714";
    $dbname = "fmt";

    $conn = new mysqli($servername,$username,$password,$dbname);

    if($conn->connect_error){
        die("Connection failed: ".$conn->connect_error);
    }

    $username = $_GET["username"];
    $password = $_GET["password"];

    $sql = "select password from users where username='".$username."'";
    $result = $conn->query($sql);
    $realpasswd = "";
    if($result->num_rows>0){
        $row = $result->fetch_assoc();
        $realpasswd = $row["password"];
    }

    if($password===$realpasswd){
        echo "success";
    }
    else{
        echo "用户名或密码错误！！";
    }
