<?php

if ($_SERVER["REQUEST_METHOD"] == "POST" && stripos($_SERVER['HTTP_REFERER'],'m.cornwall.ac.uk') != false ) {
    $send = mail('mtest@cornwall.ac.uk', 'm.cornwall.ac.uk javascript error occured', $_POST['error'], 'From: mtest@cornwall.ac.uk' );    
    exit();
}

?>
