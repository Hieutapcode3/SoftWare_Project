<?php
session_start(); // Bắt đầu session
require 'connect.php';
$error_login_message = '';
$success_signup_message = '';
$error_signup_message = '';
if ($_POST) {
    if (isset($_POST['dangnhap'])) {
        $user = $_POST['user_name'];
        $pass = $_POST['user_pass'];
        $user = mysqli_real_escape_string($conn, $user);
        $query = "SELECT * FROM user WHERE email = '$user'";
        $result = mysqli_query($conn, $query);
    
        if (mysqli_num_rows($result) > 0 && !empty($user) && !empty($pass)) {
            $row = mysqli_fetch_assoc($result);
            if ($row['email_verified'] == 0) {
                $_SESSION['error_login_message'] = "Tài khoản của bạn chưa được xác thực. Vui lòng kiểm tra email.";
            } 
            else if ($pass === $row['password']) {
                $_SESSION['user'] = $row['CustomerName'];
                $_SESSION['CustomerID'] = $row['CustomerID'];
                if ($row['ischecked'] == 0) {
                    sleep(2);
                    header("Location: index.html");
                } else {
                    sleep(2);
                    header("Location: main_page.php");
                }
                exit();
            } 
            else {
                $_SESSION['error_login_message'] = "Sai tên đăng nhập hoặc mật khẩu!";
            }
        } else {
            $_SESSION['error_login_message'] = "Vui lòng nhập đủ thông tin!";
        }
        header("Location: login.php");
        exit();
    }
    
    
    
    if (isset($_POST['dangky'])) {
        $fullname = $_POST['FullName'];
        $username = $_POST['user_name'];
        $password = $_POST['user_pass'];
    
        if (!empty($fullname) && !empty($username) && !empty($password)) {
            $fullname = mysqli_real_escape_string($conn, $fullname);
            $username = mysqli_real_escape_string($conn, $username);
            $password = mysqli_real_escape_string($conn, $password);
    
            // Tạo mã xác thực ngẫu nhiên
            $verification_code = md5(rand());
    
            $sql = "INSERT INTO `user` (`CustomerName`, `email`, `password`, `verification_code`, `email_verified`) 
                    VALUES ('$fullname', '$username', '$password', '$verification_code', 0)";
    
            if ($conn->query($sql) === TRUE) {
                // Thông tin email
                $to = $username; 
                $subject = "Xác thực tài khoản của bạn";
                $message = "Vui lòng nhấp vào liên kết sau để xác thực tài khoản của bạn: ";
                $message .= "http://localhost/HealthTrackApp/src/verify.php?code=$verification_code";
                $headers = "From: hieupham9155@gmail.com";
                if (mail($to, $subject, $message, $headers)) {
                    $_SESSION['success_signup_message'] = "Vui lòng kiểm tra email để xác thực tài khoản.";
                } else {
                    $_SESSION['error_signup_message'] = "Lỗi trong quá trình gửi email.";
                }
            } else {
                $_SESSION['error_signup_message'] = "Error: " . $conn->error;
            }
        } else {
            $_SESSION['error_signup_message'] = "Vui lòng điền đủ thông tin!";
        }
        header("Location: login.php");
        exit(); 
    }
    
    
}

if (isset($_SESSION['error_login_message'])) {
    $error_login_message = $_SESSION['error_login_message'];
    unset($_SESSION['error_login_message']); 
}
if (isset($_SESSION['success_signup_message'])) {
    $success_signup_message = $_SESSION['success_signup_message'];
    unset($_SESSION['success_signup_message']); 
}
if (isset($_SESSION['error_signup_message'])) {
    $error_signup_message = $_SESSION['error_signup_message'];
    unset($_SESSION['error_signup_message']); 
}
?>





<!DOCTYPE html>
<html lang="es" dir="ltr">
<head>
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0">
    <meta charset="utf-8">
    <link rel="stylesheet" type="text/css" href="../asset/css/login.css">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
</head>
<body>
    <div class="title-page">
        <h1>HEALTHTRACK SYSTEM</h1>
    </div>
    <div class="main">
        <!-- Đăng nhập -->
        <div class="container b-container is-txl is-z200" id="b-container">
            <form class="form" id="b-form" method="POST" action="login.php">
                <h2 class="form_title title">Sign in to Website</h2>
                <div class="social-container">
                    <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
                    <a href="../google/google_config.php" class="social"><i class="fab fa-google-plus-g"></i></a>
                </div>
                <div id="error-message" style="<?php echo !empty($error_login_message) ? 'display: block;' : 'display: none;'; ?>;">
                    <?php echo $error_login_message; ?>
                </div>
                <div id="success-message" style="<?php echo !empty($success_signup_message) ? 'display: block;' : 'display: none;'; ?>">
                    <?php echo $success_signup_message; ?>
                </div>
                <span class="form__span">or use your email account</span>
                <input class="form__input" type="email" placeholder="Email" name="user_name">
                <input class="form__input" type="password" placeholder="Password" name="user_pass">
                <a class="form__link">Forgot your password?</a>
                <button class="form__button button submit" type="submit" name="dangnhap" value="Sign in">SIGN IN</button>
            </form>
        </div>
        
        <!-- Đăng ký -->
        <div class="container a-container is-txl" id="a-container">
            <form class="form" id="a-form" method="POST" action="login.php">
                <h2 class="form_title title">Create Account</h2>
                <div class="social-container">
                    <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
                    <a href="./google/google_config.php" class="social"><i class="fab fa-google-plus-g"></i></a>
                </div>
                <span class="form__span">or use email for registration</span>
                <input class="form__input" type="text" placeholder="Name" name="FullName">
                <input class="form__input" type="email" placeholder="Email" name="user_name">
                <input class="form__input" type="password" placeholder="Password" name="user_pass">
                <button class="form__button button submit" type="submit" name="dangky" value="Sign up">SIGN UP</button>
            </form>
        </div>
        
        <!-- Chuyển đổi giữa Đăng nhập và Đăng ký -->
        <div class="switch is-txr" id="switch-cnt">
            <div class="switch__circle is-txr"></div>
            <div class="switch__circle switch__circle--t is-txr"></div>
            <div class="switch__container is-hidden" id="switch-c1">
                <h2 class="switch__title title">Welcome Back !</h2>
                <p class="switch__description description">To keep connected with us please login with your personal info</p>
                <button class="switch__button button switch-btn">SIGN IN</button>
            </div>
            <div class="switch__container" id="switch-c2">
                <h2 class="switch__title title">Hello Friend !</h2>
                <p class="switch__description description">Enter your personal details and start journey with us</p>
                <button class="switch__button button switch-btn">SIGN UP</button>
            </div>
        </div>
    </div>
    <script src="../asset/js/login.js"></script>
</body>
</html>
