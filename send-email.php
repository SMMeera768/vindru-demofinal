<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    // Get form data
    $name = htmlspecialchars($_POST['name'] ?? '');
    $company = htmlspecialchars($_POST['company'] ?? '');
    $country = htmlspecialchars($_POST['country'] ?? '');
    $city = htmlspecialchars($_POST['city'] ?? '');
    $phone = htmlspecialchars($_POST['phone'] ?? '');
    $email = htmlspecialchars($_POST['email'] ?? '');
    $requirement = htmlspecialchars($_POST['requirement'] ?? '');
    
    // Email configuration
    $to = "accounts@vindru.com";
    $subject = "New Inquiry from $name - VINDRU Website";
    
    $message = "
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; }
            .container { padding: 20px; background: #f5f5f5; }
            .content { background: white; padding: 20px; border-radius: 8px; }
            h2 { color: #f97316; }
            .field { margin: 15px 0; }
            .label { font-weight: bold; color: #333; }
            .value { color: #666; margin-top: 5px; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='content'>
                <h2>🔔 New Contact Form Submission</h2>
                
                <div class='field'>
                    <div class='label'>Name:</div>
                    <div class='value'>$name</div>
                </div>
                
                <div class='field'>
                    <div class='label'>Company:</div>
                    <div class='value'>$company</div>
                </div>
                
                <div class='field'>
                    <div class='label'>Country:</div>
                    <div class='value'>$country</div>
                </div>
                
                <div class='field'>
                    <div class='label'>City:</div>
                    <div class='value'>$city</div>
                </div>
                
                <div class='field'>
                    <div class='label'>Phone:</div>
                    <div class='value'>$phone</div>
                </div>
                
                <div class='field'>
                    <div class='label'>Email:</div>
                    <div class='value'>$email</div>
                </div>
                
                <div class='field'>
                    <div class='label'>Requirement:</div>
                    <div class='value'>$requirement</div>
                </div>
            </div>
        </div>
    </body>
    </html>
    ";
    
    // Email headers
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8\r\n";
    $headers .= "From: VINDRU Website <accounts@vindru.com>\r\n";
    $headers .= "Reply-To: $email\r\n";
    
    // Send email
    if(mail($to, $subject, $message, $headers)) {
        echo json_encode([
            'success' => true, 
            'message' => 'Thank you! Your inquiry has been sent successfully.'
        ]);
    } else {
        echo json_encode([
            'success' => false, 
            'message' => 'Failed to send email. Please try again.'
        ]);
    }
} else {
    echo json_encode([
        'success' => false, 
        'message' => 'Invalid request method'
    ]);
}
?>
