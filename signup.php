<?php
/**
 * Created by IntelliJ IDEA.
 * User: Snxt
 * Date: 2017/11/10
 * Time: 14:58
 */
    $servername = "localhost";
    $username = "root";
    $password = "123456789";
    $dbname = "fmt";

    $conn = new mysqli($servername,$username,$password,$dbname);

    if($conn->connect_error){
        die("Connection failed: ".$conn->connect_error);
    }

    $user = $_GET["username"];
    $passwd = $_GET["password"];
    $response = array();
    $sql = "insert into users(username, password)values('".$user."','".$passwd."')";

    if($conn->query($sql)!==true){
        $response["result"] = $conn->error;
    }else{
        $sql = "select max(userid) from users";
        $result = $conn->query($sql);
        if($result->num_rows>0){
            $row = $result->fetch_row();
            $response["id"] = $row[0];
            $response["result"] = "success";
        }
        else{
            $response["result"] = "Get max id error!";
        }
    }


    echo json_encode($response);





