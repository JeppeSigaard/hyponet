<?php

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-Type: application/json; charset=utf-8');

$one = $_POST['one'];
$two = $_POST['two'];

if($one == $two){
exit;
}

$path = '../data/brain.json';


$file = file_get_contents($path);

$brain = (array) json_decode($file);

unset($file);//prevent memory leaks for large json.

$brain[] = $two;

$obj = new stdClass();
$obj->one = $one;
$obj->two = $two;

$brain[] = $obj;

$i = 0;
foreach ($brain as $value)
{
    $object->$i = $value;
    $i ++;
}

$return = json_encode($object, JSON_PRETTY_PRINT);
//save the file
file_put_contents($path,$return);
unset($brain);//release memory

?>