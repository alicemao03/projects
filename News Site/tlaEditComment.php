<?php
ob_start();
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
    <title>This post</title>
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
    <div class="content">
        <div class="box" id="viewBox">
            <div class="title"><strong><u><?php echo $title ?></u></strong></div>
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
            </div>
            <hr>
            <br>
            <div class="image">
                <?php
                if ($image_src != "") {
                    printf('<img src="/tlaNewsImages/%s" alt="%s"><br>', $image_src, $title);
                }
                ?>
            </div>
            <div class="body">
                <?php echo nl2br($body); ?>
            </div>
            <br>
            <hr>
            <div class="link">
                <?php
                if ($url != "") {
                    printf('<a href=%s> Click here to visit the actual site!!</a>', $url);
                }
                ?>
            </div>
        </div>


        <?php
        if ($user_id != $_SESSION['user_id']) {
            exit;
        }
        ?>

        <?php

        if (isset($_POST['edit'])) {
            ob_end_clean();
            header('Location: tlaEditPost.php');
            exit;
        }

        ?>

        <?php

        require 'database.php';

        $comment_id = $_SESSION['comment_id'];

        $stmt = $mysqli->prepare("SELECT comment_body FROM comments WHERE comment_id=?");

        // Bind the parameter
        $stmt->bind_param('i', $comment_id);
        $stmt->execute();

        // Bind the results
        $stmt->bind_result($comment_body);
        $stmt->fetch();
        $stmt->close();


        ?>

        <div class="box">
            <form method='POST'>
                <h1>Edit Comment</h1>
                <textarea name="commentbody" rows="4" cols="40" placeholder="Comment"><?php printf($comment_body) ?></textarea>
                <br>
                <input class="button" type="submit" value="Edit Comment" name="comment">
            </form>

            <!-- UPDATE COMMENT -->
            <?php
            require 'database.php';

            if (isset($_POST['comment'])) {

                $comment_id = $_SESSION['comment_id'];
                $comment_body = $_POST['commentbody'];

                $stmt = $mysqli->prepare("update comments set comment_body=? where comment_id=?");

                if (!$stmt) {
                    printf("Query Prep Failed: %s\n", $mysqli->error);
                    exit;
                }

                $stmt->bind_param('si', $comment_body, $comment_id);
                $stmt->execute();
                $stmt->close();

                ob_end_clean();
                header('Location: tlaView.php');
            }
            ?>
            <hr>

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

                printf('<div class="commentUser"> -- %s </div><hr>', $username);

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


            // if (isset($_POST['editcomment'])) {
            //     $comment_id = $_POST['comment_id'];


            //     // printf($comment_id);
            // }

            ?>
        </div>
    </div>
</body>

</html>