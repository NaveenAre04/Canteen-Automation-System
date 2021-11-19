<?php
require_once 'config.php';
//echo $_POST['person_id'];
$sql1 = "DELETE FROM orders WHERE person_id = $_POST[person_id]";
$sql2 = "DELETE FROM address WHERE person_id = $_POST[person_id]";
$sql3 = "DELETE FROM persons WHERE person_id = $_POST[person_id]";
$stmt1 = mysqli_prepare($link, $sql1);
$stmt2 = mysqli_prepare($link, $sql2);
$stmt3 = mysqli_prepare($link, $sql3);
if($stmt1 && $stmt2 && $stmt3){
    if(mysqli_stmt_execute($stmt1) && mysqli_stmt_execute($stmt2) && mysqli_stmt_execute($stmt3)){
        echo "deleted";
    } else{
        echo "err2";
    }
}else{
 echo "err1";
}
?>