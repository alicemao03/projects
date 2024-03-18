<?php

	require 'calDatabase.php';


	// login_ajax.php

	header("Content-Type: application/json"); // Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json

	//Because you are posting the data via fetch(), php has to retrieve it elsewhere.
	$json_str = file_get_contents('php://input');
	//This will store the data into an associative array
	$json_obj = json_decode($json_str, true);

	//Variables can be accessed as such:
	$first_name = $json_obj['first_name'];
	$last_name = $json_obj['last_name'];
	$username = $json_obj['username'];
	$email = $json_obj['email'];
	$pwd = $json_obj['pwd'];
	$pwd_check = $json_obj['pwd_check'];

	//This is equivalent to what you previously did with $_POST['username'] and $_POST['password']

	// Check to see if the username and password are valid.  (You learned how to do this in Module 3.)
	$registered = false;


	$password = password_hash($pwd, PASSWORD_DEFAULT);

	if (!password_verify($pwd_check, $password)) {
		echo json_encode(array(
			"success" => false,
			"message" => "Passwords Do Not Match"
		));
		exit;
	}

	// CHECK IF USERNAME IS ALREADY TAKEN
	$stmt = $mysqli->prepare("SELECT COUNT(*) FROM users WHERE username=?");

	$user = $_POST['username'];
	$stmt->bind_param('s', $username);
	$stmt->execute();

	$stmt->bind_result($cnt);
	$stmt->fetch();
	$stmt->close();

	if ($cnt > 0) {
		echo json_encode(array(
			"success" => false,
			"message" => "Username Taken"
		));
		exit;
	}


	// CHECK IF EMAIL IS ALREADY TAKEN
	$stmt = $mysqli->prepare("SELECT COUNT(*) FROM users WHERE email=?");

	$stmt->bind_param('s', $email);
	$stmt->execute();

	$stmt->bind_result($cnt);
	$stmt->fetch();
	$stmt->close();

	if ($cnt > 0) {
		echo json_encode(array(
			"success" => false,
			"message" => "Email Taken"
		));
		exit;
	}

	// ADDING NEW USER TO USERS

	$stmt = $mysqli->prepare("insert into users (first_name, last_name, username, email, password) values (?, ?, ?, ?, ?)");

	if (!$stmt) {
		printf("Query Prep Failed: %s\n", $mysqli->error);
		exit;
	}

	$stmt->bind_param('sssss', $first_name, $last_name, $username, $email, $password);
	if($stmt->execute()) {
		$registered = true;
	}
	$stmt->close();

	if($registered == true){
		echo json_encode(array(
			"success" => true
		));
		exit;
	}else{
		echo json_encode(array(
			"success" => false,
			"message" => "Registration Failed"
		));
		exit;
	}
?>