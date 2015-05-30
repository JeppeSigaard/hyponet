<?php
require 'db.php';

$content = $_POST['input'];

$send = mysql_query("insert into vco_hyponet_lokutioner(value) values('$content')")or die(mysql_error());
echo $content;
	
$get_latest = mysql_query("select id from vco_hyponet_lokutioner order by id desc limit 1")or die(mysql_error());
while($r = mysql_fetch_array($get_latest)){
	$_SESSION['latestid'] = $r['id'];
	}


mysql_close();
?>