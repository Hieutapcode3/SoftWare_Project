let foodData;
// Hàm tải dữ liệu từ file JSON
async function loadFoodData() {
  try {
    const response = await fetch("../asset/data/foodData.json");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    foodData = await response.json();
    // Chỉ gọi filterFood ở đây sau khi dữ liệu đã được tải
    filterFood("all"); // Hiển thị tất cả thực phẩm khi tải xong dữ liệu
  } catch (error) {
    console.error("Có lỗi xảy ra khi tải dữ liệu:", error);
  }
}

// Khi trang load, tải dữ liệu và hiển thị
window.onload = () => {
  loadFoodData(); // Tải dữ liệu thực phẩm từ file JSON
};

// Biến lưu bộ lọc hiện tại
let currentFilter = "all";
let currentPage = 1;
const itemsPerPage = 20;
let totalPages = 0;

function displayFood(filteredData) {
  totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pageData = filteredData.slice(startIndex, endIndex);

  const foodList = document.getElementById("foodList");

  // Ẩn các hàng hiện tại trước khi cập nhật nội dung
  Array.from(foodList.querySelectorAll("tr")).forEach((row) => {
    row.classList.add("hidden");
  });

  setTimeout(() => {
    foodList.innerHTML = ""; // Xóa nội dung bảng sau khi đã ẩn xong

    pageData.forEach((food, index) => {
      const row = document.createElement("tr");
      const indexCell = document.createElement("td");
      const imageCell = document.createElement("td");
      const nameCell = document.createElement("td");
      const unitCell = document.createElement("td");
      const caloriesCell = document.createElement("td");

      indexCell.textContent = startIndex + index + 1;
      let imgElement = document.createElement("img");
      imgElement.src = food.img;
      imgElement.alt = food.name;
      imgElement.width = 100;
      imgElement.height = 100;

      imageCell.appendChild(imgElement);
      nameCell.textContent = food.name;
      unitCell.textContent = food.unit;
      caloriesCell.textContent = food.calories;

      row.appendChild(indexCell);
      row.appendChild(imageCell);
      row.appendChild(nameCell);
      row.appendChild(unitCell);
      row.appendChild(caloriesCell);
      row.classList.add("hidden"); // Bắt đầu với trạng thái ẩn
      foodList.appendChild(row);
    });

    // Hiển thị các hàng sau khi đã cập nhật nội dung
    setTimeout(() => {
      Array.from(foodList.querySelectorAll("tr")).forEach((row) => {
        row.classList.remove("hidden");
      });
    }, 20);

    updatePaginationControls(); // Cập nhật điều khiển phân trang
  }, 70); // Đợi 300ms để hiệu ứng ẩn hoàn thành trước khi xóa nội dung
}

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

function goToPage(pageNumber) {
  currentPage = pageNumber;
  displayFood(getFilteredData());
}

function changePage(direction) {
  const newPage = currentPage + direction;
  if (newPage > 0 && newPage <= totalPages) {
    goToPage(newPage);
  }
}

function filterFood(category) {
  if (!foodData) {
    console.error("Dữ liệu thực phẩm chưa được tải.");
    return;
  }

  currentFilter = category;
  currentPage = 1;

  const infoDisplay = document.querySelector(".infoDisplay");
  let filteredData = [];

  switch (category) {
    case "all":
      filteredData = [
        ...foodData.meat,
        ...foodData.drinks,
        ...foodData.fruit,
        ...foodData.vegetable,
        ...foodData.seafood,
        ...foodData.fast_food,
        ...foodData.legume,
        ...foodData.main_food,
      ];
      infoDisplay.innerHTML = "<h2>Bảng tính lượng calo tổng hợp</h2>";
      break;
    case "meat":
      filteredData = foodData.meat;
      infoDisplay.innerHTML = "<h2>Bảng tính lượng calo cho thịt</h2>";
      break;
    case "drinks":
      filteredData = foodData.drinks;
      infoDisplay.innerHTML = "<h2>Bảng tính lượng calo cho đồ uống</h2>";
      break;
    case "fruit":
      filteredData = foodData.fruit;
      infoDisplay.innerHTML = "<h2>Bảng tính lượng calo cho hoa quả</h2>";
      break;
    case "vegetable":
      filteredData = foodData.vegetable;
      infoDisplay.innerHTML = "<h2>Bảng tính lượng calo cho rau củ</h2>";
      break;
    case "seafood":
      filteredData = foodData.seafood;
      infoDisplay.innerHTML = "<h2>Bảng tính lượng calo cho hải sản</h2>";
      break;
    case "fast_food":
      filteredData = foodData.fast_food;
      infoDisplay.innerHTML = "<h2>Bảng tính lượng calo cho fast food</h2>";
      break;
    case "legume":
      filteredData = foodData.legume;
      infoDisplay.innerHTML = "<h2>Bảng tính lượng calo cho đậu hạt</h2>";
      break;
    case "main_food":
      filteredData = foodData.main_food;
      infoDisplay.innerHTML = "<h2>Bảng tính lượng calo cho thức ăn chính</h2>";
      break;
    default:
      console.error("Bộ lọc không hợp lệ.");
      return;
  }

  displayFood(filteredData);
}

function getFilteredData() {
  switch (currentFilter) {
    case "all":
      return [
        ...foodData.meat,
        ...foodData.drinks,
        ...foodData.fruit,
        ...foodData.vegetable,
        ...foodData.seafood,
        ...foodData.fast_food,
        ...foodData.legume,
        ...foodData.main_food,
      ];
    case "meat":
      return foodData.meat;
    case "drinks":
      return foodData.drinks;
    case "fruit":
      return foodData.fruit;
    case "vegetable":
      return foodData.vegetable;
    case "seafood":
      return foodData.seafood;
    case "fast_food":
      return foodData.fast_food;
    case "legume":
      return foodData.legume;
    case "main_food":
      return foodData.main_food;
    default:
      return [];
  }
}

// Khởi tạo hiển thị thực phẩm ban đầu
document.addEventListener("DOMContentLoaded", function () {
  filterFood("all");
});

// Hàm lấy dữ liệu đã lọc theo bộ lọc hiện tại
function getFilteredData() {
  if (currentFilter === "all") {
    return [
      ...foodData.meat,
      ...foodData.drinks,
      ...foodData.fruit,
      ...foodData.vegetable,
      ...foodData.seafood,
      ...foodData.fast_food,
      ...foodData.legume,
      ...foodData.main_food,
    ]; // Trả về tất cả thực phẩm
  } else if (currentFilter === "meat") {
    return foodData.meat;
  } else if (currentFilter === "seafood") {
    return foodData.seafood;
  } else if (currentFilter === "fruit") {
    return foodData.fruit;
  } else if (currentFilter === "vegetable") {
    return foodData.vegetable;
  } else if (currentFilter === "drinks") {
    return foodData.drinks;
  } else if (currentFilter === "fast_food") {
    return foodData.fast_food;
  } else if (currentFilter === "legume") {
    return foodData.legume;
  } else if (currentFilter === "main_food") {
    return foodData.main_food;
  }
}

function searchFood() {
  const input = document.getElementById("searchInput");
  const filter = input.value.toLowerCase().trim();

  let filteredData = []; // Mảng để lưu dữ liệu đã tìm kiếm

  if (filter === "") {
    // Nếu không có từ khóa tìm kiếm, hiển thị lại tất cả dữ liệu
    filteredData = getFilteredData();
  } else {
    // Duyệt qua tất cả dữ liệu để tìm kiếm
    const allData = getFilteredData();
    filteredData = allData.filter((food) =>
      food.name.toLowerCase().includes(filter)
    );
  }

  const foodList = document.getElementById("foodList"); // Đối tượng chứa danh sách thực phẩm
  foodList.innerHTML = ""; // Xóa nội dung trước đó

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
    foodList.appendChild(message); // Thêm hàng vào bảng
  } else {
    // Cập nhật số trang và hiển thị dữ liệu tìm kiếm
    currentPage = 1; // Reset về trang đầu tiên
    totalPages = Math.ceil(filteredData.length / itemsPerPage); // Cập nhật số trang
    displayFood(filteredData); // Hiển thị dữ liệu đã tìm kiếm
  }
}

// Hàm sắp xếp các cột
let isAscendingIndex = true;
let isAscendingName = true;
let isAscendingWeight = true;
let isAscendingCalories = true;

function sortByIndex() {
  const table = document.querySelector(".food-table");
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
  const table = document.querySelector(".food-table");
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

function sortByWeight() {
  const table = document.querySelector(".food-table");
  const tbody = table.querySelector("tbody");
  const rows = Array.from(tbody.querySelectorAll("tr"));

  rows.sort((a, b) => {
    const cellA = parseFloat(a.cells[3].textContent.trim());
    const cellB = parseFloat(b.cells[3].textContent.trim());
    return isAscendingWeight ? cellA - cellB : cellB - cellA; // Sắp xếp Khối lượng
  });

  tbody.innerHTML = "";
  rows.forEach((row) => tbody.appendChild(row));

  const sortIcon = document.getElementById("wheightSortIcon");
  if (isAscendingWeight) {
    sortIcon.className = "fa-solid fa-arrow-up-wide-short"; // Biểu tượng cho sắp xếp tăng
  } else {
    sortIcon.className = "fa-solid fa-arrow-down-wide-short"; // Biểu tượng cho sắp xếp giảm
  }

  // Đảo ngược trạng thái sắp xếp
  isAscendingWeight = !isAscendingWeight;

  // Cập nhật biểu tượng
  updateSortIcons(2, isAscendingWeight);
}

function sortByCalories() {
  const filteredFoodItems = getFilteredData(); // Lấy danh sách thực phẩm đã lọc

  // Sắp xếp danh sách thực phẩm
  const sortedFoodItems = filteredFoodItems.sort((a, b) => {
    return isAscendingCalories
      ? a.calories - b.calories
      : b.calories - a.calories;
  });

  // Hiển thị danh sách thực phẩm đã sắp xếp
  displayFood(sortedFoodItems);

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
