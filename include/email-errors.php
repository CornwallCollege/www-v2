<?php

if ($_SERVER["REQUEST_METHOD"] == "GET" && stripos($_SERVER['HTTP_REFERER'],'m.cornwall.ac.uk') != false ) {
    $send = mail('mtest@cornwall.ac.uk', 'm.cornwall.ac.uk javascript error occured', $_GET['error'], 'From: mtest@cornwall.ac.uk' );    
    exit();
}

?>
