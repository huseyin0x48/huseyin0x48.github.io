<?php

session_start();

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require "vendor/autoload.php";

if(isset($_POST)) {

if($_POST["name"] && $_POST["email"] && $_POST["phone"] && $_POST["message"]) {

    $mail = new PHPMailer(true);

    try {

        // Server Ayarları

        $mail->SMTPDebug = 2;
        $mail->IsSMTP();
        $mail->Host = "ssl://mail.saygihidrolik.com";
        $mail->SMTPAuth = true;
        $mail->Username = "info@saygihidrolik.com";
        $mail->Password = "0sm4N4242";
        $mail->CharSet = "utf8";
        $mail->SMTPSecure = "tls";
        $mail->Port = 465;

        // Alıcı Ayarları

        $mail->setFrom("info@saygihidrolik.com", $_POST["name"]);
        $mail->addAddress("osman@saygihidrolik.com", "");

        // Gönderi Ayarları

        $mail->isHTML();
        $mail->Subject = "WEB SİTE MESAJI";
        $mail->Body = '<p><strong>Gönderen:</strong> ' . $_POST["name"] . '</p>'.
        '<p><strong>Mail:</strong> ' . $_POST["email"] . '</p>'.
        '<p><strong>Telefon:</strong> ' . $_POST["phone"] . '</p>'.
		'<p><strong>Konu:</strong> ' . $_POST["subject"] . '</p>'.
		'<p><strong>Mesaj:</strong> ' . $_POST["message"] . '</p>';


        if($mail->send()) {

            $alert = array(
                "message" => "Mail başarılı bir şekilde gönderildi!",
                "type" => "success"
            );

        } else {

            $alert = array(
                "message" => "Mail gönderilirken bir hata oluştu!",
                "type" => "danger"
            );

        }

        header("location:contact.php");
    
    } catch (Exception $e) {
        $alert = array(
            "message" => $e->getMessage(),
            "type" => "danger"
        );

    }

} else {
    
    $alert = array(
        "message" => "Lütfen tüm alanları doldurunuz!",
        "type" => "danger"
    );
}

$_SESSION["alert"] = $alert;

header("location:contact.php");

}

?>