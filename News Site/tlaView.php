<?php
ob_start();
session_start();
?>

<!DOCTYPE html>

<html lang="en">

<?php

session_start();

$post_id = $_SESSION['post_id'];
?>

<?php   //gets post
require 'database.php';

$stmt = $mysqli->prepare("SELECT title, body, timestamp, url, image_src, user_id FROM posts WHERE post_id=?");

// Bind the parameter
$stmt->bind_param('i', $post_id);
$stmt->execute();

// Bind the results
$stmt->bind_result($title, $body, $timestamp, $url, $image_src, $user_id);
$stmt->fetch();
$stmt->close();
?>

<?php
require 'database.php';

$stmt = $mysqli->prepare("SELECT username FROM users WHERE id=?");

// Bind the parameter
$stmt->bind_param('i', $user_id);
$stmt->execute();

// Bind the results
$stmt->bind_result($username);
$stmt->fetch();
$stmt->close();

?>

<head>
    <title>
        TLA View
    </title>
    <link rel="stylesheet" type="text/css" href="tla.css">
</head>

<body>
    <!-- Header -->
    <div class="header">
        <div class="home">
            <!-- Show Logo -->
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

            $userID = $_SESSION['user_id'];
            $stmt->bind_param('i', $userID);
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
    <div class="content">
        <!-- Print out contents -->
        <div class="box" id="viewBox">
            <div class="title"><strong><u><?php echo htmlentities($title) ?></u></strong></div>
            <div class="AuthorAndTime">
                <?php
                $timestamp = strtotime($timestamp);
                $time = $timestamp;

                //beginning of copied code https://stackoverflow.com/questions/2915864/php-how-to-find-the-time-elapsed-since-a-date-time
                echo "Posted by " . $username . ', ' . humanTiming($time) . ' ago';

                function humanTiming($time)
                {
                    $timestamp = idate('U', $time);

                    $time = time() - $timestamp - 21600; // to get the time since that moment
                    $time = ($time < 1) ? 1 : $time;
                    $tokens = array(
                        31536000 => 'year',
                        2592000 => 'month',
                        604800 => 'week',
                        86400 => 'day',
                        3600 => 'hour',
                        60 => 'minute',
                        1 => 'second'
                    );

                    foreach ($tokens as $unit => $text) {
                        if ($time < $unit) continue;
                        $numberOfUnits = floor($time / $unit);
                        return $numberOfUnits . ' ' . $text . (($numberOfUnits > 1) ? 's' : '');
                    }
                }
                //end of copied code
                ?>
            </div><hr>
            <br>
            <div class="image">
                <?php
                if ($image_src != "") {
                    printf('<img src="/tlaNewsImages/%s" alt="%s"><br>', $image_src, htmlentities($title));
                }
                ?>
            </div>
            <div class="body">
                <?php echo nl2br((htmlentities($body))); ?>
            </div>
            <br><hr>
            <div class="link">
                <?php
                    // IF THERE IS A LINK
                    if($url != ""){
                        printf('<a href=%s> Click here to visit the actual site!!</a>', $url);
                    }
                ?>
            </div>
            <div class="buttons">
                <?php
                // IF USER IS SIGNED IN ADD DELETE AND EDIT POST BUTTONS
                if (($user_id == $_SESSION['user_id'])) {
                    echo '<form method="POST">
                        <br>
                        <input class="button" type="submit" value="Delete Post" name="delete_post"> &nbsp <input class="button" type="submit" value="Edit Post" name="edit">
                        <input type="hidden" name="token" value="';
                    echo $_SESSION['token'];
                    echo '" /> </form>';
                }

                if (isset($_POST['edit'])) {
                    ob_end_clean();
                    header('Location: tlaEditPost.php');
                    exit;
                }

                if (isset($_POST['delete_post'])) {

                    if (!hash_equals($_SESSION['token'], $_POST['token'])) {
                        die("Request forgery detected");
                    }

                    $post_id = $_SESSION['post_id'];

                    $stmt = $mysqli->prepare("DELETE FROM comments where post_id=?");

                    // Bind the parameter
                    $stmt->bind_param('i', $post_id);
                    $stmt->execute();
                    $stmt->close();

                    $stmt = $mysqli->prepare("DELETE FROM posts where post_id=?");

                    // Bind the parameter
                    $stmt->bind_param('i', $post_id);
                    $stmt->execute();
                    $stmt->close();

                    ob_end_clean();
                    header('Location: tlaHome.php');
                }
                ?>
            </div>
        </div>

        <div class="box">
            <h1>Comments:</h1>

            <?php
            // ALLOW COMMENTS IF USER IS LOGGED IN
            if (isset($_SESSION['user_id'])) {
                echo '<form method="POST">
                        <textarea name="commentbody" rows="4" cols="40" placeholder="Comment"></textarea>
                        <br>
                        <input class="button" type="submit" value="Post Comment" name="comment">
                        <input type="hidden" name="token" value="';
                echo $_SESSION['token'];
                echo '" /></form>';
            } else {
                echo "Please login or create an account to add a post! <br>";
                echo '<form method="POST">
                        <input class="button" type="submit" value="Login" name="loginAccount"> &nbsp <input class="button" type="submit" value="Register" name="registerAccount">
                        </form>';
                if (isset(($_POST["loginAccount"]))) {
                    header("Location: tlalogin.php");
                }
                if (isset(($_POST["registerAccount"]))) {
                    header("Location: tlaregister.php");
                }
            }

            // ADD NEW COMMENT TO COMMENTS
            require 'database.php';
            $user_id = $_SESSION['user_id'];

            if (isset($_POST['comment'])) {

                if (!hash_equals($_SESSION['token'], $_POST['token'])) {
                    die("Request forgery detected");
                }

                $commentbody = $_POST['commentbody'];

                $stmt = $mysqli->prepare("insert into comments (comment_body, post_id, user_id) values (?, ?, ?)");

                if (!$stmt) {
                    printf("Query Prep Failed: %s\n", $mysqli->error);
                    exit;
                }

                $stmt->bind_param('sii', $commentbody, $post_id, $user_id);
                $stmt->execute();
                $stmt->close();

                header('Location: tlaView.php');
            }
            ?>
            <br><hr>

            <!-- PRINT THE COMMENTS -->
            <?php
            require 'database.php';

            $stmt = $mysqli->prepare("SELECT COUNT(*) FROM comments WHERE post_id=?");

            // Bind the parameter
            $stmt->bind_param('i', $post_id);
            $stmt->execute();

            // Bind the results
            $stmt->bind_result($totalcomments);
            $stmt->fetch();
            $stmt->close();

            ?>

            <?php
            require 'database.php';

            $stmt = $mysqli->prepare("SELECT comment_body, user_id, comment_id FROM comments WHERE post_id=?");

            // Bind the parameter //
            $stmt->bind_param('i', $post_id);
            $stmt->execute();

            $result = $stmt->get_result();

            $row = $result->fetch_assoc();

            $stmt->close();

            ?>


            <!-- PRINT OUT POSTS -->
            <?php
            require 'database.php';

            foreach ($result as $row) {
                echo '<div class="commentPost">
                        <div class="commentBody">';
                echo $row['comment_body'];
                echo '</div>';
                echo '<br>';

                $stmt = $mysqli->prepare("SELECT username FROM users WHERE id=?");

                // Bind the parameter
                $stmt->bind_param('i', $row['user_id']);
                $stmt->execute();

                // Bind the results
                $stmt->bind_result($username);
                $stmt->fetch();
                $stmt->close();

                printf('<div class="commentUser"> -- %s </div><hr>',$username);
                
                if ($_SESSION['user_id'] == $row['user_id']) {
                    echo '<form method="POST">   
                            <form method="POST">
                            <input class="button" type="submit" value="Delete" name="deletecomment"> &nbsp <input class="button" type="submit" value="Edit" name="editcomment">
                            <input type="hidden" name="comment_id" value="';
                    printf($row['comment_id']);
                    echo '" >';
                    echo '<input type="hidden" name="token" value="';
                    echo $_SESSION['token'];
                    echo '" /> </form>';
                    echo '</form> ';
                }
                echo '</div>';
            }

            if (isset($_POST['editcomment'])) {

                if (!hash_equals($_SESSION['token'], $_POST['token'])) {
                    die("Request forgery detected");
                }

                $_SESSION['comment_id'] = $_POST['comment_id'];
                ob_end_clean();
                header('Location: tlaEditComment.php');
            }


            if (isset($_POST['deletecomment'])) {

                if (!hash_equals($_SESSION['token'], $_POST['token'])) {
                    die("Request forgery detected");
                }

                $comment_id = $_POST['comment_id'];

                $stmt = $mysqli->prepare("DELETE FROM comments WHERE comment_id=?");

                // Bind the parameter
                $stmt->bind_param('i', $comment_id);
                $stmt->execute();
                $stmt->close();

                ob_end_clean();
                header('Location: tlaView.php');
            }
            ?>
        </div>
    </div>
</body>


</html>