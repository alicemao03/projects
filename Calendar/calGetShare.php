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

    $month = $json_obj['month'];
    $day = $json_obj['day'];
    $year = $json_obj['year'];

    $month = intval($month);
    $day = intval($day);
    $year = intval($year);



    $user_id = $_SESSION['user_id'];

    //$stmt = $mysqli->prepare("SELECT json_object('title', title, 'time', time) FROM events WHERE day=? AND month=? AND year=? AND user_id=?");
    $stmt = $mysqli->prepare("SELECT event_id from share where shared_user_id = ?");

    $stmt->bind_param('i', $user_id);

    if($stmt->execute()) {
        $fetched = true;
    }else{
        
    }

    // Bind the results
    //$stmt->bind_result($json);
    $result = $stmt->get_result();
    
    $row = $result->fetch_assoc();

   

    $resultArray = array();
    
    while($row) {

        array_push($resultArray, $row['event_id']);
    
        $row = $result->fetch_assoc();

    }
    $stmt->close();
    
    

    // Check to see if the username and password are valid.  (You learned how to do this in Module 3.)

    if($fetched == false){
        //echo $json;
        echo json_encode("Failed to get id");
        exit;
    }
    else{
        $resultArrayFinal = array();
        for ($x = 0; ($x <= count($resultArray)); $x++) {
            $currEventID = $resultArray[$x];
            $stmt = $mysqli->prepare("SELECT title, time, event_id, month, day, year FROM events WHERE event_id=? and month=? and year=? and day=? ORDER BY time");
            $fetchedBool = false;
            $stmt->bind_param('iiii', $currEventID, $month, $year, $day);
            $stmt->execute();
            $result = $stmt->get_result();
            $row = $result->fetch_assoc();

                

            while($row) {

                array_push($resultArrayFinal, htmlentities($row['title']), $row['time'], $row['event_id'], $row['month'], $row['day'], $row['year']);
            
                $row = $result->fetch_assoc();

            }
            $stmt->close();

      }
      
      echo json_encode($resultArrayFinal);
      exit;

    }


 
    




?>