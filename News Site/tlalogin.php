<!DOCTYPE html>
<html lang="en">

<head>
    <title>TLA Login</title>
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
    <div class="box">
        <form method="post">
            <br>
            <label>Username: </label><input type="text" name="username"><br><br>
            <label>Password: </label><input type="password" name="password"><br><br>
            <input class="button" type="submit" value="Login" name="submit"><br><br>
            <input class="button" type='submit' value='Create Account' name='register'>

        </form>

        <?php

        if (isset($_POST['register'])) {
            header('Location: tlaregister.php');
        }

        if (isset($_POST['submit'])) {

            // This is a *good* example of how you can implement password-based user authentication in your web application.

            require 'database.php';

            // Use a prepared statement
            $stmt = $mysqli->prepare("SELECT COUNT(*), passwords, id FROM users WHERE username=?");

            // Bind the parameter
            $user = $_POST['username'];
            $stmt->bind_param('s', $user);
            $stmt->execute();

            // Bind the results
            $stmt->bind_result($cnt, $pwd_hash, $user_id);
            $stmt->fetch();

            $pwd_guess = $_POST['password'];
            // Compare the submitted password to the actual password hash

            if ($cnt == 1 && password_verify($pwd_guess, $pwd_hash)) {
                // Login succeeded!
                echo "Success!";
                //
                session_start();
                $_SESSION['user_id'] = $user_id;
                $_SESSION['username'] = $user;
                $_SESSION['token'] = bin2hex(random_bytes(32));
                header('Location: tlaHome.php');
                exit;
                // Redirect to your target page
            } else {
                echo "Incorrect username or password";
                // Login failed; redirect back to the login screen
            }
        }
        ?>
    </div>
</body>

</html>