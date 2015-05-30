<?php



// find output på input

$word = 'word1'; //single word or sentence string
$array = array('word1[··]word2','word1[··]lassie','word1[··]snore','word1[··]yellow');
$output = array(); 	// resulting array

for($i = 0; $i < count($array);$i++){
	$strA = explode('[··]', $array[$i]);
	if($strA[0] == $word){array_push($output,$strA[1]);}
	else if($strA[1] == $word){array_push($output,$strA[0]);}
}

for($v = 0; $v < count($output);$v++){
	echo $output[$v];
	}

/*
Indsæt i seriestreng
*/
/*$test = array();
$serie = serialize($test);
$insert = 'word1[··]word2';
$nyserie;
$array = unserialize($serie);
array_push($array, $insert);
$nyserie = serialize($array);

// tjek
echo $serie .'<br/>'. $nyserie;
*/
?>
