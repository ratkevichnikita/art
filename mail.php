<?php

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
    } else {
         echo 
            "
            <script>
            window.location.assign('http://d95067vc.beget.tech/thank-you.html')
            </script>
            ";
    }
};

if(isset($_POST["quiz"])) {
    $mail = new PHPMailer(true);
    $mail -> CharSet = 'utf-8';
    $name = $_POST["name"];
    $phone = $_POST["phone"];
    $type = $_POST["type"];
    $size = $_POST["size"];
    $room = $_POST["room"];
    $typeofRepair = $_POST["typeofRepair"];
    $timeofstart = $_POST["timeofstart"];
    $present = $_POST["present"];
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'e6wuk1990@gmail.com';
    $mail->Password = 'josfstjaxkbdjsex';
    $mail->SMTPSecture = 'tls';
    $mail->Port = '587';

    $mail -> setFrom('e6wuk1990@gmail.com');
    $mail -> addAddress('e6wuk1990@mail.ru');
    $mail -> isHtml(true);
    $mail -> Subject = 'Новая заявка';
    $mail -> Body = '
    <h3>Сообщение: </h3>'.
    '<p> Имя: '.$name. '</p>'. 
    '<p> Номер телефона: '.$phone. '</p>'.
    '<p> Тип жилья: '.$type. '</p>'.
    '<p> Общая площать помещения: '.$size. '</p>'.
    '<p> Количество комнат: '.$room. '</p>'.
    '<p> Вид ремонта: '.$typeofRepair. '</p>'.
    '<p> Время начала ремонта: '.$timeofstart. '</p>'.
    '<p> Подарок: '.$present. '</p>'
    ;
    
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