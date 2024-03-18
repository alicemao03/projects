<!DOCTYPE html>
<html lang="en">

<head>
    <title>Login</title>
    <link rel="stylesheet" type="text/css" href="fileshare.css">
</head>

<body>
    <div class="login">
        <b class="title">Fileshare Login</b>
        <br><hr><br>
        <form method="POST">
            <label><b>Username: </b><input type="text" name="name"></label>
            <br><br>
            <input class="enter" type="submit" value="Login" name="submit">
        </form>

        <!-- Checks for valid username -->
        <?php
        if (isset($_POST["submit"])) {
            if (isset($_POST["name"]) && !empty($_POST["name"])) {
                session_start();
                $_SESSION['username'] = $_POST['name'];

                $h = fopen("/var/www/fileshare/users.txt", "r");
                $_SESSION['userArray'] = array();
                $found = False;

                // Adds valid usernames to array
                while (!feof($h)) {
                    $currName = trim(fgets($h));
                    array_push($_SESSION['userArray'], $currName);

                    // Check to see if username is valid
                    if ($currName == $_SESSION['username']) {
                        $found = True;
                    }
                }

                fclose($h);

                // If session username was found, then redirect to home.php
                $_SESSION['userArray'] = array_diff($_SESSION['userArray'], array(""));
                if ($found) {
                    header("Location: home.php");
                    exit;
                }

                echo "User not found.";
            } else {
                echo "Please enter a valid username.";
            }
        }
        ?>
    </div>
</body>

</html>