<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$servername = "alessandroscarlato.it.mysql.service.one.com";
$username = "alessandroscarl";
$password = "Alex87100";
$dbname = "alessandroscarl";

// Create connection
$conn = mysqli_connect($servername,$username,$password,$dbname);

$data = json_decode(file_get_contents("php://input"));
$new = mysql_real_escape_string($conn,$data->pass);


$result = $conn->query("UPDATE Users SET password='$new' WHERE username = 'super_user'");

echo($result);

$conn->close();

?>