<?php
require_once 'config.php';
//echo $_POST['person_id'];
$sql1 = "DELETE FROM orders WHERE order_id = $_POST[order_id]";
$stmt1 = mysqli_prepare($link, $sql1);
if($stmt1){
    if(mysqli_stmt_execute($stmt1)){
        echo "deleted";
    } else{
        echo "err2";
    }
}else{
 echo "err1";
}
?>