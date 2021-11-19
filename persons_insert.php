<!DOCTYPE html>
<html>
<?php
require_once 'config.php';
?>
<head>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <script src="https://kit.fontawesome.com/2e4c9e68b5.js" crossorigin="anonymous"></script>
    <title>Page Title</title>
</head>
<?php
 $sql = "INSERT INTO persons (firstname, lastname, gender, age) VALUES ('$_POST[firstname]','$_POST[lastname]','$_POST[gender]','$_POST[age]')";
 if($stmt = mysqli_prepare($link, $sql)){
    if(mysqli_stmt_execute($stmt)){
?>
<body>
    <div class="container mt-5" style="text-align:center">
        <h1 style="color:#008000" class="mb-2"><i class="fas fa-check-circle"></i></h1>
        The Record was successfully inserted<br>
        Go back to <a href="/">HOME PAGE</a>
    </div>
</body>
<?php
    } else{
        echo "Oops! Something went wrong. Please try again later.";
    }
 }else {
     echo "error";
 }

?>
</html>
