let exerciseData;

// Hàm tải dữ liệu từ file JSON
async function loadExerciseData() {
  try {
    const response = await fetch("../asset/data/exerciseData.json");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    exerciseData = await response.json();
    // Chỉ gọi filterExercise ở đây sau khi dữ liệu đã được tải
    filterExercise("all"); // Hiển thị tất cả bài tập khi tải xong dữ liệu
  } catch (error) {
    console.error("Có lỗi xảy ra khi tải dữ liệu:", error);
  }
}

// Khi trang load, tải dữ liệu và hiển thị
window.onload = () => {
  loadExerciseData(); // Tải dữ liệu thực phẩm từ file JSON
};

// Biến lưu bộ lọc hiện tại
let currentFilter = "all";
let currentPage = 1;
const itemsPerPage = 10;
let totalPages = 0;

// Hàm hiển thị bài tập
function displayExercise(filteredData) {
  totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pageData = filteredData.slice(startIndex, endIndex);

  const exerciseList = document.getElementById("exerciseList");

  // Ẩn các hàng hiện tại trước khi cập nhật nội dung
  Array.from(exerciseList.querySelectorAll("tr")).forEach((row) => {
    row.classList.add("hidden");
  });

  setTimeout(() => {
    exerciseList.innerHTML = ""; // Xóa nội dung bảng sau khi đã ẩn xong

    // Tạo các hàng mới với dữ liệu đã lọc
    pageData.forEach((exercise, index) => {
      const row = document.createElement("tr");

      const indexCell = document.createElement("td");
      const videoCell = document.createElement("td");
      const nameCell = document.createElement("td");
      const unitCell = document.createElement("td");
      const caloriesCell = document.createElement("td");
      const difficultyCell = document.createElement("td"); // Thêm ô cho độ khó

      indexCell.textContent = startIndex + index + 1;

      // Chuyển đổi link thành định dạng nhúng
      let videoId = exercise.vid.split("/").pop().split("?")[0]; // Lấy ID video từ URL
      let videoEmbedUrl = `https://www.youtube.com/embed/${videoId}`;

      let videoElement = document.createElement("iframe");
      videoElement.src = videoEmbedUrl; // Sử dụng URL nhúng
      videoElement.width = 400;
      videoElement.height = 200;
      videoElement.frameBorder = 0;
      videoElement.allowFullscreen = true; // Cho phép chế độ toàn màn hình
      videoElement.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"; // Thêm thuộc tính allow

      // Căn giữa video
      videoElement.style.display = "block";
      videoElement.style.margin = "0 auto";

      videoCell.appendChild(videoElement);
      nameCell.textContent = exercise.name;
      unitCell.textContent = exercise.unit;
      caloriesCell.textContent = exercise.calories;
      difficultyCell.textContent = exercise.difficulty;

      row.appendChild(indexCell);
      row.appendChild(videoCell);
      row.appendChild(nameCell);
      row.appendChild(unitCell);
      row.appendChild(caloriesCell);
      row.appendChild(difficultyCell); // Thêm ô vào hàng
      row.classList.add("hidden"); // Bắt đầu với trạng thái ẩn
      exerciseList.appendChild(row);
    });

    // Hiển thị các hàng sau khi đã cập nhật nội dung
    setTimeout(() => {
      Array.from(exerciseList.querySelectorAll("tr")).forEach((row) => {
        row.classList.remove("hidden");
      });
    }, 20);

    updatePaginationControls(); // Cập nhật điều khiển phân trang
  }, 70); // Đợi 70ms để hiệu ứng ẩn hoàn thành trước khi xóa nội dung
}

// Hàm cập nhật các điều khiển phân trang
function updatePaginationControls() {
  const paginationContainer = document.getElementById("pagination");
  const pageNumbersContainer = document.getElementById("pageNumbers");
  pageNumbersContainer.innerHTML = ""; // Xóa nội dung cũ của các số trang

  // Tạo các nút số trang
  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement("button");
    pageButton.textContent = i;
    pageButton.className = i === currentPage ? "active" : "";
    pageButton.addEventListener("click", () => goToPage(i));
    pageNumbersContainer.appendChild(pageButton);
  }

  // Vô hiệu hóa nút "Prev" nếu đang ở trang đầu tiên
  document.getElementById("prevPage").disabled = currentPage === 1;
  // Vô hiệu hóa nút "Next" nếu đang ở trang cuối cùng
  document.getElementById("nextPage").disabled = currentPage === totalPages;
}

// Hàm chuyển đến trang cụ thể
function goToPage(pageNumber) {
  currentPage = pageNumber;
  displayExercise(getFilteredData());
}

// Hàm thay đổi trang theo hướng (Prev/Next)
function changePage(direction) {
  const newPage = currentPage + direction;
  if (newPage > 0 && newPage <= totalPages) {
    goToPage(newPage);
  }
}

// Hàm lọc bài tập theo loại
function filterExercise(category) {
  if (!exerciseData) {
    console.error("Dữ liệu bài tập chưa được tải.");
    return;
  }

  currentFilter = category;
  currentPage = 1;

  const infoDisplay = document.querySelector(".infoDisplay");
  let filteredData = [];

  switch (category) {
    case "all":
      filteredData = [
        ...exerciseData.arms,
        ...exerciseData.back,
        ...exerciseData.thighs,
        ...exerciseData.shoulders,
        ...exerciseData.abs,
      ];
      infoDisplay.innerHTML = "<h2>Danh sách bài tập tổng hợp</h2>";
      break;
    case "arms":
      filteredData = exerciseData.arms;
      infoDisplay.innerHTML = "<h2>Danh sách bài tập cho nhóm cơ tay</h2>";
      break;
    case "back":
      filteredData = exerciseData.back;
      infoDisplay.innerHTML = "<h2>Danh sách bài tập cho nhóm cơ lưng</h2>";
      break;
    case "thighs":
      filteredData = exerciseData.thighs;
      infoDisplay.innerHTML = "<h2>Danh sách bài tập cho nhóm cơ đùi</h2>";
      break;
    case "shoulders":
      filteredData = exerciseData.shoulders;
      infoDisplay.innerHTML = "<h2>Danh sách bài tập cho nhóm cơ vai</h2>";
      break;
    case "abs":
      filteredData = exerciseData.abs;
      infoDisplay.innerHTML = "<h2>Danh sách bài tập cho nhóm cơ bụng</h2>";
      break;
    default:
      console.error("Bộ lọc không hợp lệ.");
      return;
  }

  displayExercise(filteredData);
}

// Hàm lấy dữ liệu đã lọc theo bộ lọc hiện tại
function getFilteredData() {
  switch (currentFilter) {
    case "all":
      return [
        ...exerciseData.arms,
        ...exerciseData.back,
        ...exerciseData.thighs,
        ...exerciseData.shoulders,
        ...exerciseData.abs,
      ];
    case "arms":
      return exerciseData.arms;
    case "back":
      return exerciseData.back;
    case "thighs":
      return exerciseData.thighs;
    case "shoulders":
      return exerciseData.shoulders;
    case "abs":
      return exerciseData.abs;
    default:
      return [];
  }
}

function searchexercise() {
  const input = document.getElementById("searchInput");
  const filter = input.value.toLowerCase().trim();

  let filteredData = []; // Mảng để lưu dữ liệu đã tìm kiếm

  if (filter === "") {
    // Nếu không có từ khóa tìm kiếm, hiển thị lại tất cả dữ liệu
    filteredData = getFilteredData();
  } else {
    // Duyệt qua tất cả dữ liệu để tìm kiếm
    const allData = getFilteredData();
    filteredData = allData.filter((exercise) =>
      exercise.name.toLowerCase().includes(filter)
    );
  }

  const exerciseList = document.getElementById("exerciseList"); // Đối tượng chứa danh sách thực phẩm
  exerciseList.innerHTML = ""; // Xóa nội dung trước đó

  if (filteredData.length === 0) {
    // Nếu không tìm thấy dữ liệu, hiển thị thông báo ở giữa
    const message = document.createElement("tr"); // Tạo một hàng mới
    const cell = document.createElement("td"); // Tạo một ô mới
    cell.colSpan = 5; // Gộp ô này với tất cả cột
    cell.style.textAlign = "center";
    cell.style.color = "red";
    cell.style.fontSize = "24px";
    cell.textContent = "Không tìm thấy thực phẩm nào trong hệ thống"; // Nội dung thông báo
    message.appendChild(cell); // Thêm ô vào hàng
    exerciseList.appendChild(message); // Thêm hàng vào bảng
  } else {
    // Cập nhật số trang và hiển thị dữ liệu tìm kiếm
    currentPage = 1; // Reset về trang đầu tiên
    totalPages = Math.ceil(filteredData.length / itemsPerPage); // Cập nhật số trang
    displayExercise(filteredData); // Hiển thị dữ liệu đã tìm kiếm
  }
}

// Hàm sắp xếp các cột
let isAscendingIndex = true;
let isAscendingName = true;
let isAscendingWeight = true;
let isAscendingCalories = true;
let isAscendingDuration = true;
let isAscendingDifficulty = true;

function sortByIndex() {
  const table = document.querySelector(".exercise-table");
  const tbody = table.querySelector("tbody");
  const rows = Array.from(tbody.querySelectorAll("tr"));

  rows.sort((a, b) => {
    const cellA = parseFloat(a.cells[0].textContent.trim());
    const cellB = parseFloat(b.cells[0].textContent.trim());
    return isAscendingIndex ? cellA - cellB : cellB - cellA; // Sắp xếp STT
  });

  tbody.innerHTML = "";
  rows.forEach((row) => tbody.appendChild(row));

  const sortIcon = document.getElementById("indexSortIcon");
  if (isAscendingIndex) {
    sortIcon.className = "fa-solid fa-arrow-up-wide-short"; // Biểu tượng cho sắp xếp tăng
  } else {
    sortIcon.className = "fa-solid fa-arrow-down-wide-short"; // Biểu tượng cho sắp xếp giảm
  }

  // Đảo ngược trạng thái sắp xếp
  isAscendingIndex = !isAscendingIndex;
  updateSortIcons(0, isAscendingIndex);
}

function sortByName() {
  const table = document.querySelector(".exercise-table");
  const tbody = table.querySelector("tbody");
  const rows = Array.from(tbody.querySelectorAll("tr"));

  rows.sort((a, b) => {
    const cellA = a.cells[2].textContent.trim();
    const cellB = b.cells[2].textContent.trim();
    return isAscendingName
      ? cellA.localeCompare(cellB)
      : cellB.localeCompare(cellA); // Sắp xếp tên
  });

  tbody.innerHTML = "";
  rows.forEach((row) => tbody.appendChild(row));
  const sortIcon = document.getElementById("nameSortIcon"); // Giả sử bạn có một phần tử với ID là 'nameSortIcon'
  if (isAscendingName) {
    sortIcon.className = "fa-solid fa-arrow-down-a-z"; // Biểu tượng cho sắp xếp tăng
  } else {
    sortIcon.className = "fa-solid fa-arrow-up-z-a"; // Biểu tượng cho sắp xếp giảm
  }
  // Đảo ngược trạng thái sắp xếp
  isAscendingName = !isAscendingName;
  updateSortIcons(1, isAscendingName);
}

function sortByDifficulty() {
  const filteredExerciseItems = getFilteredData(); // Lấy danh sách bài tập đã lọc

  // Định nghĩa thứ tự độ khó
  const difficultyOrder = {
    Dễ: 1,
    "Trung bình": 2,
    Khó: 3,
  };

  // Sắp xếp danh sách bài tập theo độ khó
  const sortedExerciseItems = filteredExerciseItems.sort((a, b) => {
    return isAscendingDifficulty
      ? difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
      : difficultyOrder[b.difficulty] - difficultyOrder[a.difficulty];
  });

  // Hiển thị danh sách bài tập đã sắp xếp
  displayExercise(sortedExerciseItems);

  // Thay đổi biểu tượng sắp xếp
  const sortIcon = document.getElementById("difficultySortIcon");
  if (isAscendingDifficulty) {
    sortIcon.className = "fa-solid fa-arrow-up-wide-short"; // Biểu tượng cho sắp xếp tăng
  } else {
    sortIcon.className = "fa-solid fa-arrow-down-wide-short"; // Biểu tượng cho sắp xếp giảm
  }

  // Đảo ngược trạng thái sắp xếp
  isAscendingDifficulty = !isAscendingDifficulty;
}

function sortByCalories() {
  const filteredexerciseItems = getFilteredData(); // Lấy danh sách thực phẩm đã lọc

  // Sắp xếp danh sách thực phẩm
  const sortedexerciseItems = filteredexerciseItems.sort((a, b) => {
    return isAscendingCalories
      ? a.calories - b.calories
      : b.calories - a.calories;
  });

  // Hiển thị danh sách thực phẩm đã sắp xếp
  displayExercise(sortedexerciseItems);

  // Thay đổi biểu tượng
  const sortIcon = document.getElementById("caloriesSortIcon");
  if (isAscendingCalories) {
    sortIcon.className = "fa-solid fa-arrow-up-wide-short"; // Biểu tượng cho sắp xếp tăng
  } else {
    sortIcon.className = "fa-solid fa-arrow-down-wide-short"; // Biểu tượng cho sắp xếp giảm
  }

  // Đảo ngược trạng thái sắp xếp
  isAscendingCalories = !isAscendingCalories;
}

function sortByDuration() {
  const filteredexerciseItems = getFilteredData(); // Lấy danh sách thực phẩm đã lọc

  // Sắp xếp danh sách thực phẩm
  const sortedexerciseItems = filteredexerciseItems.sort((a, b) => {
    const durationA = parseInt(a.unit);
    const durationB = parseInt(b.unit);
    return isAscendingDuration ? durationA - durationB : durationB - durationA;
  });

  // Hiển thị danh sách thực phẩm đã sắp xếp
  displayExercise(sortedexerciseItems);

  // Thay đổi biểu tượng
  const sortIcon = document.getElementById("durationSortIcon");
  if (isAscendingDuration) {
    sortIcon.className = "fa-solid fa-arrow-up-wide-short"; // Biểu tượng cho sắp xếp tăng
  } else {
    sortIcon.className = "fa-solid fa-arrow-down-wide-short"; // Biểu tượng cho sắp xếp giảm
  }

  // Đảo ngược trạng thái sắp xếp
  isAscendingDuration = !isAscendingDuration;
}

// Cập nhật biểu tượng sắp xếp
function updateSortIcons(columnIndex, ascending) {
  const sortIcons = document.querySelectorAll(".sort-icon i");
  sortIcons.forEach((icon, index) => {
    if (index === columnIndex) {
      icon.classList.toggle("fa-sort-up", ascending);
      icon.classList.toggle("fa-sort-down", !ascending);
    } else {
      icon.classList.remove("fa-sort-up", "fa-sort-down");
      icon.classList.add("fa-sort"); // Đặt lại thành biểu tượng mặc định
    }
  });
}

document.addEventListener("click", function (event) {
  if (!event.target.closest(".header-container")) {
    // Nếu click ra ngoài bảng, đặt lại biểu tượng mặc định cho tất cả các cột
    const sortIcons = document.querySelectorAll(".sort-button i");
    sortIcons.forEach((icon) => {
      icon.classList.remove(
        "fa-arrow-up-wide-short",
        "fa-arrow-down-wide-short",
        "fa-arrow-down-a-z",
        "fa-arrow-up-z-a"
      );
      icon.classList.add("fa-sort");
    });
  }
});
const nutrition_type = document.querySelectorAll("nav ul li");

nutrition_type.forEach(function (li) {
  li.addEventListener("click", function () {
    nutrition_type.forEach(function (li) {
      li.style.backgroundColor = "transparent";
    });
    this.style.backgroundColor = "#ff4d00";
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
