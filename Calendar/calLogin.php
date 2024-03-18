<?php

require "calDatabase.php";

header("Content-Type: application/json"); // Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json

//Because you are posting the data via fetch(), php has to retrieve it elsewhere.
$json_str = file_get_contents('php://input');
//This will store the data into an associative array
$json_obj = json_decode($json_str, true);

//Variables can be accessed as such:
$username = $json_obj['loginUsername'];
$password = $json_obj['loginPassword'];
//This is equivalent to what you previously did with $_POST['username'] and $_POST['password']
$verified = false;


$stmt = $mysqli->prepare("SELECT COUNT(*), password, user_id FROM users WHERE username=?");

$stmt->bind_param('s', $username);
$stmt->execute();

// Bind the results
$stmt->bind_result($cnt, $pwd_hash, $user_id);
$stmt->fetch();
$stmt->close();

$pwd_guess = $password;

if($cnt == 1 && password_verify($pwd_guess, $pwd_hash)) {
    $verified = true;
}

// Check to see if the username and password are valid.  (You learned how to do this in Module 3.)

if($verified == true){
	ini_set("session.cookie_httponly", 1);
	session_start();
	$_SESSION['username'] = htmlentities($username);
    $_SESSION['user_id'] = $user_id;
	$_SESSION['token'] = bin2hex(openssl_random_pseudo_bytes(32)); 

	echo json_encode(array(
		"success" => true,
		"user_id" => $_SESSION['user_id'],
		"token" => $_SESSION['token']
	));
	exit;
}else{
	echo json_encode(array(
		"success" => false,
		"message" => "Incorrect Username or Password"
	));
	exit;
}
?>