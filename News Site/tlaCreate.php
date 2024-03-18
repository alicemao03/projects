<?php
session_start();

?>

<?php
if (0 == $_SESSION['user_id']) {
    echo "Must register to create a post!";
    header('Refresh: 5; tlaHome.php');
    exit;
}


?>

<!DOCTYPE html>

<html lang="en">

<head>
    <title>Create A Post!</title>
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
        <h1>Create a Post:</h1>
        <form method="POST" enctype="multipart/form-data">
            <br>
            <textarea name="title" rows="1" cols="80" placeholder="Title"></textarea><br>
            <textarea name="body" rows="10" cols="80" placeholder="Body Text"></textarea><br>
            <textarea name="url" rows="1" cols="80" placeholder="Link/URL (optional)"></textarea><br><br>
            <input type="hidden" name="token" value="<?php echo $_SESSION['token']; ?>">
            <input type="hidden" name="MAX_FILE_SIZE" value="20000000">
            <label for="uploadfile_input">Choose a file to upload:</label> <input name="uploadedfile" type="file" id="uploadfile_input"><br><br>
            <input class="button" type="submit" value="Create Post" name="create_post_button">
        </form>

        <?php
        $checked = false;

        $title = $_POST['title'];
        $body = $_POST['body'];
        $url = $_POST['url'];
        $imagefile = $_POST['uploadedfile'];
        $submit = $_POST['create_post_button'];
        $image = $_FILES['uploadedfile']['name'];

        // CHECK TO MAKE SURE SUBMIT BUTTON WAS PRESSED
        if (isset($submit)) {
            if (!isset($title) || empty($title)) {
                echo "<br> Error: title required";
                exit;
            }

            if (!isset($body) || empty($body)) {
                echo "<br> Error: body required";
                exit;
            }

            if (!empty($_FILES['uploadedfile']['name'])) {

                //beginning of copied code: https://meeraacademy.com/php-upload-only-image-using-file-upload/
                $extension = pathinfo($_FILES['uploadedfile']['name'], PATHINFO_EXTENSION);

                if (!($extension == 'jpg' || $extension == 'jpeg' || $extension == 'png' || $extension == 'gif')) {
                    echo "<br> Error: invalid image type";
                    exit;
                }
                //end of copied code
                else {

                    $filename = $_FILES['uploadedfile']['name'];

                    if (!preg_match('/^[\w_\.\-]+$/', $filename)) {
                        echo "<br> Error: Invalid filename";
                        exit;
                    }

                    $full_path = sprintf("/var/www/html/tlaNewsImages/%s", $filename);

                    if (move_uploaded_file($_FILES['uploadedfile']['tmp_name'], $full_path)) {
                    } else {
                        echo "<br> Error: Image failed to upload";
                        exit;
                    }
                }

                if (!hash_equals($_SESSION['token'], $_POST['token'])) {
                    die("<br> Error: Request forgery detected");
                }



                $checked = true;
            }


            // CREATE NEW POST IN POSTS
            require 'database.php';

            $user_id = $_SESSION['user_id'];

            $stmt = $mysqli->prepare("insert into posts (title, body, image_src, url, user_id) values (?, ?, ?, ?, ?)");

            if (!$stmt) {
                printf("<br> Error: Query Prep Failed: %s\n", $mysqli->error);
                exit;
            }

            $stmt->bind_param('ssssi', $title, $body, $image, $url, $user_id);
            if ($stmt->execute()) {
                $redirect = true;
            }
            $stmt->close();

            header('Location: tlaHome.php');
        }
        ?>
    </div>

</body>


</html>