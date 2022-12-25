

<?php

/**
 * PHPMailer simple contact form example.
 * If you want to accept and send uploads in your form, look at the send_file_upload example.
 */

//Import the PHPMailer class into the global namespace
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\PHPException;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

if(isset($_POST["send"])) {
   
    $mail = new PHPMailer(true);
    $mail -> CharSet = 'utf-8';
    $name = $_POST["name"];
    $phone = $_POST["phone"];
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'e6wuk1990@gmail.com';
    $mail->Password = 'josfstjaxkbdjsex';
    $mail->SMTPSecture = 'ssl';
    $mail->Port = '587';

    $mail -> setFrom('e6wuk1990@gmail.com');
    $mail -> addAddress('e6wuk1990@mail.ru');
    $mail -> isHtml(true);
    $mail -> Subject = 'Новая заявка';
    $mail -> Body = '<h3>Сообщение: </h3>'.'<p> Имя: '.$name. '</p>'. '<p> Номер телефона: '.$phone. '</p>';
    
    if (!$mail->send()) {
    echo 'Mailer Error: ' . $mail->ErrorInfo;
    } else {
         echo 
            "
            <script>
            window.location.assign('http://d95067vc.beget.tech/thank-you.html')
            </script>
            ";
    }
};

?>