<?php

$errList = array();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    $email = validateEmail(validatePostField('email', 'Email Address', $errList), $errList);
    $name = validatePostField('name', 'Name', $errList);
    $phone = validatePhone(validatePostField('phone', 'Contact number', $errList), $errList);        
    
    $type = test_input($_POST['source']);        
    
    if ($type == "application") {
        $careerInterest = validatePostField('interest', 'Career Interest', $errList);        
        $topic = "Career Interest: $careerInterest";
        $subject = $name.": ".$careerInterest;
    } else if ($type == "career-help") {
        $careerInterest = test_input($_POST['interest']);        
        $topic = "Career help with: $careerInterest";
        $subject = $name.": Career Help";
        $type = "career help request";
    } else {
        $question = validatePostField('question', 'Question', $errList);        
        $topic = "Question: $question";
        $subject = $name.": Question";
    } 
    
    if(count($errList)==0) {         
        $details  = "Name: $name\n";
        $details .= "Email: $email\n";
        $details .= "Contact: $phone\n";        
        $details .= "$topic\n";        
        sendEmailToLearner($email, $type, $details);     
        sendEmailToEnquiries($email, $type, $details, $subject);        
    }else{
        http_response_code(400);   
        echo json_encode($errList);
        exit();
    }

}else{
    http_response_code(400); 
    exit();
}

function sendEmailToEnquiries($email, $type, $details, $subject) {
    $headers = "From: $email";    
    $body = "Online ".ucfirst($type).":\n\n";
    $body .= $details;
    $body .= "\n\n(page:".$_SERVER['HTTP_REFERER'].")";
    $to = 'enquiries@cornwall.ac.uk';
    $send = mail($to, $subject, $body, $headers);        
    $send = mail('mtest@cornwall.ac.uk', "$subject (dev team copy)", $body, $headers);        
}

function sendEmailToLearner($email, $type, $details) {    
    $subject = "Cornwall College ".ucfirst($type);
    $body = "Thank for your $type, we recieved the following from you:\n\n";
    $body .= $details;
    $body .= "\n\nA member of our team will be in touch shortly.";
    $headers = "From: enquires@cornwall.ac.uk";
    $send = mail($email, $subject, $body, $headers);
}

function validateEmail($email, &$errList) {
    if (!empty($email)) {
        if (filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
            $errList[] = array("field"=> 'email',"message"=> "A valid email address is required.");
        }else {
            return $email;
        }
    }
}

function validatePhone($phone, &$errList) {
    if (!empty($phone)) {
        $matchPhone = preg_replace('#\(|\)|\s+|-/g#', "", $phone);
        $isPhone = (strlen($matchPhone) > 9 && preg_match(
            '#^(?:(?:(?:00\s?|\+)44\s?|0)(?:1\d{8,9}|[23]\d{9}|7(?:[1345789]\d{8}|624\d{6})))$#',
            $matchPhone) == 1);
        if (!$isPhone) {
            $errList[] = array("field"=> 'phone',"message"=> "A valid contact number is required.");
        }else {
            return $phone;
        }
    }
}

function validatePostField($field, $message, &$errList) {
    if(empty($_POST[$field]))
    {
        $errList[] = array("field"=> $field,"message"=> "$message is required."); 
    }else{        
        return test_input($_POST[$field]);
    }
}

function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}  

?>
