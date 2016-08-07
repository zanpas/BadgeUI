<?php
   header("Access-Control-Allow-Origin: *");
   header("Content-Type: application/json; charset=UTF-8");
   
   $servername = "alessandroscarlato.it.mysql.service.one.com";
   $username = "alessandroscarl";
   $password = "Alex87100";
   $dbname = "alessandroscarl";

   // Create connection
   $conn = mysqli_connect($servername,$username,$password,$dbname);
   // Check connection
   if (!$conn) {
       die("Connection failed: " . mysqli_connect_error());
   }
    
    $data = json_decode(file_get_contents("php://input"));
    // Escaping special characters from submitting data & storing in new variables.

	$nome = $data->nome;
	$surname = $data->cognome;
	$password = $data->password;
	$profile = $data->profilo;

    $result = $conn->query("INSERT INTO  Users (firstname, lastname, username , password , profile)
	VALUES ('$nome', '$surname', '$username', '$password', '$profile')");


    $conn->close();
   

?>

