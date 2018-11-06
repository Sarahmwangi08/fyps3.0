
<?php
$user_email = $_POST['Email'];
$user_fname = $_POST['fname'];
$user_lname = $_POST['lname'];
$user_role = $_POST['role'];
$user_id = $_POST['admissionNumber'];


$host = '159.89.135.168';
$db = 'PMSDB';
$username = 'sarahmwangi';
$password = 'SAMAjuwa04';


$conn = mysqli_connect($host,$username,$password,$db);

if ($conn->connect_error){
    echo 'failed';
}else{
    echo 'success';

    $sql = "insert into pms_users (pms_user_fname, pms_user_lname, pms_user_email, pms_adm_no,pms_user_type) values ('$user_fname','$user_lname','$user_email','$user_id','$user_role');";

    if ($conn->query($sql) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();



}
?>