<?php
require 'connect.php';
  $error_message = '';  // Biến để lưu thông báo lỗi
  if ($_POST) {
    if (isset($_POST['dangnhap'])) {
      $user = $_POST['user_name'];
      $pass = $_POST['user_pass'];
      $user = mysqli_real_escape_string($conn, $user);
      $query = "SELECT * FROM customers WHERE email = '$user'";
      $result = mysqli_query($conn, $query);
      if (mysqli_num_rows($result) > 0 && !empty($user) && !empty($pass)) {
        $row = mysqli_fetch_assoc($result);
        if ($pass === $row['password']) {
          echo "Mat khau chinh xac";
          $_SESSION['user'] = $user;
          header("Location: index.php");
          exit();
        } else {
          $error_message = "Tài khoản hoặc mật khẩu không chính xác";  
        }
      } else {
        $error_message = "Tài khoản hoặc mật khẩu không chính xác";  
      }
    }
  }
?>
