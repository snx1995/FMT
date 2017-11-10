<?php
/**
 * Created by IntelliJ IDEA.
 * User: Snxt
 * Date: 2017/11/10
 * Time: 14:58
 */
    $servername = "localhost";
    $username = "root";
    $password = "950714";
    $dbname = "fmt";

    $conn = new mysqli($servername,$username,$password,$dbname);

    if($conn->connect_error){
        die("Connection failed: ".$conn->connect_error);
    }

    $user = $_GET["username"];
    $passwd = $_GET["password"];

    $sql = "insert into users(username,password)values('".$user."','".$passwd."')";

    if($conn->query($sql)===true){
        echo "success";
    }
    else{
        echo "数据库错误！".$conn->error.$user.$passwd;
    }

