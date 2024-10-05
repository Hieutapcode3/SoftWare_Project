async function fetchNutritionData(gender) {
    try {
        // Xác định đường dẫn file JSON dựa vào giới tính
        const filePath = gender === 'male' ? '/asset/data/nutrition_schedule/male.json' : '/asset/data/nutrition_schedule/female.json';
        
        const response = await fetch(filePath);
        
        // Kiểm tra xem phản hồi có thành công không
        if (!response.ok) {
            throw new Error('Mạng không thành công: ' + response.statusText);
        }

        // Chuyển đổi dữ liệu từ response sang JSON
        const nutritionData = await response.json();
        
        // Trả về dữ liệu
        return nutritionData;
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
    }
}

async function generateWeeklySchedule() {
    const gender = document.getElementById("gender").value; // Lấy giá trị giới tính
    const purpose = document.getElementById("purpose").value; // Lấy giá trị mục đích
    const dietType = document.getElementById("dietType").value; // Lấy giá trị loại thực đơn

    // Gọi hàm fetchNutritionData với giới tính
    const nutritionData = await fetchNutritionData(gender);

    // Kiểm tra nếu có dữ liệu
    if (nutritionData) {
        const diet = nutritionData[gender][purpose][dietType]; // Thay đổi để lấy dữ liệu đúng từ cấu trúc JSON
        const schedule = diet; // Lấy lịch trình

        // Tạo bảng
        const table = document.getElementById("weeklySchedule");
        table.innerHTML = ""; // Xóa nội dung bảng cũ

        // Tiêu đề bảng
        let headerRow = `<tr>
                            <th>Ngày</th>
                            <th>Bữa sáng</th>
                            <th>Bữa trưa</th>
                            <th>Bữa ăn nhẹ</th>
                            <th>Bữa tối</th>
                            <th>Tổng Calo</th>
                         </tr>`;
        table.innerHTML += headerRow;

        // Duyệt qua từng ngày và thêm vào bảng
        schedule.forEach(dayData => {
            const breakfastCalories = dayData.meals.breakfast.calories;
            const lunchCalories = dayData.meals.lunch.calories;
            const snackCalories = dayData.meals.snack.calories;
            const dinnerCalories = dayData.meals.dinner.calories;

            // Tính tổng calo cho ngày hiện tại
            const totalCalories = breakfastCalories + lunchCalories + snackCalories + dinnerCalories;

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
