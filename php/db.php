<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

define ("DB", "YOUR DB NAME");
define ("USER", "YOUR DB USERNAME");
define ("PW", "YOUR DB PASSWORD");

session_start();


function logger(){
	$sid = session_id();
	$ip = $_SERVER['REMOTE_ADDR'];
	$payload = file_get_contents('php://input');
	$data = json_decode($payload);
	if(count($data) == 0) die;

	$db = new mysqli('localhost', USER, PW, DB);
	
	foreach($data as $entry){
		$payload = $db->real_escape_string(json_encode($entry));
		// print_r($payload);
		$db->query("INSERT INTO logs (sessionid, payload,modified,ip) VALUES ('$sid', '$payload', now(), '$ip')");

	}

	$db->close();
}

?>