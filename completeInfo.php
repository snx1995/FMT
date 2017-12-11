<?php
/**
 * Created by IntelliJ IDEA.
 * User: Snxt
 * Date: 2017/12/10
 * Time: 15:21
 */
$servername = "localhost";
$username = "root";
$password = "123456789";
$dbname = "fmt";

$conn = new mysqli($servername,$username,$password,$dbname);

if($conn->connect_error){
    die("Connection failed: ".$conn->connect_error);
}
$sex = $_GET["sex"];
$birthday = $_GET["birthday"];
$address = $_GET["address"];
$intro = $_GET["introduction"];
$userid = $_GET["userid"];
if($birthday!="") $sql = "update users set sex=".$sex.",birthday='".$birthday."',address='".$address."',selfIntro='".$intro."' where userid=".$userid;
else $sql = "update users set sex=".$sex.",address='".$address."',selfIntro='".$intro."' where userid=".$userid;
if($conn->query($sql)!==true){
    echo $conn->error;
}
else{
    echo "success";
}
