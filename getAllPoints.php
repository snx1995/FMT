 <?php
    /**
     * Created by IntelliJ IDEA.
     * User: Snxt
     * Date: 2017/11/10
     * Time: 19:43
     */
    $servername = "localhost";
    $username = "root";
    $password = "123456789";
    $dbname = "fmt";

    $conn = new mysqli($servername,$username,$password,$dbname);

    if($conn->connect_error){
        die("Connection failed: ".$conn->connect_error);
    }

    $sql = "select * from points";
    $result = $conn->query($sql);

    $json = array();

    if($result->num_rows>0){
        while($row = $result->fetch_assoc()){
            $point = array(
                "id"=>$row["id"],
                "posx"=>$row["posx"],
                "posy"=>$row["posy"],
                "user"=>$row["user"],
            );
            $json[]=$point;
        }
    }

    $conn->close();
    echo json_encode($json);
