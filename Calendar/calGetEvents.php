<?php
ini_set("session.cookie_httponly", 1);

session_start();

require "calDatabase.php";

header("Content-Type: application/json"); // Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json

//Because you are posting the data via fetch(), php has to retrieve it elsewhere.
$json_str = file_get_contents('php://input');
//This will store the data into an associative array
$json_obj = json_decode($json_str, true);

$fetched = false;

//Variables can be accessed as such:
$year = $json_obj['year'];
$month = $json_obj['month'];
$day = $json_obj['day'];
$user_id = $_SESSION['user_id'];
//This is equivalent to what you previously did with $_POST['username'] and $_POST['password']

// if($user_id != $_SESSION['user_id']) {
//     echo json_encode(array(
// 		"success" => false,
// 		"message" => "User could not be verified"
// 	));
// 	exit;

// }

//$stmt = $mysqli->prepare("SELECT json_object('title', title, 'time', time) FROM events WHERE day=? AND month=? AND year=? AND user_id=?");
$stmt = $mysqli->prepare("SELECT title, time, event_id FROM events WHERE day=? AND month=? AND year=? AND user_id=? ORDER BY time");

$stmt->bind_param('iiii', $day, $month, $year, $user_id);
if($stmt->execute()) {
    $fetched = true;
}

// Bind the results
//$stmt->bind_result($json);
$result = $stmt->get_result();
$row = $result->fetch_assoc();

$resultArray = array();

while($row) {

    array_push($resultArray, htmlentities($row['title']), $row['time'], $row['event_id']);
   
    $row = $result->fetch_assoc();

}
$stmt->close();


// Check to see if the username and password are valid.  (You learned how to do this in Module 3.)

if($fetched == true){
    //echo $json;
	echo json_encode($resultArray);
    exit;
}else{
	echo json_encode(array(
		"success" => false,
		"message" => "Unknown Error"
	));
	exit;
}
?>