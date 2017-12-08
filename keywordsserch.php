<?php
/**
 * Created by IntelliJ IDEA.
 * User: Snxt
 * Date: 2017/11/10
 * Time: 19:58
 */
    $servername = "localhost";
    $username = "root";
    $password = "123456789";
    $dbname = "fmt";
    $conn = new mysqli($servername,$username,$password,$dbname);
    $keyword = $_GET["keyword"];

  $result=$conn->query("select * from stories");
  $films = array();
  while($row=$result->fetch_assoc())
  {
     $row1=explode(" ", $row["keywords"]);
     for($i=0; $i<count($row1);$i++)
    {
      if($row1[$i]==$keyword)
        {
            $film = array(
                "filmid"=>$row["filmid"],
                "placedes"=>$row["placedes"],
                "details"=>$row["details"],
                "keywords"=>$row["keywords"],
                "user"=>$row["user"],
                "pointid"=>$row["pointid"]
            );
            $films[]=$film;
        }
     }
  }
  echo json_encode($films);
    $conn->close();













