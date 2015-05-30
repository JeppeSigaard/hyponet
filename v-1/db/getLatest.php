<?php
session_start();

require 'db.php';

	$get = mysql_query("select id, value from vco_hyponet_lokutioner order by id desc limit 1")or die(mysql_error());
	while($res = mysql_fetch_array($get)){
		$_SESSION['latestid'] = $res['id'];
		$spanres = '<span>'.str_replace(' ','</span> <span>',$res['value']).'</span>';
		$spanq = str_replace('?</span>','</span>?',$spanres);
		$spandot = str_replace('.</span>','</span>.',$spanq);
		$spancomma = str_replace(',</span>','</span>,',$spandot);
		$spanex = str_replace('!</span>','</span>!',$spancomma);
		echo $spanex;
		}

mysql_close();
?>