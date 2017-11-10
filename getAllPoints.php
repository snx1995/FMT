<!doctype html>
<html>
<head>
    <title>Php mysql test</title>
    <meta charset="utf-8">
</head>
<body>
    <?php
    /**
     * Created by IntelliJ IDEA.
     * User: Snxt
     * Date: 2017/11/10
     * Time: 19:43
     */
    $servername = "localhost";
    $username = "root";
    $password = "950714";
    $dbname = "fmt";

    $conn = new mysqli($servername,$username,$password,$dbname);

    if($conn->connect_error){
        die("Connection failed: ".$conn->connect_error);
    }

    $sql = "select * from points";
    $result = $conn->query($sql);

    if($result->num_rows>0){
        while($row = $result->fetch_assoc()){
            echo "<p> id:".$row["id"]." posx: ".$row["posx"]." posy: ".$row["posy"]." user: ".$row["user"]."</p>";
        }
    }else{
        echo "0 results";
    }
    $conn->close();
    ?>
</body>
</html>

