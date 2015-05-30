<?php
session_start();

$str1 = $_POST['str1']; if(!$str1){echo 'missing param: str1';die();}
$str2 = $_POST['str2']; if(!$str2){echo 'missing param: str2';die();}
$insert = $str1.'[··]'.$str2;


$id = $_POST['id'];
if(!$id){
$id = $_SESSION['latestid']; if(!$id){echo 'missing param: id';die();}}
echo $id;

require 'db.php';

$get_serie = mysql_query("select hypos from vco_hyponet_lokutioner where id='$id'")or die(mysql_error());
if(mysql_num_rows($get_serie) == 0){echo 'no results';}
else{
	while($r = mysql_fetch_array($get_serie)){
	
	$serie = $r['hypos'];
	if ($serie == ""){$serie = 'a:0:{}';}
	
	$array = unserialize($serie);
	array_push($array,$insert);
	
	$nyserie = serialize($array);
	//echo $nyserie;
	
	$put_serie = mysql_query("update vco_hyponet_lokutioner set hypos='$nyserie' where id='$id'")or die(mysql_error());
	}}
?>
