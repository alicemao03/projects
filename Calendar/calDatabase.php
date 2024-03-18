<?php
$mysqli = new mysqli('localhost', 'calendar', 'calendarsecure', 'calendar');

if($mysqli->connect_errno) {
	printf("Connection Failed: %s\n", $mysqli->connect_error);
	exit;
}
?>