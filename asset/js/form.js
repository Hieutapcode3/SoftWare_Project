document.addEventListener("DOMContentLoaded", function () {
  const userAnswers = {};
  const allQuestions = document.querySelectorAll(".form-selection");
  let currentQuestionIndex = 0;
  const backButton = document.querySelector(".back-btn");
  const completedText = document.querySelector(".completed-text");
  const completedBar = document.querySelector(".completed-bar");
  // Question - 2 to 3
  const reduceWeightDiv = document.getElementById("reduce-weight");
  const gainMuscleDiv = document.getElementById("gain-muscal");
  const cutMuscleDiv = document.getElementById("cut-muscal");

  function showQuestion(index) {
    allQuestions.forEach((question, i) => {
      question.style.display = i === index ? "block" : "none";
    });
    completedText.textContent = `${index + 1}/${allQuestions.length}`;
    const percentage = ((index + 1) / allQuestions.length) * 100;
    completedBar.style.setProperty("--progress-width", `${percentage}%`);
  }

  allQuestions.forEach((questionDiv, index) => {
    const labels = questionDiv.querySelectorAll(".label");

    labels.forEach((label) => {
      const radioInput = label.querySelector('input[type="radio"]');

      label.addEventListener("click", function () {
        const questionNumber = `question-${index + 1}`;
        if (questionNumber === "question-2") {
          if (radioInput.value === "Giảm Cân") {
            reduceWeightDiv.style.display = "block";
            gainMuscleDiv.style.display = "none";
            cutMuscleDiv.style.display = "none";
          } else if (radioInput.value === "Tăng Cơ Bắp") {
            gainMuscleDiv.style.display = "block";
            reduceWeightDiv.style.display = "none";
            cutMuscleDiv.style.display = "none";
          } else if (radioInput.value === "Cắt Nét Cơ") {
            cutMuscleDiv.style.display = "block";
            reduceWeightDiv.style.display = "none";
            gainMuscleDiv.style.display = "none";
          }
        }
        userAnswers[questionNumber] = radioInput.value;
        console.log(userAnswers);
        if (index < allQuestions.length - 1) {
          currentQuestionIndex++;
          showQuestion(currentQuestionIndex);
        }
      });
    });
  });

  backButton.addEventListener("click", function () {
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--; // Giảm index của câu hỏi hiện tại
      showQuestion(currentQuestionIndex);
      const questionNumber = `question-${currentQuestionIndex + 1}`;
      const selectedAnswer = userAnswers[questionNumber];

      if (selectedAnswer) {
        const radios = allQuestions[currentQuestionIndex].querySelectorAll(
          'input[type="radio"]'
        );
        radios.forEach((radio) => {
          if (radio.value === selectedAnswer) {
            radio.checked = true; // Đánh dấu radio đã được chọn trước đó
          }
        });
      }
    }
  });

  showQuestion(currentQuestionIndex);

  // input range
  const rangeInput = document.getElementById("myRange");
  const rangeValueDisplay = document.getElementById("rangeValue");
  const indexRange = document.querySelector(".index-range");
  const bodyFatImg = document.getElementById("bodyFatImg");

  const bodyFatImages = [
    "./asset/img/bodyfat_1.jpg", // value = 0 -> bodyfat_1.jpg
    "./asset/img/bodyfat_2.jpg", // value = 1 -> bodyfat_2.jpg
    "./asset/img/bodyfat_3.jpg", // value = 2 -> bodyfat_3.jpg
    "./asset/img/bodyfat_4.jpg", // value = 3 -> bodyfat_4.jpg
    "./asset/img/bodyfat_5.jpg", // value = 4 -> bodyfat_5.jpg
    "./asset/img/bodyfat_6.jpg", // value = 5 -> bodyfat_6.jpg
    "./asset/img/bodyfat_7.jpg", // value = 6 -> bodyfat_7.jpg
    "./asset/img/bodyfat_8.jpg", // value = 7 -> bodyfat_8.jpg
  ];
  rangeInput.addEventListener("input", function () {
    const value = rangeInput.value;
    const max = rangeInput.max;
    const questionNumber = "bodyFat";
    bodyFatImg.src = bodyFatImages[value];
    rangeInput.setAttribute("value", value);
    const leftValue = (value / max) * 100;
    indexRange.style.left = `${leftValue}%`;
    const transformValue = (value / max) * 100 - 50; // Biến đổi từ -50% đến 50%
    rangeInput.style.setProperty("--thumb-transform", `${transformValue}%`);
    if (value != max)
      rangeValueDisplay.textContent = `${parseInt(value) * 5 + 5}-${
        parseInt(value) * 5 + 9
      }%`;
    else rangeValueDisplay.textContent = `>${parseInt(value) * 5 + 5}%`;
    userAnswers[questionNumber] = rangeValueDisplay.textContent;
    console.log(userAnswers);
  });

  const continueBtns = document.querySelectorAll(".next-question-btn button");
  continueBtns.forEach((continueBtn) => {
    continueBtn.addEventListener("click", function () {
      currentQuestionIndex++;
      showQuestion(currentQuestionIndex);
    });
  });

  const radioButtons = document.querySelectorAll('input[type="radio"]');
  const labels = document.querySelectorAll(".options label");

  // Hàm để xóa border của tất cả các label
  function clearBorders() {
    labels.forEach((label) => {
      label.style.border = "2px solid transparent"; // Loại bỏ viền
    });
  }

  // Thêm sự kiện cho mỗi radio button
  radioButtons.forEach((radio) => {
    radio.addEventListener("change", function () {
      if (this.checked) {
        const questionNumber = "Water Intek";
        userAnswers[questionNumber] = this.value;
        console.log(userAnswers);
        clearBorders();
        this.parentElement.style.border = "2px solid #FF6025";
      }
    });
  });
});
