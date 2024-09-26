<?php
session_start();
require 'connect.php';  
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_SESSION['CustomerID'])) {
        $customerID = $_SESSION['CustomerID'];
        $data = json_decode(file_get_contents("php://input"), true);
        $height = $data['Height'];
        $weightPresent = $data['CurrentWeight'];
        $weightTarget = $data['TargetWeight'];
        $bodyFat = $data['bodyFat'];
        $checkQuery = "SELECT * FROM BodyInformation WHERE CustomerID = '$customerID'";
        $result = mysqli_query($conn, $checkQuery);

        if (mysqli_num_rows($result) > 0) {
            $updateQuery = "UPDATE BodyInformation 
                            SET Height = '$height', WeightPresent = '$weightPresent', WeightTarget = '$weightTarget', BodyFat = '$bodyFat'
                            WHERE CustomerID = '$customerID'";
            if (mysqli_query($conn, $updateQuery)) {
                echo "Dữ liệu đã được cập nhật thành công!";
            } else {
                echo "Lỗi khi cập nhật: " . mysqli_error($conn);
            }
        } else {
            $insertQuery = "INSERT INTO BodyInformation (CustomerID, Height, WeightPresent, WeightTarget, BodyFat)
                            VALUES ('$customerID', '$height', '$weightPresent', '$weightTarget', '$bodyFat')";
            if (mysqli_query($conn, $insertQuery)) {
                echo "Dữ liệu đã được lưu thành công!";
            } else {
                echo "Lỗi khi chèn dữ liệu: " . mysqli_error($conn);
            }
        }
    } else {
        echo "Chưa đăng nhập!";
    }
}
?>
