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
$event_id = $json_obj['event_id'];
$shared_username = $json_obj['shared_id'];

$og_user_id = $_SESSION['user_id'];


$stmt = $mysqli->prepare("select user_id from users where username = ?");

if (!$stmt) {
    $message = printf("Query Prep Failed: %s\n", $mysqli->error);

    echo json_encode(array(
        "success" => false,
        "message" => $message
    ));
    exit;
}

$stmt->bind_param('s', $shared_username);

$stmt->execute();

// Bind the results
$stmt->bind_result($shared_id);

$stmt->fetch();
$stmt->close();

$shared_user = strval($shared_username);


if($shared_id == $og_user_id){
    echo json_encode(array(
        "success" => false,
        "message" => "You can't share with yourself"
    ));
    exit;
}

else{

    $stmt = $mysqli->prepare("insert into share (event_id, og_user_id, shared_user_id) values (?, ?, ?)");

    if (!$stmt) {
        $message = printf("Query Prep Failed: %s\n", $mysqli->error);
    
        echo json_encode(array(
            "success" => false,
            "message" => $message
        ));
        exit;
    }
    
    
    $stmt->bind_param('iii', $event_id, $og_user_id, $shared_id);
    
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
            "message" => "It is already shared!"
        ));
        exit;
    }
}




?>