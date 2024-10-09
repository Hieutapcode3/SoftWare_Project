<?php
session_start();
require 'connect.php';

if (isset($_SESSION['CustomerID'])) {
    $customerID = $_SESSION['CustomerID'];

    $query = "SELECT Gender, Purpose,dietType FROM formresult WHERE CustomerID = '$customerID' LIMIT 1";
    $result = mysqli_query($conn, $query);

    if ($result && mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        echo json_encode([
            'gender' => $row['Gender'],
            'purpose' => $row['Purpose'],
            'dietType' => $row['dietType']
        ]);
    } else {
        echo json_encode([
            'error' => 'Không tìm thấy thông tin người dùng!'
        ]);
    }
} else {
    echo json_encode([
        'error' => 'Chưa đăng nhập!'
    ]);
}
?>
