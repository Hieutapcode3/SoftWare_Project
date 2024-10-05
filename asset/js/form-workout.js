document.addEventListener("DOMContentLoaded", () => {
  const navBarButton = document.querySelector(".nav-bar");
  const containerNavBar = document.querySelector(".container-nav-bar");
  const closeButton = document.querySelector(".close-btn button");
  const ulElement = document.querySelector(".container-nav-bar ul");
  const userAnswer = {};
  let currentQuestionIndex = 0;

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

  const allQuestions = document.querySelectorAll(".form-selection");
  const backButton = document.querySelector(".back-btn");
  const completedText = document.querySelector(".completed-text");
  const completedBar = document.querySelector(".completed-bar");

  function showQuestion(index) {
    allQuestions.forEach((question, i) => {
      question.style.display = i === index ? "block" : "none";
    });

    const questionNumber = `question-${index + 1}`;
    completedText.textContent = `${index + 1}/${allQuestions.length}`;
    const percentage = ((index + 1) / allQuestions.length) * 100;
    completedBar.style.setProperty("--progress-width", `${percentage}%`);

    const selectedAnswer = userAnswer[questionNumber];
    if (selectedAnswer) {
      const radios = allQuestions[currentQuestionIndex].querySelectorAll(
        'input[type="radio"]'
      );
      radios.forEach((radio) => {
        if (radio.value === selectedAnswer) {
          radio.checked = true;
        }
      });
    }
  }

  backButton.addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      showQuestion(currentQuestionIndex);
    }
  });

  const checkboxes = document.querySelectorAll(
    '#question-1 .checkbox-wrapper-19 input[type="checkbox"]'
  );
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      const label = this.closest("label");
      const questionNumber = `question-1`;

      if (this.checked) {
        label.style.borderColor = "#ff6052";
        if (!userAnswer[questionNumber]) {
          userAnswer[questionNumber] = [];
        }
        userAnswer[questionNumber].push(this.value);
      } else {
        label.style.borderColor = "transparent";
        if (userAnswer[questionNumber]) {
          userAnswer[questionNumber] = userAnswer[questionNumber].filter(
            (answer) => answer !== this.value
          );
        }
      }
      const isAnyChecked = Array.from(checkboxes).some(
        (checkbox) => checkbox.checked
      );
      continueBtns.forEach((continueBtn) => {
        continueBtn.disabled = !isAnyChecked;
      });

      console.log(userAnswer);
    });
  });

  const buttons = document.querySelectorAll(".container-selection button");
  const images = document.querySelectorAll(
    ".container-slider-img .select-slider"
  );
  let currentIndex = 0;

  function updateImages(directionClass, action) {
    const currentImage = images[currentIndex];
    const exerciseName = currentImage.querySelector("h2").innerText;
    const questionNumber = `question-${currentQuestionIndex + 1}`;
    if (!userAnswer[questionNumber]) {
      userAnswer[questionNumber] = {};
    }
    userAnswer[questionNumber][exerciseName] = action;
    currentImage.classList.add(directionClass);
    const nextIndex = (currentIndex + 1) % images.length;
    images[nextIndex].style.opacity = 1;
    images[nextIndex].style.transform = "scale(1) translateY(0)";

    setTimeout(() => {
      images.forEach((img, index) => {
        if (index > nextIndex) {
          const scaleValue = 1 - (index - nextIndex) * 0.05;
          const translateYValue = (index - nextIndex) * -8;
          img.style.transform = `scale(${scaleValue}) translateY(${translateYValue}px)`;
        }
      });
      currentIndex = nextIndex;

      // Kiểm tra xem còn hình ảnh nào không
      if (currentIndex === 0) {
        // Nếu đã quay lại đầu danh sách hình ảnh
        currentQuestionIndex++; // Tăng currentQuestionIndex
        showQuestion(currentQuestionIndex); // Hiển thị câu hỏi tiếp theo
      }
    }, 200);

    console.log(userAnswer);
  }

  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const action = event.currentTarget.getAttribute("title");
      let directionClass = "";
      if (action === "Thích") {
        directionClass = "go-to-left";
      } else if (action === "Không thích") {
        directionClass = "go-to-right";
      } else {
        directionClass = "go-up";
      }
      updateImages(directionClass, action);
    });
  });

  const continueBtns = document.querySelectorAll(
    ".next-question-btn.type_1 button"
  );
  continueBtns.forEach((continueBtn) => {
    continueBtn.disabled = true;
  });
  continueBtns.forEach((continueBtn) => {
    continueBtn.addEventListener("click", function () {
      if (currentQuestionIndex < allQuestions.length - 1) {
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
      } else {
        window.location.href = "index.html";
      }
      continueBtns.forEach((continueBtn) => {
        continueBtn.disabled = true;
      });
    });
  });

  const radioButtons = document.querySelectorAll('input[type="radio"]');
  const labels = document.querySelectorAll(".options > label");
  function clearBorders() {
    labels.forEach((label) => {
      label.style.border = "2px solid transparent";
    });
  }

  radioButtons.forEach((radio) => {
    radio.addEventListener("change", function () {
      if (this.checked) {
        const container = this.closest(".container-options");
        const exerciseName = container.getAttribute("name");
        const questionKey = `question-${currentQuestionIndex + 1}`;
        if (!userAnswer[questionKey]) {
          userAnswer[questionKey] = {};
        }
        userAnswer[questionKey][exerciseName] = this.value;
        console.log(userAnswer);
        clearBorders();
        this.parentElement.style.border = "2px solid #FF6025";
        continueBtns.forEach((continueBtn) => {
          continueBtn.disabled = false;
        });
      }
    });
  });

  showQuestion(currentQuestionIndex);
});
