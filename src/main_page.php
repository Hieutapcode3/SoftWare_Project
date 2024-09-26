<?php
session_start();
require 'connect.php';

$customerID = $_SESSION['CustomerID'];
$sql = "SELECT bi.bodyFat, bi.height, bi.weightPresent, u.customerName 
        FROM bodyinformation bi
        JOIN user u ON bi.CustomerID = u.CustomerID 
        WHERE bi.CustomerID = '$customerID'";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $bodyFat = $row['bodyFat'];
    $height = $row['height'];
    $weight = $row['weightPresent'];
    $customerName = $row['customerName'];
    $currentBodyFat = ($bodyFat - 0) . '-' . ($bodyFat + 4) . '%';
    
    if ($bodyFat <= 15) {
        $targetBodyFat = ($bodyFat + 6) . '-' . ($bodyFat + 9) . '%';
    } else {
        $targetBodyFat = ($bodyFat - 6) . '-' . ($bodyFat - 9) . '%';
    }
    if($bodyFat < 8)
      $bodyFatIndex = $bodyFat / 5 + 1;
    else
      $bodyFatIndex = $bodyFat / 5 ;
} else {
    echo "Không có dữ liệu";
}

$conn->close();
?>




<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="../asset/css/main_page.css">
  <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
  <link rel="stylesheet" href="../asset/icon/themify-icons/themify-icons.css">
  <link rel="stylesheet" href="../asset/css/flexslider.css"">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

</head>
<body>

  <!-- Thanh điều hướng -->
  <div class="head">
    <div class="header-container">
      <a href="#" class="app-name">
        <div class="health"><p>HEALTH</p></div>
        <div class="system"><p>SYSTEM</p></div>
      </a>
      <div class="nav">
        <a href="#section2">Dinh dưỡng</a>
        <a href="#section3">Tập luyện</a>
        <a href="#service">Dịch vụ</a>
        <a href="#bmi">Tính BMI</a>
      </div>
      <button type="button" class="nav-bar">
        <i class="ti-align-justify"></i>
      </button>
      <div class="container-nav-bar">
          <div class="close-btn">
              <button><i class="ti-close"></i></button> 
          </div>
          <ul>
              <li><button>Điều khoản & Chính sách <i class="ti-angle-right"></i></button></li>
              <li><button>Tài khoản của tôi <i class="ti-angle-right"></i></button></li>
              <li><button>Hỗ trợ</button></li>
              <li><button>Về chúng tôi</button></li>
          </ul>
      </div>
    </div>
  </div>
  
  <!-- Nội dung -->
  <div class="container">
    <div class="muscle">
        <div class="part1">
          <div class="arrow">
            <div class="body_img">
              <div class="body_muscle">
                <img src="../asset/img/bodyfat_<?php echo $bodyFatIndex; ?>.jpg" alt="" class="img-1">
              </div>
            </div>
            <div class="body_img">
              <div class="body_muscle">
                <img src="../asset/img/bodytarget_6.jpg" alt="" class="img-2">
              </div>
            </div>
          </div>
        </div>
      <div class="part2">
        <div class="time">
          <p>Bây giờ</p>
        </div>
        <div class="time">
          <p>6 tháng</p>
        </div>
      </div>
      <div class="part3">
        <div class="body-time">
            <span class="span1">Mỡ cơ thể</span>
            <span class="span2 current-bodyFat"><?php echo $currentBodyFat; ?></span>
            <p>Cơ bắp cơ thể</p>
            <div class="muscle-progress">
              <div class="muscle-bar-show"></div>
              <div class="muscle-bar-show"></div>
              <div class="muscle-bar"></div>
              <div class="muscle-bar"></div>
              <div class="muscle-bar"></div>
            </div>
        </div>
        <div class="body-time">
            <span class="span1">Mỡ cơ thể</span>
            <span class="span2 target-bodyFat"><?php echo $targetBodyFat; ?></span>
            <p>Cơ bắp cơ thể</p>
            <div class="muscle-progress">
              <div class="muscle-bar-show"></div>
              <div class="muscle-bar-show"></div>
              <div class="muscle-bar-show"></div>
              <div class="muscle-bar-show"></div>
              <div class="muscle-bar"></div>
            </div>
        </div>
      </div>
      <p class="canh-cao">*Hình ảnh không nhằm mục đích đại diện cho người dùng. Mỗi người sẽ có kết quả khác nhau và không được đảm bảo.</p>
    </div>
    <div id="summary" class="summary">
      <h2>Tóm tắt cá nhân dựa trên câu trả lời của bạn</h2>
      
      <!-- Chỉ số BMI hiện tại -->
      <div class="summary-item">
        <h4>Chỉ số BMI hiện tại 
          <span class="info-icon" onclick="showBMIInfo()"><i class="ti-help-alt"></i></span> <!-- Dấu chấm than -->
        </h4>
        <div class="summary-content">
          <div class="bmi-value"></div>
          <div class="index-bmi">
            <span>15</span>
            <span>18.5</span>
            <span>25</span>
            <span>30</span>
            <span>40</span>
          </div> 
          <div class="bmi-progress">
            <div class="bmi-progress-bar"></div>
          </div>
          <div class="bmiResult">
            <p>Thiếu cân</p>
            <p>Béo phì</p>
          </div>
          <p class="calcu-result">Béo phì</p>
          <p>Chỉ số khối cơ thể (BMI) là chỉ số sử dụng chiều cao và cân nặng của bạn để tính xem cân nặng của bạn có khỏe mạnh hay không.</p>
        </div>
      </div>
      
      <!-- Hộp thoại thông tin chi tiết -->
      <div class="overlay" id="bmiOverlay"></div>
      <div class="info-popup" id="bmiPopup">
        <span class="close-btn" onclick="hideBMIInfo()">&times;</span>
        <h4>Chỉ Số Khối Cơ Thể Hiện Tại (BMI)</h4>
        <p>Chỉ số khối cơ thể (BMI) là chỉ số khối lượng và chiều cao của một người.
          Chỉ số BMI là cách đơn giản và thuận tiện để phân loại khái quát người thiếu cân, bình thường, hơi thừa cân hay béo phì.</p>
        <p>BMI dưới 18.5: Thiếu cân<br>
        BMI từ 18.5 đến 24.9: Bình thường<br>
        BMI từ 25 đến 29.9: Thừa cân<br>
        BMI từ 30 trở lên: Béo phì</p>
      </div>
      
      <!-- Lượng calo đề xuất và Lượng nước đề xuất -->
      <div class="summary-grid">
        <!-- Lượng calo đề xuất -->
        <div class="summary-item">
          <div class="sumary-container">
            <div class="recommended-label">Được đề xuất</div> <!-- Mác góc phải trên -->
            <div class="summary-header">
              <div class="icon-sum">🍔</div>
              <div class="summary-content">
                <h4>Lượng calo hàng ngày</h4>
                <div id="calories-value" class="calories-value"></div> <!-- Dữ liệu Calo -->
              </div>
            </div>
            <div class="calories-progress">
              <div class="progress-bar">
                <div class="progress-indicator"></div>
              </div>
            </div>
            <div class="progress-labels">
              <span class="label-left">1000 kcal</span>
              <span class="label-right">3000 kcal</span>
            </div>
          </div>
        </div>
    
        <!-- Lượng nước đề xuất -->
        <div class="summary-item">
          <div class="sumary-container">
            <div class="recommended-label">Được đề xuất</div> <!-- Mác góc phải trên -->
            <div class="summary-header">
              <div class="icon-sum">
                💧
              </div>
              <div class="summary-content">
                <h4>Lượng nước uống hàng ngày</h4>
                <div id="water-value" class="water-value"></div> <!-- Dữ liệu Nước -->
              </div>
            </div>
            <div class="water-progress">
              <div class="water-progress-bar">
                  <div class="water"></div>
                  <div class="water"></div>
                  <div class="water"></div>
                  <div class="water"></div>
                  <div class="water"></div>
                  <div class="water"></div>
                  <div class="water"></div>
                  <div class="water"></div>
              </div>
            </div>
          </div>
        </div>



      </div>
    </div>

    <div class="target">
      <h2>Kế hoạch được cá nhân hoá dành cho <?php echo $customerName; ?> đã sẵn sàng!</h2>
      <div></div>
      <div></div>
      <div class="receive">
        <ul>
          <li><i class="fa-solid fa-dumbbell"></i> Chương trình tập luyện được cá nhân hoá</li>
          <li><i class="fa-solid fa-apple-alt"></i> Chế độ dinh dưỡng hợp lý</li>
          <li><i class="fa-solid fa-calendar-check"></i> Kế hoạch tập luyện rõ ràng và dễ thực hiện theo</li>
          <li><i class="fa-solid fa-chart-line"></i> Kết quả có thể nhìn thấy sau tháng đầu tiên</li>
          <li><i class="fa-solid fa-chart-pie"></i> Theo dõi và phân tích tiến độ</li>
        </ul>
      </div>
    </div>

    <div class="workoutPlanSection">
      <h2>Thực hiện các bài tập của chúng tôi để đạt được mục tiêu của bạn</h2>
      <p class="one">Trong cơ sở dữ liệu của chúng tôi, có hơn 200 bài tập cho các bộ phận khác nhau trên cơ thể
      </p>
      <figure class="half-circle">
        <div>
          <span>
            <img src="../asset/img/circle.svg" alt="">
          </span>
        </div>
        <figcaption>
          <span>Hiện tại</span>
          <strong><?php echo $weight; ?>kg</strong>
          <p>
            <span>100</span>
            <span>70</span>
          </p>
        </figcaption>
      </figure>
      <ul>
        <li>
          <i>🔥</i>
          <span>Chúng tôi kết hợp các bài tập tĩnh và động để đạt hiệu quả tốt nhất.
          </span>
        </li>
        <li>
          <i>💪</i>
          <span>Bạn sẽ thấy những thay đổi cơ thể đầu tiên sau 8 lần tập luyện.
          </span>
        </li>
      </ul>
    </div>
    
    
    <div class="mealPlanSection">
      <div class="mealPlanText">
        <h2>Kế hoạch ăn dựa trên mục tiêu</h2>
        <p>Kế hoạch ăn được điều chỉnh theo sở thích và yêu cầu của bạn</p>
        <p>Công thức nấu ăn rất dễ thực hiện, bạn có thể ăn bất cứ thứ gì bạn muốn và có được vóc dáng đẹp hơn</p>
      </div>
      <img src="../asset/img/mealPlan.webp" alt="meal plan image">
    </div>
    
    <div class="habitSystemSection">
      <img src="../asset/img/habitSystem.webp" alt="habit system image">
      <div class="habitSystemText">
        <h2>Hệ thống xây dựng thói quen</h2>
        <p>Cải thiện không chỉ vóc dáng mà còn phát triển những thói quen và thể lực lành mạnh</p>
        <p>Với HealthTrack System, bạn có thể giảm mức độ căng thẳng, cải thiện ham muốn tình dục và thử sức với những thử thách thay đổi cuộc sống khác nhau.</p>
      </div>
    </div>
    
    <!-- Section Nutrition and Workout -->
    <div id="nutrition-and-workout" class="combined-section">
      <div id="main-slider" class="flexslider">
        <ul class="slides">
          <!-- Slide 1: Nutrition Plan -->
          <li class="slide-content">
            <div class="flex-caption">
              <h3>KẾ HOẠCH DINH DƯỠNG</h3>
              <ul>
                <li><span>☑️</span> Xây dựng thói quen ăn uống lành mạnh</li>
                <li><span>☑️</span> Cân bằng dinh dưỡng để đạt hiệu quả tối ưu</li>
                <li><span>☑️</span> Tạo lối sống bền vững</li>
              </ul>
              <a href="#" class="cta-button">Khám phá thêm</a>
            </div>
          </li>
          <!-- Slide 2: Workout Plan -->
          <li class="slide-content">
            <div class="flex-caption">
              <h3>KẾ HOẠCH TẬP LUYỆN</h3>
              <ul>
                <li><span>☑️</span> Xây dựng thói quen và phát triển các kỹ thuật tập thể dục chính xác</li>
                <li><span>☑️</span> Giảm mỡ thừa trong cơ thể và cải thiện cường độ tập luyện</li>
                <li><span>☑️</span> Đạt được mục tiêu của bạn và thay đổi cuộc sống của mình mãi mãi</li>
              </ul>
              <a href="#" class="cta-button">Nhận kế hoạch tập luyện</a>
            </div>
          </li>
        </ul>
      </div>
    </div>
    

    <div id="service"> 
      <div class="container">
      
        <div class="services">
          <div class="row">
            <div class="col-12">
              <div class="center">
                <h2 class="center">Dịch Vụ Tuyệt Vời Của Chúng Tôi</h2>
                <p>Khám phá nhiều dịch vụ mà chúng tôi cung cấp nhằm đáp ứng nhu cầu sức khỏe và thể chất của bạn. Đội ngũ của chúng tôi cam kết mang đến trải nghiệm tốt nhất.</p>
              </div>
            </div>
          </div>
          
          <div class="row">
            <div class="col-4 service-box"> 
              <div class="service-content">
                <i class="material-icons">track_changes</i>
                <h3>Lớp Yoga</h3>
              </div>
              <p>Trải nghiệm sự bình yên và cải thiện tính linh hoạt với các buổi học yoga do chuyên gia hướng dẫn, phù hợp với mọi cấp độ.</p>
            </div>
            <div class="col-4 service-box">
              <div class="service-content">
                <i class="material-icons">settings_input_svideo</i>
                <h3>Huấn Luyện Cá Nhân</h3>
              </div>
              <p>Nhận kế hoạch tập luyện cá nhân hóa và hướng dẫn một kèm một để giúp bạn đạt được mục tiêu thể chất nhanh hơn.</p>
            </div>
            <div class="col-4 service-box">
              <div class="service-content">
                <i class="material-icons">queue_music</i>
                <h3>Hướng Dẫn Dinh Dưỡng</h3>
              </div>
              <p>Nhận tư vấn dinh dưỡng và kế hoạch ăn uống từ các chuyên gia dinh dưỡng chứng nhận để nâng cao hành trình sức khỏe của bạn.</p>
            </div>
          </div>
    
          <div class="row">
            <div class="col-4 service-box">
              <div class="service-content">
                <i class="material-icons">my_location</i>
                <h3>Đánh Giá Thể Lực</h3>
              </div>
              <p>Đánh giá toàn diện để xác định mức độ thể lực của bạn và phát triển kế hoạch phù hợp.</p>
            </div>
            <div class="col-4 service-box">
              <div class="service-content">
                <i class="material-icons">shuffle</i>
                <h3>Các Hội Thảo Sức Khỏe</h3>
              </div>
              <p>Tham gia các hội thảo của chúng tôi tập trung vào sức khỏe tâm thần, quản lý căng thẳng và sức khỏe tổng thể.</p>
            </div>
            <div class="col-4 service-box">
              <div class="service-content">
                <i class="material-icons">tab_unselected</i>
                <h3>Sự Kiện Cộng Đồng</h3>
              </div>
              <p>Tham gia vào các sự kiện cộng đồng của chúng tôi nhằm thúc đẩy sức khỏe và thể chất thông qua các hoạt động vui vẻ.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    
    
    
    


  

    <!-- Form tính BMI -->
    <div id="bmi" class="bmi-section">
      <div class="bmi-section-title">Tính chỉ số BMI của bạn</div>
      <form class="bmi-calculator-form" id="bmiForm">
        <label for="height">Chiều cao (cm):</label>
        <input type="number" id="height" placeholder="Nhập chiều cao của bạn" value = "<?php echo $height; ?>">
    
        <label for="weight">Cân nặng (kg):</label>
        <input type="number" id="weight" value = "<?php echo $weight; ?>" placeholder="Nhập cân nặng của bạn" >
    
        <button id ="bmiBtn" type="button" onclick="calculateBMI()">Tính BMI</button>
      </form>
      <div class="bmi-result" id="bmiResult"></div>
    </div>
    

  </div>

  <!-- Footer -->
  <div class="footer">
    <div class="contact-follow">
        <h2>Liên hệ và theo dõi</h2>
        <div class="facebook">
            <a href="https://www.instagram.com/yourprofile" target="_blank" aria-label="Instagram">Instagram</a>
            <a href="https://www.instagram.com/yourprofile" target="_blank" aria-label="Instagram">
                <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" width="30" height="30">
            </a>
        </div>
        <div class="instagram">
            <a href="https://www.facebook.com/yourprofile" target="_blank" aria-label="Facebook">Facebook</a>
            <a href="https://www.facebook.com/yourprofile" target="_blank" aria-label="Facebook">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" width="30" height="30">
            </a>
        </div>
        
    </div>
    <div class="address">
        <p>Địa chỉ: Hà Nội</p>
        <p>Điện thoại: 123-456-JQKA</p>
        <p>Email: HealthTrackSystem@gmail.com</p>
    </div>
</div>

</div>

  <script src="../asset/js/main_page.js"></script>

</body>