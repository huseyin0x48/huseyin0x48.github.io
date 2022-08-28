<?php

session_start();

?>

<!DOCTYPE html>
<html lang="tr">

<head>

    <meta charset="UTF-8">
    <title>PHPMailer kullanarak mail gönderme işlemi</title>
    <link rel="stylesheet" href="css/bootstrap.min.css">

</head>

<body>

    <div class="container">
        <h3 class="text-center mt-5 mb-5">PHP İle Mail Gönderme</h3>
        <div class="row justify-content-center">
            <div class="col-md-4">

                <?php if(isset($_SESSION["alert"])) { ?>

                    <div class="alert alert-<?php echo $_SESSION["alert"] ["type"]; ?>">
                        <?php echo $_SESSION["alert"] ["message"]; ?>
                    </div>

                    <?php unset($_SESSION["alert"]); ?>

                <?php } ?>

                <form action="send_email.php" method="post">
                    <div class="form-group">
                        <label>Gönderilecek Adres</label>
                        <input class="form-control" type="email" required name="to_email">
                    </div>
                    <div class="form-group">
                        <label>Gönderenin Adı</label>
                        <input class="form-control" type="text" required name="sender">
                    </div>
                    <div class="form-group">
                        <label>Konu</label>
                        <input class="form-control" type="text" name="subject">
                    </div>
                    <div class="form-group">
                        <label>Mesaj</label>
                        <textarea name="message" cols="30" rows="10" class="form-control" required></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">Gönder</button>
                    <button type="reset" class="btn btn-danger">Temizle</button>
                </form>

            </div>
        </div>
    </div>

</body>

</html>