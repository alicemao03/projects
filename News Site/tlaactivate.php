<?php
session_start();
?>

<?php
$to = 'lisunminus@gmail.com';

$subject = 'Email Activation';

$message = 'This is a test message';

$message = wordwrap($message, 70, "\r\n");

$headers = 'From: tlaNews@noreply.org' . "\r\n";

if (mail($to, $subject, $message, $headers)) {
    echo "mail sent";
}


?>