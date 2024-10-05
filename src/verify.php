<?php
session_start(); // Khởi động session
require 'connect.php';

if (isset($_GET['code'])) {
    $verification_code = $_GET['code'];

    $query = "SELECT * FROM user WHERE verification_code = '$verification_code'";
    $result = mysqli_query($conn, $query);

    if (mysqli_num_rows($result) > 0) {

        $update_query = "UPDATE user SET email_verified = 1 WHERE verification_code = '$verification_code'";
        if (mysqli_query($conn, $update_query)) {
            $_SESSION['success_signup_message'] = "Đăng ký thành công. Vui lòng đăng nhập!";
        } else {
            $_SESSION['error_login_message'] = "Lỗi trong quá trình xác thực.";
        }
    } else {
        $_SESSION['error_login_message'] = "Mã xác thực không hợp lệ!";
    }
} else {
    $_SESSION['error_login_message'] = "Không tìm thấy mã xác thực.";
}
header("Location: login.php"); 
exit(); 
?>
