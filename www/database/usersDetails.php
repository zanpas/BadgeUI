<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$servername = "alessandroscarlato.it.mysql.service.one.com";
$username = "alessandroscarl";
$password = "Alex87100";
$dbname = "alessandroscarl";

// Create connection
$conn = mysqli_connect($servername,$username,$password,$dbname);

$result = $conn->query("SELECT username , password FROM Users");

$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"firstname":"'  . $rs["firstname"] . '",';
    $outp .= '"lastname":"'  . $rs["lastame"] . '",';
    $outp .= '"username":"'  . $rs["username"] . '",';
    $outp .= '"password":"'. $rs["password"]     . '",';
    $outp .= '"profile":"'. $rs["profile"]     . '"}';
}
$outp ='{"records":['.$outp.']}';
$conn->close();

echo($outp);
?>