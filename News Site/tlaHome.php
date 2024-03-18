<?php
ob_start();
session_start();
?>


<!DOCTYPE html>
<html lang="en">

<head>
    <title>TLA Home</title>
    <link rel="stylesheet" type="text/css" href="tla.css">
</head>

<body>
    <div class="header">
        <div class="homeHeader">
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
    <h1>Here is your news:</h1>
    <div class="home">
        <?php
        require 'database.php';

        // $stmt = $mysqli->prepare("SELECT post_id, title, image_src, timestamp FROM posts");
        $stmt = $mysqli->prepare("SELECT post_id, title, image_src, timestamp, userName FROM posts join users on (posts.user_id=users.id)");

        if (!$stmt) {
            printf("Query Prep Failed: %s\n", $mysqli->error);
            exit;
        }

        $userID = $_SESSION['user_id'];
        $stmt->bind_param('s', $userID);

        $stmt->execute();
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();

        // IF THERE ARE NO NEWS ARTICLES IN POSTS
        if (empty($row)) {
            echo "Oopsies, it looks like you don't have any news.";
            echo '<form method="POST">
                    <input class="button" type="submit" value="Click here to create an article" name="create">
                    </form>';

            if (isset($_POST["create"])) {
                ob_end_clean();
                header("Location: tlaCreate.php");
            }
        }
        // DISPLAY THE TITLE, IMAGE, AND TIME OF EACH ARTICLE
        else {
            while ($row) {
                printf('<div class="articleBox">');
                $id = htmlspecialchars($row["post_id"]);
                $title = htmlspecialchars($row["title"]);
                $img = htmlspecialchars($row["image_src"]);
                $time = htmlspecialchars($row["timestamp"]);
                $username = htmlspecialchars($row["userName"]);
                $time = date('g:i a | F j, Y', strtotime($row['timestamp']));

                if ($img != "") {
                    printf(
                        '<div class="title"><strong><u> %s </u></strong></div><br>
                        <img src="/tlaNewsImages/%s" alt="%s"><br>
                        Author: %s <br>
                        Time: %s <br><br>',
                        $title,
                        $img,
                        $username,
                        $title,
                        $time
                    );
                } else {
                    printf(
                        '<div class="title"><strong><u> %s </u></strong></div><br><br>
                        Author: %s <br>
                        Time: %s <br><br>',
                        $title,
                        $username,
                        $time
                    );
                }

                echo '<form method="POST">
                        <input class="button" type="submit" value="View" name="view">
                        <input type="hidden" name="post_id" value="';
                printf($id);
                echo '"></form>';
                $row = $result->fetch_assoc();
                printf("</div>");
            }
        }
        $stmt->close();


        // IF THE VIEW BUTTON HAS BEEN CLICKED
        if (isset($_POST["view"])) {
            $_SESSION['post_id'] = $_POST['post_id'];
            header("Location: tlaView.php");
        }

        ?>
    </div>
</body>

</html>