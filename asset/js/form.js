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
    "../asset/img/bodyfat_1.jpg", // value = 0 -> bodyfat_1.jpg
    "../asset/img/bodyfat_2.jpg", // value = 1 -> bodyfat_2.jpg
    "../asset/img/bodyfat_3.jpg", // value = 2 -> bodyfat_3.jpg
    "../asset/img/bodyfat_4.jpg", // value = 3 -> bodyfat_4.jpg
    "../asset/img/bodyfat_5.jpg", // value = 4 -> bodyfat_5.jpg
    "../asset/img/bodyfat_6.jpg", // value = 5 -> bodyfat_6.jpg
    "../asset/img/bodyfat_7.jpg", // value = 6 -> bodyfat_7.jpg
    "../asset/img/bodyfat_8.jpg", // value = 7 -> bodyfat_8.jpg
  ];
  rangeInput.addEventListener("input", function () {
    continueBtns.forEach((continueBtn) => {
      continueBtn.disabled = false;
    });
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

  const continueBtns = document.querySelectorAll(
    ".next-question-btn.type_1 button"
  );
  const continueBtnType_2 = document.querySelector(
    ".next-question-btn.type_2 button"
  );
  const continueBtnType_3 = document.querySelector(
    ".next-question-btn.type_3 button"
  );
  const continueBtnType_4 = document.querySelector(
    ".next-question-btn.type_4 button"
  );
  const submitFormBtn = document.querySelector(
    ".next-question-btn.submit button"
  );
  const bodyContainer = document.querySelector(".container-body");
  const evaluteContainer = document.querySelector(".container-evalute");
  const healthstatusContainer = document.querySelector(
    ".container-health-status"
  );
  const abdicateReason = document.querySelector(
    ".container-evalute.abdicate-reason"
  );
  continueBtns.forEach((continueBtn) => {
    continueBtn.disabled = true;
  });
  continueBtnType_2.disabled = true;
  continueBtnType_4.disabled = true;
  submitFormBtn.disabled = true;
  continueBtns.forEach((continueBtn) => {
    continueBtn.addEventListener("click", function () {
      bodyContainer.style.display = "block";
      evaluteContainer.style.display = "none";
      healthstatusContainer.style.display = "none";
      abdicateReason.style.display = "none";
      if (currentQuestionIndex < allQuestions.length - 1) {
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
      }
      continueBtns.forEach((continBtn, i) => {
        continBtn.disabled = true;
      });
      startTransition(false);
    });
  });
  continueBtnType_2.addEventListener("click", function () {
    bodyContainer.style.display = "none";
    evaluteContainer.style.display = "block";
    healthstatusContainer.style.display = "none";
    startTransition(true);
  });
  continueBtnType_3.addEventListener("click", function () {
    bodyContainer.style.display = "none";
    evaluteContainer.style.display = "none";
    healthstatusContainer.style.display = "block";
    startTransition(false);
    continueBtns.forEach((continBtn, i) => {
      continBtn.disabled = false;
    });
  });
  continueBtnType_4.addEventListener("click", function () {
    bodyContainer.style.display = "none";
    evaluteContainer.style.display = "none";
    healthstatusContainer.style.display = "none";
    abdicateReason.style.display = "block";
    continueBtns.forEach((continBtn, i) => {
      continBtn.disabled = false;
    });
    startTransition(true);
  });
  submitFormBtn.addEventListener("click", function () {
    fetch("submit_form.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userAnswers),
    })
      .then((response) => response.text())
      .then((data) => {
        alert(data);
      })
      .catch((error) => {
        console.error("Lỗi:", error);
      });
  });

  const radioButtons = document.querySelectorAll('input[type="radio"]');
  const labels = document.querySelectorAll(".options > label");

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
        continueBtns.forEach((continueBtn) => {
          continueBtn.disabled = false;
        });
        continueBtnType_2.disabled = false;
      }
    });
  });
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

  allQuestions.forEach((formSelection) => {
    const questionKey = formSelection.getAttribute("data-question");
    const checkboxes = formSelection.querySelectorAll('input[type="checkbox"]');
    const noneOption = formSelection.querySelector(
      'input[value="Không có cái nào ở trên"]'
    );

    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", function () {
        const selectedCheckboxes = [];

        checkboxes.forEach((cb) => {
          if (cb.checked && cb !== noneOption) {
            selectedCheckboxes.push(cb.value);
          }
        });

        // Thêm border cho checkbox đang được chọn
        if (this.checked && this != noneOption) {
          this.parentElement.parentElement.style.border = "2px solid #FF6025";
        } else if (!this.checked && this != noneOption) {
          this.parentElement.parentElement.style.border =
            "2px solid transparent";
        }

        continueBtnType_4.disabled = false;
        continueBtns.forEach((continBtn) => {
          continBtn.disabled = false;
        });
        if (this === noneOption && this.checked) {
          userAnswers[questionKey] = null;
          clearBorders();
          checkboxes.forEach((cb) => {
            if (cb !== noneOption) cb.checked = false;
          });
          noneOption.parentElement.style.border = "2px solid #FF6025";
        } else {
          noneOption.checked = false;
          noneOption.parentElement.style.border = "2px solid transparent";
          userAnswers[questionKey] =
            selectedCheckboxes.length > 0 ? selectedCheckboxes : null;
        }

        console.log(userAnswers);
      });
    });
  });
  document
    .querySelector(".input-height")
    .addEventListener("input", function () {
      let inputHeight = this.value;
      const heightDisplay = document.querySelector(".height-display");
      const qualify = document.querySelector(".height-qualify");
      inputHeight = inputHeight.replace(/\D/g, "");
      if (inputHeight.length > 3) {
        inputHeight = inputHeight.slice(0, 3);
      }
      this.value = inputHeight;
      if (inputHeight) {
        if (this.value < 90) {
          qualify.textContent = "Chiều cao phải lớn hơn hoặc bằng 90 cm";
        } else if (this.value > 245) {
          qualify.textContent = "Chiều cao phải nhỏ hơn hoặc bằng 245 cm";
        } else {
          qualify.textContent = "";
          continueBtns.forEach((continBtn) => {
            continBtn.disabled = false;
          });
        }
        heightDisplay.style.opacity = "0";
        heightDisplay.textContent = inputHeight;
      } else {
        continueBtns.forEach((continBtn) => {
          continBtn.disabled = true;
        });
        heightDisplay.style.opacity = "1";
        heightDisplay.textContent = "___";
      }
      userAnswers["Height"] = this.value;
      console.log(userAnswers);
    });
  document.querySelectorAll(".input-weight").forEach((inputElement, index) => {
    inputElement.addEventListener("input", function () {
      let inputWeight = this.value;
      const weightDisplays = document.querySelectorAll(".weight-display");
      const qualifyPresent = document.querySelector(".weight-qualify-present");
      const qualifyTarget = document.querySelector(".weight-qualify-target");
      let qualify = index === 0 ? qualifyPresent : qualifyTarget;

      // Chỉ cho phép nhập số
      inputWeight = inputWeight.replace(/\D/g, "");

      // Giới hạn độ dài nhập là 3 chữ số
      if (inputWeight.length > 3) {
        inputWeight = inputWeight.slice(0, 3);
      }
      this.value = inputWeight;

      // Kiểm tra giá trị cân nặng hợp lệ
      if (inputWeight) {
        if (this.value < 35) {
          qualify.textContent = "Cân nặng phải lớn hơn hoặc bằng 35 kg";
        } else if (this.value > 200) {
          qualify.textContent = "Cân nặng phải nhỏ hơn hoặc bằng 200 kg";
        } else {
          qualify.textContent = "";
        }
        weightDisplays[index].style.opacity = "0";
        weightDisplays[index].textContent = inputWeight;
      } else {
        weightDisplays[index].style.opacity = "1";
        weightDisplays[index].textContent = "__";
      }
      if (index === 0) {
        userAnswers["CurrentWeight"] = this.value;
      } else {
        userAnswers["TargetWeight"] = this.value;
      }
      console.log(userAnswers);
      const currentWeightValid =
        userAnswers["CurrentWeight"] >= 35 &&
        userAnswers["CurrentWeight"] <= 200;
      const targetWeightValid =
        userAnswers["TargetWeight"] >= 35 && userAnswers["TargetWeight"] <= 200;

      submitFormBtn.disabled = !(currentWeightValid && targetWeightValid);
    });
  });
});
