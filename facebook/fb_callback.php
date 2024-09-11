<?php
session_start();
require '../vendor/autoload.php'; // Đảm bảo đã cài SDK của Facebook bằng Composer
require 'db_connect.php'; // Kết nối với database

use Facebook\Facebook;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Lấy dữ liệu từ JSON request
    $input = json_decode(file_get_contents('php://input'), true);
    $name = $input['name'];
    $email = $input['email'];
    $facebookId = $input['id'];
    $sql = "SELECT * FROM users WHERE email = '$email'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $_SESSION['user'] = $name;
        echo json_encode(['success' => true]);
    } else {
        $randomPassword = bin2hex(random_bytes(8)); // Tạo mật khẩu ngẫu nhiên dài 16 ký tự
        $hashedPassword = password_hash($randomPassword, PASSWORD_DEFAULT); // Hash mật khẩu

        // Nếu người dùng chưa tồn tại, thêm vào cơ sở dữ liệu
        $sql = "INSERT INTO users (name, email, password) VALUES ('$name', '$email', '$hashedPassword')";
        if ($conn->query($sql) === TRUE) {
            $_SESSION['user'] = $name;
            echo json_encode(['success' => true, 'password' => $randomPassword]); 
        } else {
            echo json_encode(['success' => false, 'message' => 'Error: ' . $conn->error]);
        }
    }

    $conn->close();
}
?>
