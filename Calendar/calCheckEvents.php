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
$day = $json_obj['day'];
$month = $json_obj['month'];
$year = $json_obj['year'];
$user_id = $_SESSION['user_id'];
//This is equivalent to what you previously did with $_POST['username'] and $_POST['password']

$stmt = $mysqli->prepare("SELECT COUNT(*) FROM events WHERE day=? AND month=? AND year=? AND user_id=?");

$stmt->bind_param('iiii', $day, $month, $year, $user_id);

if($stmt->execute()) {
    $fetched = true;
}

// Bind the results
$stmt->bind_result($cnt);
$stmt->fetch();
$stmt->close();

if($fetched == true) {

    if($cnt == 0) {
        echo json_encode(array(
            "success" => false,
            "message" => "No Events"
        ));

    }
    else {
        echo json_encode(array(
            "success" => true,
            "message" => "Events!"
        ));

    }



}
else {
    echo json_encode(array(
        "success" => false,
        "message" => "There was a problem!"
    ));

}
?>