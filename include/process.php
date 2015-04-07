<?php

$errList = array();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    $email = validatePostField('email', 'Email Address', $errList);
    $name = validatePostField('name', 'Name', $errList);
    $phone = validatePostField('phone', 'Contact number', $errList);        
    
    $type = test_input($_POST['source']);        
    
    switch ($type) {
        case "application":
            $careerInterest = validatePostField('interest', 'Career Interest', $errList);        
            $topic = "Career Interest: $careerInterest";
            $subject = $name.": ".$careerInterest;
            break;
        case "question":
            $question = validatePostField('question', 'Question', $errList);        
            $topic = "Question: $question";
            $subject = $name.": Question";
            break; 
    } 
    
    if(count($errList)==0) {         
        $details  = "Name: $name\n";
        $details .= "Email: $email\n";
        $details .= "Contact: $phone\n";        
        $details .= "$topic\n";        
        sendEmailToEnquiries($email, $type, $details, $subject);
        sendEmailToLearner($email, $type, $details);     
        echo "here!";
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
    //$to = 'enquiries@cornwall.ac.uk';
    $to = $email;
    $send = mail($to, $subject, $body, $headers);        
}

function sendEmailToLearner($email, $type, $details) {    
    $subject = "Cornwall College ".ucfirst($type);
    $body = "Thank for your $type, we recieved the following from you:\n\n";
    $body .= $details;
    $body .= "\n\nA member of our team will be in touch shortly.";
    $headers = "From: enquires@cornwall.ac.uk";
    $send = mail($email, $subject, $body, $headers);
}

function validatePostField($field, $message, $errList) {
     if(empty($_POST[$field]))
    {
        $errList[] = array("field"=> $data,"message"=> "$message is required.");                      
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
