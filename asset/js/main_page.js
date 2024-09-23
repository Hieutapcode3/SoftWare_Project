document.addEventListener("DOMContentLoaded", function () {
  calculateBMI();
});

function calculateBMI() {
  const height = parseFloat(document.getElementById("height").value) / 100; // Chuyển chiều cao từ cm sang mét
  const weight = parseFloat(document.getElementById("weight").value);
  const calo = document.getElementById("calories-value");
  const water = document.getElementById("water-value");

  if (!height || !weight || height <= 0 || weight <= 0) {
    document.getElementById("bmiResult").textContent =
      "Vui lòng nhập giá trị hợp lệ!";
    return;
  }
  document.getElementById("bmiBtn").addEventListener("click", function () {
    document.querySelector(".summary").scrollIntoView({
      behavior: "smooth", // Cuộn mượt mà
    });
  });

  const bmi = (weight / (height * height)).toFixed(2);
  const leftPercentage = (bmi / 50) * 100;
  const progressBar = document.querySelector(".bmi-progress-bar");
  if (leftPercentage > 100)
    progressBar.style.setProperty("--marker-left", `100%`);
  else progressBar.style.setProperty("--marker-left", `${leftPercentage}%`);
  let resultMessage = `Chỉ số BMI của bạn là: ${bmi}. `;

  if (bmi < 18.5) {
    resultMessage += "Cơ thể bạn đang thiếu cân.";
  } else if (bmi < 24.9) {
    resultMessage += "Bạn có cơ thể cân đối.";
  } else if (bmi < 29.9) {
    resultMessage += "Cơ thể bạn đang thừa cân.";
  } else {
    resultMessage += "Cơ thể bạn đang béo phì.";
  }

  document.querySelector(".bmi-value").textContent = `${bmi} BMI`;
  document.getElementById("bmiResult").textContent = resultMessage;

  // Tính toán lượng calo (Công thức đơn giản: cân nặng * 24 kcal)
  const dailyCalories = weight * 24;
  calo.textContent = `${Math.round(dailyCalories)} kcal`;

  // Tính toán lượng nước (cân nặng * 35ml)
  const waterIntake = weight * 35;
  water.textContent = `${Math.round(waterIntake)} ml`;

  // Cập nhật thanh tiến trình với giá trị lượng calo
  updateCaloriesProgress(dailyCalories);

  updateWaterProgress(waterIntake / 1000); // Chia cho 1000 để chuyển đổi từ ml sang lít
}

const slides = document.querySelectorAll("#main-slider .slides > li");
let currentSlide = 0;
const slideInterval = setInterval(nextSlide, 5000); // Thay đổi ảnh sau mỗi 3 giây

function nextSlide() {
  slides[currentSlide].style.display = "none"; // Ẩn slide hiện tại
  currentSlide = (currentSlide + 1) % slides.length; // Tăng biến chỉ số slide, vòng lại nếu đến slide cuối
  slides[currentSlide].style.display = "block"; // Hiển thị slide tiếp theo
}

function updateCaloriesProgress(value) {
  const progressBar = document.querySelector(".calories-progress");

  // Tính phần trăm từ giá trị calo, giới hạn từ 1000 đến 5000
  const percentage = Math.max(
    0,
    Math.min(100, ((value - 1000) / (3000 - 1000)) * 100)
  );

  // Cập nhật thuộc tính dữ liệu và giá trị CSS cho thanh tiến trình
  progressBar.setAttribute("data-value", percentage);
  progressBar.style.setProperty("--progress-value", percentage);

  // Thêm class để hiển thị chỉ báo
  progressBar.classList.add("active");
}

function showBMIInfo() {
  document.getElementById("bmiOverlay").style.display = "block"; // Hiển thị lớp phủ
  document.getElementById("bmiPopup").style.display = "block"; // Hiển thị hộp thoại
  document.body.style.overflow = "hidden"; // Ngăn cuộn trang
}

function hideBMIInfo() {
  document.getElementById("bmiOverlay").style.display = "none"; // Ẩn lớp phủ
  document.getElementById("bmiPopup").style.display = "none"; // Ẩn hộp thoại
  document.body.style.overflow = "auto"; // Cho phép cuộn trang
}

function updateWaterProgress(liters) {
  const maxLiters = 2.4; // Tổng lượng nước tối đa (lít)
  const numberOfDivs = document.querySelectorAll(".water").length; // Số lượng div đại diện cho mức nước
  const litersPerDiv = maxLiters / numberOfDivs; // Số lít mà mỗi div đại diện

  document.querySelectorAll(".water").forEach((div, index) => {
    if (liters > index * litersPerDiv) {
      div.style.backgroundImage = 'url("../asset/img/glass_full.svg")'; // Đường dẫn đến ảnh ly đầy
    } else {
      div.style.backgroundImage = 'url("../asset/img/glass_empty.svg")'; // Đường dẫn đến ảnh ly rỗng
    }
  });
}
const navBarButton = document.querySelector(".nav-bar");
const containerNavBar = document.querySelector(".container-nav-bar");
const closeButton = document.querySelector(".close-btn button");
const ulElement = document.querySelector(".container-nav-bar ul");
navBarButton.addEventListener("click", () => {
  containerNavBar.style.display = "block";
  setTimeout(() => {
    containerNavBar.classList.add("show");
  }, 100);
});
closeButton.addEventListener("click", () => {
  containerNavBar.classList.remove("show");
  setTimeout(() => {
    containerNavBar.style.display = "none";
  }, 500);
});
document.addEventListener("click", (event) => {
  const isClickInside =
    ulElement.contains(event.target) ||
    closeButton.contains(event.target) ||
    navBarButton.contains(event.target);

  if (!isClickInside) {
    containerNavBar.classList.remove("show");
    setTimeout(() => {
      containerNavBar.style.display = "none";
    }, 500);
  }
});
