<?php
/**
 * Created by IntelliJ IDEA.
 * User: Snxt
 * Date: 2017/11/13
 * Time: 16:15
 */
    $servername = "localhost";
    $username = "root";
    $password = "123456789";
    $dbname = "fmt";

    $conn = new mysqli($servername,$username,$password,$dbname);

    if($conn->connect_error){
        die("Connection failed: ".$conn->connect_error);
    }

    $storyid = $_GET["storyid"];

    $sql = "select * from stories where storyid=".$storyid;

    $result = $conn->query($sql);

    $story = array();

    if($result->num_rows>0){
        $row = $result->fetch_assoc();
        $story = array(
            "storyid"=>$row["storyid"],
            "filmid"=>$row["filmid"],
            "placedes"=>$row["placedes"],
            "details"=>$row["details"],
            "keywords"=>$row["keywords"],
            "user"=>$row["user"],
            "pointid"=>$row["pointid"],
            "filmtitle"=>$row["filmtitle"],
            "userid"=>$row["userid"],
        );
        echo json_encode($story);
    }
    else{
        echo $sql;
    }