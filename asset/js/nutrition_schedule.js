const genderMapping = {
  Nam: "male",
  Nữ: "female",
};

const purposeMapping = {
  "Giảm cân": "weight_loss",
  "Tăng cân": "weight_gain",
  "Giữ vóc dáng": "keep_body",
};

const dietMapping = {
  "Eat Clean": "eat_clean",
  "Low Carb": "low_carb",
  Vegan: "vegan",
  HCG: "hcg",
};

async function fetchUserData() {
  try {
    const response = await fetch("userdetails.php");
    if (!response.ok) {
      throw new Error(
        "Không thể lấy dữ liệu người dùng: " + response.statusText
      );
    }
    const userData = await response.json();
    return {
      gender: userData.gender,
      purpose: userData.purpose,
      dietType: userData.dietType,
    };
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu người dùng:", error);
  }
}

async function fetchNutritionData(gender, purpose, dietType) {
  try {
    const mappedGender = genderMapping[gender];
    const mappedPurpose = purposeMapping[purpose];
    const mappedDiet = dietMapping[dietType];
    const filePath =
      mappedGender === "male"
        ? "../asset/data/nutrition_schedule/male.json"
        : "../asset/data/nutrition_schedule/female.json";
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error("Mạng không thành công: " + response.statusText);
    }
    const nutritionData = await response.json();
    console.log(nutritionData);
    return nutritionData[mappedGender][mappedPurpose][mappedDiet];
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu dinh dưỡng:", error);
  }
}

async function generateWeeklySchedule() {
  const userData = await fetchUserData();
  console.log(userData);

  if (!userData) {
    console.error("Không có dữ liệu người dùng.");
    return;
  }

  const gender = userData.gender;
  const purpose = userData.purpose;
  const dietType = userData.dietType;

  const nutritionData = await fetchNutritionData(gender, purpose, dietType);

  if (nutritionData) {
    const schedule = nutritionData;

    const table = document.getElementById("weeklySchedule");
    table.innerHTML = "";
    let headerRow = `<tr>
                            <th>Ngày</th>
                            <th>Bữa sáng</th>
                            <th>Bữa trưa</th>
                            <th>Bữa ăn nhẹ</th>
                            <th>Bữa tối</th>
                            <th>Tổng Calo</th>
                         </tr>`;
    table.innerHTML += headerRow;

    // Tạo nội dung bảng
    schedule.forEach((dayData) => {
      const breakfastCalories = dayData.meals.breakfast.calories;
      const lunchCalories = dayData.meals.lunch.calories;
      const snackCalories = dayData.meals.snack.calories;
      const dinnerCalories = dayData.meals.dinner.calories;
      const totalCalories =
        breakfastCalories + lunchCalories + snackCalories + dinnerCalories;

      let row = `<tr>
                            <td>${dayData.day}</td>
                            <td>${dayData.meals.breakfast.name}<br>(${breakfastCalories} cal)</td>
                            <td>${dayData.meals.lunch.name}<br>(${lunchCalories} cal)</td>
                            <td>${dayData.meals.snack.name}<br>(${snackCalories} cal)</td>
                            <td>${dayData.meals.dinner.name}<br>(${dinnerCalories} cal)</td>
                            <td>${totalCalories} cal</td>
                        </tr>`;
      table.innerHTML += row;
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  generateWeeklySchedule();
});
