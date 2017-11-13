<?php
/**
 * Created by IntelliJ IDEA.
 * User: huangxinchi
 * Date: 2017/11/12
 * Time: 12:55
 */
    $servername = "localhost";
    $username = "root";
    $password = "950714";
    $dbname = "fmt";
    $conn = new mysqli($servername,$username,$password,$dbname);
    if($conn->connect_error){
        die("Connection failed: ".$conn->connect_error);
    }
    $sql="select * from path";
    $result = $conn->query($sql);
    $paths = array();
    $pathnum=0;
    while($row = $result->fetch_assoc())//循环所有路径
    {
        $points=array();
        $pointsids = array();
        $pathinfo = $row["pathinfo"];
        for($i=0;$i<strlen($pathinfo);$i+=8)        //将每个pointifo提取成数组
        {
            $pointsids[]=substr($pathinfo,$i,8);
        }
        for($j=0;$j<count($pointsids);$j++)             //循环查找每个点构建path
        {
            $sql2="select * from points where id= ".$pointsids[$j];
            $result2= $conn->query($sql2);
            $row2=$result2->fetch_assoc();
            $point=array(
                "id" => $row2["id"],
                "posx"=> $row2["posx"],
                "posy"=> $row2["posy"],
                "user"=> $row2["user"],
            );
            $points[]=$point;
        }
        $path=array(
            "points"=>$points,
            "user"=>$row["user"],
            "pathdes"=>$row["pathdes"],
        );
        $paths[]= $path;
    }
    $conn->close();
    echo json_encode($paths);