<?php
session_start();

include 'db.php';

$unix = $_SESSION['unix'];
$mysql_unix = 0;


	$get = mysql_query("select time from vco_hyponet_lokutioner where UNIX_TIMESTAMP(time) > '$unix' order by id desc limit 1")or die(mysql_error());
	while($rs = mysql_fetch_array($get)){
		$mysql_unix = strtotime($rs['0']);
		}

		if($_SESSION['unix'] < $mysql_unix){
			$_SESSION['unix'] = $mysql_unix;
			echo 'yes ' .$_SESSION['unix'];
			}
		else{
			echo 'no ' .$_SESSION['unix'];
			}

mysql_close();
?>