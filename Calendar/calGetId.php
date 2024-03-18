<?php
    ini_set("session.cookie_httponly", 1);

    session_start();


    header("Content-Type: application/json"); // Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json

    //Because you are posting the data via fetch(), php has to retrieve it elsewhere.
    $json_str = file_get_contents('php://input');
    //This will store the data into an associative array
    $json_obj = json_decode($json_str, true);

    if($json_obj['request'] == 'userID') {
        if(isset($_SESSION['user_id'])) {

            echo json_encode(array(
                "success" => true,
                "user_id" => $_SESSION['user_id'],
                'username' => htmlentities($_SESSION['username']),
                'token' => $_SESSION['token']
            ));
            exit;
        }
        else {
            echo json_encode(array(
                "success" => false,
                "message" => "user id is not set"
            ));
            exit;
        }


    }

    if($json_obj['request'] == 'logout') {
        session_destroy();
        echo json_encode(array(
            "success" => true,
        ));
        exit;

    }



?>