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
      if (currentIndex === 0) {
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
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
  const submitBtn = document.querySelector(".next-question-btn.submit button");
  continueBtns.forEach((continueBtn) => {
    continueBtn.disabled = true;
  });
  continueBtns.forEach((continueBtn, index) => {
    continueBtn.addEventListener("click", function () {
      if (currentQuestionIndex < allQuestions.length - 1) {
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
      }
      continueBtns.forEach((continueBtn) => {
        continueBtn.disabled = true;
      });

      if (
        index === continueBtns.length - 1 &&
        window.location.pathname.endsWith("form_workout.html")
      ) {
        window.location.href = "exercise_schedule.html";
        window.alert("Dữ liệu đã được lưu thành công");
      }
      if (submitBtn != null) submitBtn.disabled = true;
    });
  });
  if (submitBtn != null) {
    submitBtn.addEventListener("click", function () {
      fetch("submit_formnutri.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userAnswer),
      })
        .then((response) => response.text())
        .then((data) => {
          alert(data);
        })
        .catch((error) => {
          console.error("Lỗi:", error);
        });
    });
  }

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
  const check5 = document.getElementById("check-5");
  const categoryLists = document.querySelectorAll(".ct ul li");
  const containerCategory = document.querySelector(".container-category");
  let selectedInVeg = false;
  let selectedInGrains = false;
  let selectedInIngredients = false;
  function checkMinimumSelection() {
    selectedInVeg =
      document.querySelector(".category-1 ul li.selected") !== null;
    selectedInGrains =
      document.querySelector(".category-2 ul li.selected") !== null;
    selectedInIngredients =
      document.querySelector(".category-3 ul li.selected") !== null;
    submitBtn.disabled = !(
      selectedInVeg &&
      selectedInGrains &&
      selectedInIngredients
    );
  }
  if (check5 != null) {
    check5.addEventListener("change", function () {
      if (this.checked) {
        categoryLists.forEach((li) => {
          li.style.borderColor = "transparent";
          li.classList.remove("selected");
        });
        containerCategory.style.opacity = "0.4";
        if (submitBtn != null) submitBtn.disabled = false;
      } else {
        containerCategory.style.opacity = "1";
        checkMinimumSelection();
      }
    });
  }
  if (categoryLists != null) {
    categoryLists.forEach((li) => {
      li.addEventListener("click", function () {
        if (!check5.checked) {
          if (this.classList.contains("selected")) {
            this.classList.remove("selected");
            this.style.borderColor = "transparent";
          } else {
            this.classList.add("selected");
            this.style.borderColor = "#ff6025";
          }

          checkMinimumSelection();
        }
      });
    });
  }
  if (check5 != null) checkMinimumSelection();
  showQuestion(currentQuestionIndex);
});
