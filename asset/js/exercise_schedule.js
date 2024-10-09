const genderMapping = {
  Nam: "male",
  Nữ: "female",
};

const purposeMapping = {
  "Giảm cân": "weight_loss",
  "Tăng cân": "weight_gain",
  "Giữ vóc dáng": "keep_body",
};

async function fetchWorkoutData(gender, purpose) {
  try {
    const mappedGender = genderMapping[gender];
    const mappedPurpose = purposeMapping[purpose];

    if (!mappedGender || !mappedPurpose) {
      throw new Error("Giới tính hoặc mục đích không hợp lệ.");
    }

    // Set the file path based on gender
    const filePath =
      mappedGender === "male"
        ? "../asset/data/workout_schedule/male.json"
        : "../asset/data/workout_schedule/female.json";
    const response = await fetch(filePath);

    if (!response.ok) {
      throw new Error("Mạng không thành công: " + response.statusText);
    }

    const workoutData = await response.json();
    return workoutData[mappedGender][mappedPurpose];
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu:", error);
  }
}

async function fetchUserDetails() {
  try {
    const response = await fetch("userdetails.php");
    if (!response.ok) {
      throw new Error(
        "Không thể lấy thông tin người dùng: " + response.statusText
      );
    }

    const data = await response.json();
    console.log("Gender:", data.gender);
    console.log("Purpose:", data.purpose);

    return {
      gender: data.gender,
      purpose: data.purpose,
    };
  } catch (error) {
    console.error("Lỗi khi lấy thông tin người dùng:", error);
  }
}

async function generateWeeklySchedule() {
  const userDetails = await fetchUserDetails();
  if (userDetails) {
    const { gender, purpose } = userDetails;
    const workoutData = await fetchWorkoutData(gender, purpose);
    if (workoutData) {
      const table = document.getElementById("weeklySchedule");
      table.innerHTML = "";
      let headerRow = `<tr>
                            <th>Ngày</th>
                            <th>Bài tập</th>
                            <th>Chi tiết</th>
                            <th>Thời gian</th>
                            <th>Calo</th>
                         </tr>`;
      table.innerHTML += headerRow;

      // Populate the table with workout data
      for (const [day, data] of Object.entries(workoutData)) {
        let details = data.details
          ? data.details
              .map(
                (detail) =>
                  `${detail.exercise}: ${detail.sets} sets x ${detail.reps} reps`
              )
              .join("<br>")
          : "";

        let row = `<tr>
                            <td>${day}</td>
                            <td>${data.workout || "Nghỉ ngơi"}</td>
                            <td>${details}</td>
                            <td>${data.duration || ""}</td>
                            <td>${data.calories || 0}</td>
                        </tr>`;
        table.innerHTML += row;
      }
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  generateWeeklySchedule();
});
