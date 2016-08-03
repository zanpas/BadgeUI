<?php
$servername = "alessandroscarlato.it.mysql.service.one.com";
$username = "alessandroscarl";
$password = "Alex87100";
$dbname = "alessandroscarl";

// Create connection
$conn = mysqli_connect($servername,$username,$password,$dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully";
?>