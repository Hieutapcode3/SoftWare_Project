<?php
session_start();
require 'connect.php';  

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_SESSION['CustomerID'])) {
        $customerID = $_SESSION['CustomerID'];
        $data = json_decode(file_get_contents("php://input"), true);
        $dietType = $data['question-1']['dietType']; 
        $checkQuery = "SELECT * FROM formresult WHERE CustomerID = '$customerID'";
        $result = mysqli_query($conn, $checkQuery);

        if (mysqli_num_rows($result) > 0) {
            $updateQuery = "UPDATE formresult SET diettype = '$dietType' WHERE CustomerID = '$customerID'";
            if (mysqli_query($conn, $updateQuery)) {
                echo "Dữ liệu đã được cập nhật thành công!";
            } else {
                echo "Lỗi khi cập nhật Dữ liệu: " . mysqli_error($conn);
            }
        } else {
            $insertQuery = "INSERT INTO formresult (CustomerID, diettype) VALUES ('$customerID', '$dietType')";
            if (mysqli_query($conn, $insertQuery)) {
                echo "Dữ liệu đã được lưu thành công!";
            } else {
                echo "Lỗi khi chèn Dữ liệu: " . mysqli_error($conn);
            }
        }
    } else {
        echo "Chưa đăng nhập!";
    }
}
?>
