<?php
/**
 * Created by IntelliJ IDEA.
 * User: huangxinchi
 * Date: 2017/11/12
 * Time: 12:37
 */
    $servername = "localhost";
    $username = "root";
    $password = "950714";
    $dbname = "fmt";
    $conn = new mysqli($servername,$username,$password,$dbname);
    if($conn->connect_error){
        die("Connection failed: ".$conn->connect_error);
    }
    $pathinfo=$_GET["pathinfo"];
    $user=$_GET["user"];
    $pathdes=$_GET["pathdes"];
    $sql="insert into path(pathinfo,user,pathdes)values('".$pathinfo."','".$user."','".$pathdes."')";
    if($conn->query($sql)===true){
        echo "success";
    }
    else{
        echo "数据库错误！".$conn->error.$user.$passwd;
    }