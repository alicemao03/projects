<?php
ini_set("session.cookie_httponly", 1);

session_start();


require "calDatabase.php";

header("Content-Type: application/json"); // Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json

//Because you are posting the data via fetch(), php has to retrieve it elsewhere.
$json_str = file_get_contents('php://input');
//This will store the data into an associative array
$json_obj = json_decode($json_str, true);

$added = false;

//Variables can be accessed as such:
$event_id = $json_obj['event_id'];
$title = $json_obj['title'];
$day = $json_obj['day'];
$month = $json_obj['month'];
$year = $json_obj['year'];
$time = $json_obj['time'];
$description = $json_obj['description'];
$user_id = $_SESSION['user_id'];
//This is equivalent to what you previously did with $_POST['username'] and $_POST['password']

$tokenRecieve = $json_obj['token'];
//This is equivalent to what you previously did with $_POST['username'] and $_POST['password']

if(!hash_equals($_SESSION['token'], $tokenRecieve)){
	die("Request forgery detected");
}


$stmt = $mysqli->prepare("update events SET title = ?, day = ?, month = ?, year = ?, time = ?, description = ? WHERE event_id = ? AND user_id = ?");

if (!$stmt) {
    $message = printf("Query Prep Failed: %s\n", $mysqli->error);

    echo json_encode(array(
        "success" => false,
        "message" => $message
    ));
    exit;
}

$stmt->bind_param('siiissii', $title, $day, $month, $year, $time, $description, $event_id, $user_id);
if($stmt->execute()) {
    $added = true;
}
$stmt->close();

if($added == true){
    echo json_encode(array(
        "success" => true
    ));
    exit;
}else{
    echo json_encode(array(
        "success" => false,
        "message" => "Add Failed"
    ));
    exit;
}
?>