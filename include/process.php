<?php

    $to = $_REQUEST['email'];//"enquires@cornwall.ac.uk";
    $from = $_REQUEST['email'];
    $name = $_REQUEST['name'];
    $contact = $_REQUEST['contact'];
    $headers = "From: $from";
    $interest = $_REQUEST['interest'];

    $subject = $name.": ".$interest;

    $details = "Name: ".$name."\n";
    $details .= "Email: ".$from."\n";
    $details .= "Contact: ".$contact."\n";
    $details .= "Career Interest: ".$interest."\n";

    $body = "Online application:\n\n";
    $body .= $details;

    $send = mail($to, $subject, $body, $headers);

    $applicantsubject = "Cornwall College Application";
    $applicantbody = "Thank for your application, we recieved the following from you:\n\n";
    $applicantbody .= $details;
    $applicantbody .= "\n\nA member of our team will be in touch shortly.";
    $applicantheaders = "From: enquires@cornwall.ac.uk";

    $send = mail($from, $applicantsubject, $applicantbody, $headers);

?>
