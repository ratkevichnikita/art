<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\PHPException;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';


$mail = new PHPMailer(true);
$mail -> CharSet = 'utf-8';
$name = $_POST["name"];
$phone = $_POST["phone"];
$mail->isSMTP();
$mail->Host = 'smtp.gmail.com';
$mail->SMTPAuth = true;
$mail->Username = 'e6wuk1990@gmail.com';
$mail->Password = 'lkhpngfddolnrcka';
$mail->SMTPSecture = 'tls';
$mail->Port = '587';

$mail -> setFrom('e6wuk1990@gmail.com');
$mail -> addAddress('e6wuk1990@mail.ru');
$mail -> isHtml(true);
$mail -> Subject = 'Новая заявка';
$mail -> Body = '<h3>Сообщение: </h3>'.'<p> Имя: '.$name. '</p>'. '<p> Номер телефона: '.$phone. '</p>';

if (!$mail->send()) {
echo 'Mailer Error: ' . $mail->ErrorInfo;
} 


?>