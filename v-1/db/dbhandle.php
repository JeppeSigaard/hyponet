<?php
$con = mysql_connect("smamo.dk.mysql", "smamo_dk", "VumzXx7z");
if (!$con){die ("Failed to connect to MySQL: " . mysql_error());}
$db_selected = mysql_select_db("smamo_dk",$con);
if (!$db_selected){die ("Can\'t use db : " . mysql_error());}

$request = $_POST['request'];
$content = $_POST['input'];

if($request == 'newInput'){
	$send = mysql_query("insert into vco_hyponet_opgaver(content) values('$content')")or die(mysql_error());
	echo $content;
	}
elseif($request == 'getLatest'){
	$get = mysql_query("select content from vco_hyponet_opgaver order by id desc limit 1")or die(mysql_error());
	while($res = mysql_fetch_array($get)){
		echo $res['content'];
		}
	}
elseif($request == 'getAssoc'){
	$search_term_esc = AddSlashes($content);
    $sql = "SELECT * FROM vco_hyponet_opgaver WHERE content LIKE '%$search_term_esc%' order by id desc";
	$search = mysql_query($sql)or die(mysql_error());
	while($row = mysql_fetch_array($search));
		{		
		echo '<div class="assoc-child" id="assoc'.$row['id'].'">'.$row['content'].'</div>';
		}
	}


mysql_close();
?>