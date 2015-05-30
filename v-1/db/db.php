<?php 
$con = mysql_connect("smamo.dk.mysql", "smamo_dk", "VumzXx7z");
if (!$con){die ("Failed to connect to MySQL: " . mysql_error());}
$db_selected = mysql_select_db("smamo_dk",$con);
if (!$db_selected){die ("Can\'t use db : " . mysql_error());}
?>