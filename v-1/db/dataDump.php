<?php

function insertDB($value){
	$run = mysql_query("insert into vco_hyponet_lokutioner(value) values('$value')")or die(mysql_error());
	
	}

$string = $_POST['allTheWords'];
if($string){
	$replace = array(
		'...'=>'...[··]',
		'.'=>'.[··]',
		'???'=>'???[··]',
		'??'=>'??[··]',
		'?'=>'?[··]',
		'?'=>'?[··]',
		'!!!'=>'!!![··]',
		'!!'=>'!![··]',
		'!'=>'![··]'
	);
	
	require 'db.php';
	
	$delim = strtr($string,$replace);
	
	$array = explode('[··]',$delim);
	
	$i = 0;
	
	for($v = 0; $v < count($array);$v++){
		$i ++;
		insertDB($array[$v]);
		}
	
	echo $i.' sætinger';
	
	}


?>
<!doctype html>
<html>
<head>
<meta charset="utf-8"/>
<style>

form textarea{
	display:block;
	width:500px;
	height:300px;
	}

</style>

</head>
<body>

<form method="post" action="">
    <textarea name="allTheWords" placeholder="Dump tekst her."></textarea>
    <input type="submit" value="submit"/>
</form>

</body>
</html>