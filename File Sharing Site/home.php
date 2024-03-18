<!DOCTYPE html>
<html lang="en">

<head>
    <title>Home</title>
    <link rel="stylesheet" type="text/css" href="fileshare.css">
</head>


<body>
    <?php
    /*
    This php function checks that a username has been set and that it is a valid username
    If not, it will redirect to login.php
    */
    session_start();
    if (!isset($_SESSION['username'])) {
        header("Location: login.php");
        exit;
    }

    // look for user
    $h = fopen("/var/www/fileshare/users.txt", "r");
    $found = False;

    while (!feof($h)) {
        $currName = trim(fgets($h));
        if ($currName == $_SESSION['username']) {
            $found = True;
        }
    }

    fclose($h);

    if (!$found) {
        header("Location: login.php"); //redirects to login page
        exit;
    }
    ?>


    <!--Div for username and checkout button, if checkout button is selected, user logout and session end, redirect to login page-->

    <div class="user">
        <?php
        // Prints username
        session_start();
        printf("<b>Hello, %s</b>", $_SESSION['username']);
        ?>

        <!-- Checkout Button -->
        <form class="checkout" method="POST">
            <input class="checkoutButton" type="submit" value="Logout" name="endSession">
        </form>

        <?php
        if (isset($_POST["endSession"])) {
            header("Location: login.php");
            session_destroy();
            exit;
        }
        ?>
    </div>

    <br>
    <hr><br>

    <div class="mainDisplay">
        <div class="fileStuff">
            <!-- Upload form -->
            <div class="upload">
                <b class="title">Upload a file:</b><br>
                <form enctype="multipart/form-data" method="POST">
                    <p>
                        <input type="hidden" name="MAX_FILE_SIZE" value="20000000">
                        <label for="uploadfile_input">Choose a file to upload:</label> <input name="uploadedfile" type="file" id="uploadfile_input">
                    </p>
                    <p>
                        <input class="button" type="submit" value="Upload File" name="upload">
                    </p>
                </form>

                <?php 
                // Upload function
                $name = $_POST["fileName"];
                $action = $_POST["fileAction"];

                if (isset($_POST["upload"])) {
                    $filename = basename($_FILES['uploadedfile']['name']);
                    if (!preg_match('/^[\w_\.\-]+$/', $filename)) {
                        echo "Invalid filename";
                        exit;
                    }

                    // Get the username and make sure it is valid
                    $username = $_SESSION['username'];
                    if (!preg_match('/^[\w_\-]+$/', $username)) {
                        echo "Invalid username";
                        exit;
                    }

                    $full_path = sprintf("/var/www/fileshare/%s/%s", $username, $filename);

                    if (move_uploaded_file($_FILES['uploadedfile']['tmp_name'], $full_path)) {
                        echo "Success!";
                    } else {
                        echo "Failed";
                    }
                }
                ?>
            </div>

            <br>
            <hr><br>


            <!-- Other Actions -->
            <div class="otherActions">
                <form name="file" method="POST">
                    Please enter the name of the file: <input type="text" name="fileName">
                    <br><br>
                    What would you like to do with this file:
                    <div>
                        <label><input type="radio" name="fileAction" value="download">Download File</label>
                        <label><input type="radio" name="fileAction" value="view">View File</label>
                        <label><input type="radio" name="fileAction" value="delete">Delete File</label>
                        <br>
                        <label><input type="radio" name="fileAction" value="share">Share File</label>
                        <label><input type="radio" name="fileAction" value="unshare">Unshare File</label>
                    </div>
                    <br>
                    <input class="button" type="submit" value="Submit" name="submitAction">
                </form>

                <?php
                session_start();

                //checks to see if file exists
                function checkFile($name)
                {
                    $username = $_SESSION['username'];
                    $userArr = $_SESSION['userArray'];
                    $nameArr = array($name);

                    $i = 0;
                    while ($i < count($userArr)) {
                        $currName = $userArr[$i];

                        if ($currName == $username) {
                            $file = sprintf("/var/www/fileshare/%s", $currName);
                        } else {
                            $file = sprintf("/var/www/fileshare/public/%s", $currName);
                        }

                        $userFiles = scandir($file);
                        $result = array_intersect($userFiles, $nameArr);

                        if (count($result) != 0) {
                            if ($currName == $username) {
                                return $file . "/" . $name;
                            }
                        }
                        $i++;
                    }
                    return "not found";
                }

                //checks to see if a file exists in other users' shared directories
                function checkSharedFile($name)
                {
                    $username = $_SESSION['username'];
                    $userArr = $_SESSION['userArray'];
                    $nameArr = array($name);

                    $i = 0;
                    while ($i < count($userArr)) {
                        $currName = $userArr[$i];

                        if ($currName == $username) {
                            $file = sprintf("/var/www/fileshare/%s", $currName);
                        } else {
                            $file = sprintf("/var/www/fileshare/public/%s", $currName);
                        }

                        $userFiles = scandir($file);
                        $result = array_intersect($userFiles, $nameArr);

                        if (count($result) != 0) {
                            if ($currName != $username) {
                                return $file . "/" . $name;
                            }
                        }
                        $i++;
                    }
                    return "not found";
                }
                ?>


                <?php
                //file functions
                if (isset($_POST["submitAction"]) && !empty($action) && !empty($name)) {
                    $username = $_SESSION['username'];
                    switch ($action) {
                        //allows a user to download file in own private directory or other users' shared directories
                        case "download":
                            if (checkFile($name) == "not found") {
                                if (checkSharedFile($name) == "not found") {
                                    echo "Could not find file that was requested";
                                    break;
                                } else {
                                    $file = checkSharedFile($name);
                                }
                            } else {
                                $file = checkFile($name);
                            }

                            //Copied code start URL: https://stackoverflow.com/a/59190377
                            header('Content-type: application/octet-stream');
                            header("Content-Type: " . mime_content_type($file));
                            header("Content-Disposition: attachment; filename=" . $name);
                            while (ob_get_level()) {
                                ob_end_clean();
                            }

                            readfile($file);
                            //Copied code end
                            ob_start(); //used to clean other html code
                            cleanFiles(); //cleans code so only txt from file is read 

                            break;


                        //allows user to view own file or other users' shared file
                        case "view":
                            if (!preg_match('/^[\w_\.\-]+$/', $name)) {
                                echo "Invalid filename";
                                break;
                            }
                            if (!preg_match('/^[\w_\-]+$/', $username)) {
                                echo "Invalid username";
                                break;
                            }

                            if (checkFile($name) == "not found") {
                                if (checkSharedFile($name) == "not found") {
                                    echo "Could not find file that was requested";
                                    break;
                                } else {
                                    $file = checkSharedFile($name);
                                }
                            } else {
                                $file = checkFile($name);
                            }

                            $full_path = sprintf($file);

                            $finfo = new finfo(FILEINFO_MIME_TYPE);
                            $mime = $finfo->file($full_path);


                            header("Content-Type: " . $mime);
                            header('content-disposition: inline; filename="' . $name . '";');

                            //cleans prevous code
                            //Copied code start URL: https://stackoverflow.com/a/59190377
                            while (ob_get_level()) {
                                ob_end_clean();
                            }
                            //Copied code end

                            readfile($full_path);
                            ob_start(); //used to clean other html code
                            cleanFiles(); //cleans code so only txt from file is read 
                            break;


                        //allows user to delete own files in private directory
                        case "delete": 
                            if (checkFile($name) == "not found") {
                                echo "Could not find file that was requested";
                                break;
                            } else {
                                $full_path = checkFile($name);
                            }

                            if (unlink($full_path)) {
                                break;
                            } else {
                                echo "Error: File not deleted";
                                break;
                            }


                        //copy's file from user's private directory to public directory, allows other users to view & download file
                        case "share":
                            $full_path = sprintf("/var/www/fileshare/%s/%s", $_SESSION['username'], $name);
                            $sharepath = sprintf("/var/www/fileshare/public/%s/%s", $_SESSION['username'], $name);
                            if (copy($full_path, $sharepath)) {
                                //echo "File Shared. Refreshing page in 3 seconds";
                                //header("Refresh:3");
                                break;
                            } else {
                                echo "Error: File not shared";
                                break;
                            }


                        //deletes file from public directory
                        case "unshare":
                            $full_path = sprintf("/var/www/fileshare/public/%s/%s", $_SESSION['username'], $name);
                            if (unlink($full_path)) {
                               // echo "File UnShared. Refreshing page in 3 seconds";
                               // header("Refresh:3");
                                break;
                            } else {
                                echo "Error: File not unshared";
                                break;
                            }
                        
                        //If an action wasn't selected
                        default:
                            echo "You didn't pick an action!!";
                            break;
                    }
                }
                ?>
            </div>
        </div>


        <!-- Displays all files of the users and the shared files of othr users -->
        <div class="fileDisplay">
            <div class="printNames">
                <b class="title">My Files:</b>
                <ul>

                <!-- Print out current files -->
                <?php
                // list file names
                $username = $_SESSION['username'];
                $path = sprintf("/var/www/fileshare/%s", $username);
                $files = scandir($path);
                array_shift($files);
                array_shift($files);

                $full_path = sprintf("/var/www/fileshare/public/%s", $username);
                $myFiles = scandir($full_path);
                array_shift($myFiles);
                array_shift($myFiles);

                $i = 0;
                while ($i < count($files)) {
                    if (in_array($files[$i], $myFiles)) {
                        //adds (shared) if file is shared
                        printf("<li>%s (shared)</li>\n", $files[$i]);
                    } else {
                        printf("<li>%s</li>\n", $files[$i]);
                    }
                    $i++;
                }
                ?>
                </ul>
            </div>

            <br>
            <hr>

            <div class="sharedNames">
                <b class="title">Shared Files:</b><br>
                
                <!-- Prints out other users' files in their public directories, shared with current user -->
                <?php
                $users = $_SESSION['userArray'];
                $i = 0;
                while ($i < count($users)) {
                    if ($users[$i] != $username && $users[$i] != "") {
                        $otherUser = $users[$i];
                        printf("<u>%s's files</u><br><ul>", $otherUser);
                        
                        $otherPath = sprintf("/var/www/fileshare/public/%s", $otherUser);
                        $otherFiles = scandir($otherPath);

                        array_shift($otherFiles);
                        array_shift($otherFiles);

                        $j = 0;
                        while ($j < count($otherFiles)) {
                            printf("<li>%s</li>\n", $otherFiles[$j]);
                            $j++;
                        }
                        
                        printf("</ul>");
                    }
                    $i++;
                }
                ?>
                
            </div>
        </div>
    </div>
</body>


<?php 
    //cleans code after view or download, so html text is not viewed or downloaded
    function cleanFiles() {
            ob_end_flush();
            exit;
    }
?>

</html>