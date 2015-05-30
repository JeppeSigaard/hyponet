<?php
session_start();
require 'db.php';

function regExSelect($input){
	return "select id, value, hypos from vco_hyponet_lokutioner where value REGEXP '[[:<:]]".$input."[[:>:]]' order by id desc";
	}

function outPutRow($id,$input,$value){
	
	$spanres = '<span>'.str_replace(' ','</span> <span>',$value).'</span>';
	$spanq = str_replace('?</span>','</span>?',$spanres);
	$spandot = str_replace('.</span>','</span>.',$spanq);
	$spanex = str_replace('!</span>','</span>!',$spandot);
	$spancomma = str_replace(',</span>','</span>,',$spanex);
	$spanw = str_ireplace('<span>'.$input.'</span>','<span class="the-word">'.$input.'</span>',$spancomma);
	
	$res = '<div class="assoc-res" id="res-'.$id .'">';
	$res .= $spanw;
	$res .= '</div>';
		
	return $res;
	}

$input = strtolower($_POST['input']);
$latestid = $_SESSION['latestid'];

$get_assoc = mysql_query(regExSelect($input))or die(mysql_error());
if(mysql_num_rows($get_assoc) == 0){echo 'no results';}
else{
	while($row = mysql_fetch_array($get_assoc)){
		if ($latestid == $row['id']){
			
			if($row['hypos'] == ""){}
			else{
				$array = unserialize($row['hypos']);
				$output = array();
				
				for($i = 0; $i < count($array);$i++){
					$strA = explode('[··]', $array[$i]);
					if(strtolower($strA[0]) == $input){array_push($output,$strA[1]);}
					else if(strtolower($strA[1]) == $input){array_push($output,$strA[0]);}
					}
				
				for($v = 0; $v < count($output);$v++){
						$get_hypo = mysql_query(regExSelect($output[$v]))or die(mysql_error());
						while($row = mysql_fetch_array($get_hypo)){
						echo outPutRow($row['id'],$output[$v],$row['value']);
						}
					}
				
				}
			
			
			}
		else{
			echo outPutRow($row['id'],$input,$row['value']);
			
			if($row['hypos'] == ""){}
			else{
				$array = unserialize($row['hypos']);
				$output = array();
				
				for($i = 0; $i < count($array);$i++){
					$strA = explode('[··]', $array[$i]);
					if($strA[0] == $input){array_push($output,$strA[1]);}
					else if($strA[1] == $input){array_push($output,$strA[0]);}
					}
				
				for($v = 0; $v < count($output);$v++){
						$get_hypo = mysql_query(regExSelect($output[$v]))or die(mysql_error());
						while($row = mysql_fetch_array($get_hypo)){
						echo outPutRow($row['id'],$output[$v],$row['value']);
						}
					}
				
				}
		}}
	}

?>

