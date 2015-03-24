<?php
$errList = array();
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if(empty($_POST['email']))
    {
        $errList[] = array("field"=> "email","message"=> "Email Address required.");
                      
    }else{
        $to = test_input($_POST['email']);//"enquires@cornwall.ac.uk";
        $from = test_input($_POST['email']);
    }
    
    if(empty($_POST['name']))
    {
          $errList[] = array("field"=>"name","message"=> "Name is required.");
    }else{
       $name = test_input($_POST['name']); 
    }
     
    if(empty($_POST['contact']))
    {
         $errList[]= array("field"=>"contact","message"=>"Contact number is required.");
    }else{
       $contact = test_input($_POST['contact']); 
    }
       
    if(empty($_POST['interest']))
    {
         $errList[] = array("field"=> "interest","message"=> "Career Interest is required.");
    }else{
       $interest = test_input($_POST['interest']); 
    }
   
    if(count($errList)==0)
   {    
    $headers = "From: $from";
   
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
   }else{
        http_response_code(400);   
        echo json_encode($errList);
        exit();
   }

}else{
    http_response_code(400); 
    exit();
}

function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}

?>
