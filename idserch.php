<?php
    $servername = "localhost";
    $username = "root";
    $password = "123456789";
    $dbname = "fmt";
    $conn = new mysqli($servername,$username,$password,$dbname);
    $filmid = $_GET["filmid"];
    if($conn->connect_error){
        die("Connection failed: ".$conn->connect_error);
    }
    $sql = "select * from stories where filmid=".$filmid;
     $result = $conn->query($sql);
     $row = $result->fetch_assoc();
     $film = array(
                "filmid"=>$row["filmid"],
                "placedes"=>$row["placedes"],
                "details"=>$row["details"],
                "keywords"=>$row["keywords"],
                "user"=>$row["user"],
                "pointid"=>$row["pointid"]
            );
     $films=array();
     $films[]=$film;
    echo json_encode($films);
     /*$sql2 = "select * from points where id='".$filmid."'";
     $result = $conn->query($sql2);
     $row = $result->fetch_assoc();
    echo $row ['id'].''. $row ['posx'].''. $row ['posy'].''. $row ['user'];*/
    $conn->close();
    
