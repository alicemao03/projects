<!DOCTYPE html>
<html lang="en">

<head>
    <title>Register TLA</title>
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

        <form method="POST">
            <br>
            <label>First Name: </label><br><input type="text" name="first_name"><br>
            <label>Last Name: </label><br><input type="text" name="last_name"><br>
            <label>Username: </label><br><input type="text" name="username"><br>
            <label>Email Address: </label><br><input type="email" name="email"><br>
            <label>Password: </label><br><input type="password" name="pwd"><br>
            <label>Retype Password:</label><br><input type="password" name="checkpwd"><br><br>
            <input class="button" type="submit" value="Register" name="submit"><br><br>
        </form>

        <?php
        require 'database.php';
        $checkuser = false;


        // CHECK TO MAKE SURE ALL FIELDS ARE CORRECT
        if (isset($_POST["submit"])) {

            // CHECK FOR VALID NAMES
            if (isset($_POST['first_name'])) {
                if (strlen($_POST["first_name"]) > 20) {
                    echo "First name cannot exceed 20 characters";
                    exit;
                }
            }
            if (!isset($_POST['first_name']) || empty($_POST['first_name'])) {
                echo "First name required";
                exit;
            }

            $first_name = $_POST['first_name'];


            if (isset($_POST['last_name'])) {
                if (strlen($_POST["last_name"]) > 20) {
                    echo "Last name cannot exceed 20 characters";
                    exit;
                }
            }
            if (!isset($_POST['last_name']) || empty($_POST['last_name'])) {
                echo "Last name required";
                exit;
            }

            $last_name = $_POST['last_name'];

            if (isset($_POST['username'])) {
                if (strlen($_POST["username"]) > 20) {
                    echo "Username cannot exceed 20 characters";
                    exit;
                }
            }
            if (!isset($_POST['username']) || empty($_POST['username'])) {
                echo "Username required";
                exit;
            }

            $username = $_POST['username'];



            // CHECK IF THE PASSWORD IS VALID
            if (!isset($_POST['pwd']) || empty($_POST['pwd'])) {
                echo "Password required";
                exit;
            }

            $password = password_hash($_POST['pwd'], PASSWORD_DEFAULT);

            if (!password_verify($_POST['checkpwd'], $password)) {
                echo "Passwords do not match";
                exit;
            }

            $checkuser = true;
            $token = "login token";
            $actToken = password_hash($token, PASSWORD_DEFAULT);



            // CHECK IF USERNAME IS ALREADY TAKEN
            $stmt = $mysqli->prepare("SELECT COUNT(*) FROM users WHERE username=?");

            $user = $_POST['username'];
            $stmt->bind_param('s', $user);
            $stmt->execute();

            $stmt->bind_result($cnt);
            $stmt->fetch();
            $stmt->close();

            if ($cnt > 0) {
                echo ("This username is already taken.");
                exit;
            }


            // CHECK IF EMAIL IS ALREADY TAKEN
            $stmt = $mysqli->prepare("SELECT COUNT(*) FROM users WHERE email=?");

            $email = $_POST['email'];
            $stmt->bind_param('s', $email);
            $stmt->execute();

            $stmt->bind_result($cnt);
            $stmt->fetch();
            $stmt->close();

            if ($cnt > 0) {
                echo ("There is already an account associated with this email");
                exit;
            }

            // ADDING NEW USER TO USERS
            $active = 0;
            $email = $_POST['email'];

            $stmt = $mysqli->prepare("insert into users (first_name, last_name, username, email, actToken, active, passwords) values (?, ?, ?, ?, ?, ?, ?)");

            if (!$stmt) {
                printf("Query Prep Failed: %s\n", $mysqli->error);
                exit;
            }

            $stmt->bind_param('sssssis', $first_name, $last_name, $username, $email, $actToken, $active, $password);
            $stmt->execute();
            $stmt->close();

            header("Location: tlalogin.php");
        }

        ?>
    </div>
</body>

</html>