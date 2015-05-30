<?php
session_start();
$_SESSION['unix'] = time();
?>
<!DOCTYPE HTML>
<html>
<head>
<meta charset="utf-8"/>
<link rel="stylesheet" type="text/css" href="style/init.css"/>
<script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
<script src="http://code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
<script src="js/init.js"></script>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>INPUT</title>
</head>

<body>
    <div id="center">
        <div id="readOut"></div>
        <input id="opgInput" type="text"/>
        <br/>
        <div id="assoc"></div>
    </div>
</body>
</html>