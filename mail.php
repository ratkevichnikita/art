

<?php

/**
 * PHPMailer simple contact form example.
 * If you want to accept and send uploads in your form, look at the send_file_upload example.
 */

//Import the PHPMailer class into the global namespace
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\PHPException;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';

if(isset($_POST['send'])) {
    $mail = new PHPMailer(true);
    $mail -> isSMTP();
    $mail -> Host = 'smtp.mail.ru';
    $mail -> SMTPAuth = true;
    $mail -> Username = 'e6wuk1990@gmail.com';
    $mail -> Password = 'Nekit1990!';
    $mail -> SMTPSecture = 'ssl!';
    $mail -> Port = '465';

    $mail -> setFrom('e6wuk1990@mail.ru');
    $mail -> addAddress($_POST['email']);
    $mail -> isHtml(true);
    $mail -> Subject = $_POST['subject'];
    $mail -> Body = $_POST['message'];
    $mail -> send();

    echo "<script>alert('sended')</script>";

};

?>