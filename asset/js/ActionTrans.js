function startTransition(isTransitionActive) {
  console.log("isTransitionActive:", isTransitionActive);
  const transitionLines = document.querySelectorAll(".transition-line");
  const muscleBodies = document.querySelectorAll(".muscle-body");
  const thinBodies = document.querySelectorAll(".thin-body");
  let linePosition = 0;
  const maxHeight = 100;
  let animationFrameId = null; // Biến lưu ID của requestAnimationFrame
  let timeoutId = null; // Biến lưu ID của setTimeout

  // Hàm để dừng hoạt ảnh
  function clearAllTimers() {
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    if (timeoutId) clearTimeout(timeoutId);
    animationFrameId = null;
    timeoutId = null;
  }

  // Hàm điều khiển hoạt ảnh chính
  function animateTransition() {
    clearAllTimers(); // Xóa tất cả các timers trước khi bắt đầu mới
    linePosition = 0; // Đặt lại vị trí ban đầu

    // Bắt đầu hoạt ảnh sau 2 giây
    timeoutId = setTimeout(function () {
      if (!isTransitionActive) return;

      function step() {
        if (!isTransitionActive) {
          clearAllTimers();
          return;
        }

        if (linePosition >= maxHeight) {
          clearAllTimers();
          timeoutId = setTimeout(function () {
            if (!isTransitionActive) return;

            transitionLines.forEach((transitionLine) => {
              transitionLine.style.height = `0%`;
            });
            thinBodies.forEach((thinBody) => {
              thinBody.style.clipPath = `inset(0% 0 0 0)`;
            });
            muscleBodies.forEach((muscleBody) => {
              muscleBody.style.clipPath = `inset(100% 0 0 0)`;
            });

            // Lặp lại hoạt ảnh sau 1 giây
            timeoutId = setTimeout(animateTransition, 1000);
          }, 1000); // Chờ 1 giây sau khi hoạt ảnh hoàn thành
        } else {
          // Cập nhật các giá trị cho mỗi khung hình
          linePosition += 1;
          transitionLines.forEach((transitionLine) => {
            transitionLine.style.height = `${linePosition}%`;
          });
          thinBodies.forEach((thinBody) => {
            thinBody.style.clipPath = `inset(${linePosition}% 0 0 0)`;
          });
          muscleBodies.forEach((muscleBody) => {
            muscleBody.style.clipPath = `inset(${100 - linePosition}% 0 0 0)`;
          });

          // Yêu cầu vẽ khung hình tiếp theo
          animationFrameId = requestAnimationFrame(step);
        }
      }

      // Bắt đầu hoạt ảnh
      animationFrameId = requestAnimationFrame(step);
    }, 2000); // Chờ 2 giây trước khi bắt đầu hoạt ảnh
  }

  if (!isTransitionActive) {
    clearAllTimers(); // Dừng hoạt ảnh nếu trạng thái không kích hoạt
  } else {
    animateTransition(); // Bắt đầu lại hoạt ảnh
  }
}
