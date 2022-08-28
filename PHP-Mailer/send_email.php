<?php

session_start();

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require "vendor/autoload.php";

if(isset($_POST)) {

if($_POST["to_email"] && $_POST["sender"] && $_POST["message"]) {

    $mail = new PHPMailer(true);

    try {

        // Server Ayarları

        $mail->SMTPDebug = 2;
        $mail->IsSMTP();
        $mail->Host = "ssl://smtp.gmail.com";
        $mail->SMTPAuth = true;
        $mail->Username = "example@mail.com";
        $mail->Password = "examplePass";
        $mail->CharSet = "utf8";
        $mail->SMTPSecure = "tls";
        $mail->Port = 465;

        // Alıcı Ayarları

        $mail->setFrom("sendedMail@mail.com", $_POST["sender"]);
        $mail->addAddress($_POST["to_email"], "");

        // Gönderi Ayarları

        $mail->isHTML();
        $mail->Subject = $_POST["subject"];
        $mail->Body = $_POST["message"];


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

        header("location:index.php");
    
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

header("location:index.php");

}

?>