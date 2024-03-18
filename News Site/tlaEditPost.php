<?php
ob_start();
session_start();
$post_id = $_SESSION['post_id'];
?>

<?php   //gets post
require 'database.php';

$stmt = $mysqli->prepare("SELECT title, body, url, user_id FROM posts WHERE post_id=?");

// Bind the parameter
$stmt->bind_param('i', $post_id);
$stmt->execute();

// Bind the results
$stmt->bind_result($title, $body, $url, $user_id);
$stmt->fetch();
$stmt->close();
?>

<!DOCTYPE html>

<html lang="en">

<head>
    <title>Edit Post</title>
    <link rel="stylesheet" type="text/css" href="tla.css">
</head>

<body>
    <div class="header">
        <div class="home">
            <a href="tlaHome.php">
                <img src="The_liberal_agenda.png" alt="tlaLogo" width="150" height="150">
            </a>
        </div>

        <div class="welcome">
            <?php
            require 'database.php';

            $stmt = $mysqli->prepare("SELECT first_name, last_name FROM users WHERE id=?");

            if (!$stmt) {
                printf("Query Prep Failed: %s\n", $mysqli->error);
                exit;
            }

            $user_id = $_SESSION['user_id'];
            $stmt->bind_param('i', $user_id);
            $stmt->execute();
            $stmt->bind_result($first, $last);

            $stmt->fetch();

            printf(
                "Hello <u>%s %s</u>, <br> welcome to your news site!!",
                htmlspecialchars($first),
                htmlspecialchars($last)
            );

            $stmt->close();
            ?>
        </div>

        <div class="buttons">
            <div class="create">
                <?php
                if (isset($_SESSION['user_id'])) {
                    echo '<form method="POST">
                        <input class="button" type="submit" value="Create a Post" name="create">
                        </form>';
                } else {
                    echo '<form method="POST">
                        <input class="button" type="submit" value="Register" name="registerAccount">
                        </form>';
                }
                if (isset($_POST["create"])) {
                    ob_end_clean();
                    header("Location: tlaCreate.php");
                } else if (isset($_POST["registerAccount"])) {
                    ob_end_clean();
                    header("Location: tlaregister.php");
                }
                ?>
            </div>
            <div class="logout">
                <!-- Checkout Button -->
                <?php
                if (isset($_SESSION['user_id'])) {
                    echo '
                        <form class="checkout" method="POST">
                            <input class="button" type="submit" value="Logout" name="endSession">
                        </form>';
                } else {
                    echo '
                        <form class="checkout" method="POST" action="tlalogin.php">
                            <input class="button" type="submit" value="Login" name="Login">
                        </form>
                        ';
                }
                ?>

                <?php
                if (isset($_POST["endSession"])) {
                    header("Location: tlalogin.php");
                    session_destroy();
                    exit;
                }
                ?>
            </div>
        </div>
    </div>
    <hr>
    <div class="box" id="createBox">
        <h1>Edit a Post:</h1>
        Make your changes and hit submit!
        <form method="POST" enctype="multipart/form-data">
            <br>
            <textarea name="title" rows="1" cols="80" placeholder='title'><?php printf($title); ?></textarea><br>
            <textarea name="body" rows="10" cols="80" placeholder='body'><?php printf($body); ?></textarea><br>
            <textarea name="url" rows="1" cols="80" placeholder='url (optional)'><?php printf($url); ?></textarea><br><br>
            <input type="hidden" name="MAX_FILE_SIZE" value="20000000">
            <label for="uploadfile_input">Choose a file to upload:</label> <input name="uploadedfile" type="file" id="uploadfile_input"><br><br>
            <input class="button" type="submit" value="Edit Post" name="update">
        </form>

        <?php
        $checked = false;

        $title = $_POST['title'];
        $body = $_POST['body'];
        $url = $_POST['url'];
        $imagefile = $_POST['uploadedfile'];
        $submit = $_POST['update'];
        $image = $_FILES['uploadedfile']['name'];


        // CHECK TO MAKE SURE SUBMIT BUTTON WAS PRESSED
        if (isset($submit)) {
            if (!isset($title) || empty($title)) {
                echo "title required";
                exit;
            }

            if (!isset($body) || empty($body)) {
                echo "body required";
                exit;
            }

            if (!empty($_FILES['uploadedfile']['name'])) {

                //beginning of copied code: https://meeraacademy.com/php-upload-only-image-using-file-upload/
                $extension = pathinfo($_FILES['uploadedfile']['name'], PATHINFO_EXTENSION);

                if (!($extension == 'jpg' || $extension == 'jpeg' || $extension == 'png' || $extension == 'gif')) {
                    echo "invalid image type";
                    exit;
                }
                //end of copied code
                else {

                    $filename = $_FILES['uploadedfile']['name'];

                    if (!preg_match('/^[\w_\.\-]+$/', $filename)) {
                        echo "Invalid filename";
                        exit;
                    }

                    $full_path = sprintf("/var/www/html/tlaNewsImages/%s", $filename);

                    if (move_uploaded_file($_FILES['uploadedfile']['tmp_name'], $full_path)) {
                    } else {
                        echo "Image failed to upload";
                        exit;
                    }
                }

                if (!hash_equals($_SESSION['token'], $_POST['token'])) {
                    die("Request forgery detected");
                }



                $checked = true;
            }


            // UPDATING POST IN POSTS
            require 'database.php';
            $post_id = $_SESSION['post_id'];


            $user_id = $_SESSION['user_id'];

            $stmt = $mysqli->prepare("update posts set title=?, body=?, image_src=?, url=? where post_id=?");

            if (!$stmt) {
                printf("Query Prep Failed: %s\n", $mysqli->error);
                exit;
            }

            $stmt->bind_param('ssssi', $title, $body, $image, $url, $post_id);
            $stmt->execute();
            $stmt->close();


            //$_SESSION['post_id'] = $_POST['post_id'];
            ob_end_clean();
            header('Location: tlaView.php');
        }
        ?>
    </div>
</body>


</html>