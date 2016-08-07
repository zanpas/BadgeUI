<?php
    header('Access-Control-Allow-Origin: *'); 
    header("Content-Type: application/json; charset=UTF-8");
    header('Access-Control-Allow-Methods: POST,GET,OPTIONS');
    header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
    
    $data = json_decode(file_get_contents("php://input"));
    
    $servername = "alessandroscarlato.it.mysql.service.one.com";
    $username = "alessandroscarl";
    $password = "Alex87100";
    $dbname = "alessandroscarl";
    
    // Create connection
   $conn = mysqli_connect($servername,$username,$password,$dbname);
    
     
  // $p = mysql_real_escape_string($data->pass);
    
    
    $result = $conn->query("UPDATE Users SET password='$data->pass' WHERE username = 'super_user'");
    
    echo($result);
    
    $conn->close();

?>