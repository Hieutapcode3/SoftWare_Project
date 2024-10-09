<?php
session_start();
require 'connect.php';  

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_SESSION['CustomerID'])) {
        $customerID = $_SESSION['CustomerID'];
        $data = json_decode(file_get_contents("php://input"), true);
        $purpose = $data['question-2'];
        $gender = $data['Gender'];
        $height = $data['Height'];
        $weightPresent = $data['CurrentWeight'];
        $weightTarget = $data['TargetWeight'];
        $bodyFat = $data['bodyFat'];

        $customerNameQuery = "SELECT CustomerName FROM user WHERE CustomerID = '$customerID'";
        $customerNameResult = mysqli_query($conn, $customerNameQuery);

        if($purpose === "Giảm cân") {
            $purpose = "Giảm cân";
        } else if ($purpose === "Tăng cơ bắp") {
            $purpose = "Giữ vóc dáng";
        } else {
            $purpose = "Tăng cân";
        }

        if ($customerNameResult && mysqli_num_rows($customerNameResult) > 0) {
            $customerRow = mysqli_fetch_assoc($customerNameResult);
            $customerName = $customerRow['CustomerName']; 
            $checkQuery = "SELECT * FROM BodyInformation WHERE CustomerID = '$customerID'";
            $result = mysqli_query($conn, $checkQuery);

            if (mysqli_num_rows($result) > 0) {
                $updateQuery = "UPDATE BodyInformation 
                                SET Height = '$height', WeightPresent = '$weightPresent', WeightTarget = '$weightTarget', BodyFat = '$bodyFat', Gender = '$gender', CustomerName = '$customerName'
                                WHERE CustomerID = '$customerID'";
                if (mysqli_query($conn, $updateQuery)) {
                    $updateUserQuery = "UPDATE user SET ischecked = TRUE, gender = '$gender' WHERE CustomerID = '$customerID'";
                    mysqli_query($conn, $updateUserQuery);
                    $formResultCheckQuery = "SELECT * FROM formresult WHERE CustomerID = '$customerID'";
                    $formResultCheck = mysqli_query($conn, $formResultCheckQuery);

                    if (mysqli_num_rows($formResultCheck) > 0) {
                        $updateFormResultQuery = "UPDATE formresult 
                                                 SET Purpose = '$purpose', CustomerName = '$customerName', Gender = '$gender'
                                                 WHERE CustomerID = '$customerID'";
                        mysqli_query($conn, $updateFormResultQuery);
                        echo "Dữ liệu đã được cập nhật thành công!";
                    } else {
                        $insertFormResultQuery = "INSERT INTO formresult (CustomerID, Purpose, CustomerName, Gender) 
                                                  VALUES ('$customerID', '$purpose', '$customerName', '$gender')";
                        mysqli_query($conn, $insertFormResultQuery);
                        echo "Dữ liệu đã được lưu thành công!";
                    }
                } else {
                    echo "Lỗi khi cập nhật: " . mysqli_error($conn);
                }
            } else {
                $insertQuery = "INSERT INTO BodyInformation (CustomerID, Height, WeightPresent, WeightTarget, BodyFat, Gender, CustomerName)
                                VALUES ('$customerID', '$height', '$weightPresent', '$weightTarget', '$bodyFat', '$gender', '$customerName')";
                if (mysqli_query($conn, $insertQuery)) {
                    $updateUserQuery = "UPDATE user SET ischecked = TRUE, gender = '$gender' WHERE CustomerID = '$customerID'";
                    mysqli_query($conn, $updateUserQuery);
                    $formResultCheckQuery = "SELECT * FROM formresult WHERE CustomerID = '$customerID'";
                    $formResultCheck = mysqli_query($conn, $formResultCheckQuery);

                    if (mysqli_num_rows($formResultCheck) > 0) {
                        $updateFormResultQuery = "UPDATE formresult 
                                                 SET Purpose = '$purpose', CustomerName = '$customerName', Gender = '$gender'
                                                 WHERE CustomerID = '$customerID'";
                        mysqli_query($conn, $updateFormResultQuery);
                        echo "Dữ liệu đã được cập nhật thành công!";
                    } else {
                        $insertFormResultQuery = "INSERT INTO formresult (CustomerID, Purpose, CustomerName, Gender) 
                                                  VALUES ('$customerID', '$purpose', '$customerName', '$gender')";
                        mysqli_query($conn, $insertFormResultQuery);
                        echo "Dữ liệu đã được lưu thành công!";
                    }
                } else {
                    echo "Lỗi khi chèn dữ liệu: " . mysqli_error($conn);
                }
            }
        } else {
            echo "Không tìm thấy CustomerName cho CustomerID: $customerID";
        }
    } else {
        echo "Chưa đăng nhập!";
    }
}
?>
