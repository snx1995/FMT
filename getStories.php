<?php
/**
 * Created by IntelliJ IDEA.
 * User: Snxt
 * Date: 2017/11/12
 * Time: 18:39
 */

    $servername = "localhost";
    $username = "root";
    $password = "950714";
    $dbname = "fmt";

    $conn = new mysqli($servername,$username,$password,$dbname);


    if($conn->connect_error){
        die("Connection failed: ".$conn->connect_error);
    }

    $pointid = $_GET["id"];

    $sql = "select * from stories where pointid=".$pointid;

    $result = $conn->query($sql);

    $stories = array();

    if($result->num_rows>0){
        while ($row=$result->fetch_assoc()){
            $story = array(
                "filmid"=>$row["filmid"],
                "placedes"=>$row["placedes"],
                "detailds"=>$row["details"],
                "keywords"=>$row["keywords"],
                "user"=>$row["user"],
                "pointid"=>$row["pointid"]
            );
            $stories[]=$story;
        }
    }
    echo json_encode($stories);