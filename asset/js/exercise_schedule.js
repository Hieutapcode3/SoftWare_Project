async function fetchWorkoutData(gender, purpose) {
    try {
        const filePath = gender === 'male' 
            ? '/asset/data/workout_schedule/male.json' 
            : '/asset/data/workout_schedule/female.json';

        const response = await fetch(filePath);

        if (!response.ok) {
            throw new Error('Mạng không thành công: ' + response.statusText);
        }

        const workoutData = await response.json();
        return workoutData[gender][purpose];
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
    }
}

async function generateWeeklySchedule() {
    const gender = document.getElementById("gender").value;
    const purpose = document.getElementById("purpose").value;

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

        for (const [day, data] of Object.entries(workoutData)) {
            let details = data.details ? data.details.map(detail => `${detail.exercise}: ${detail.sets} sets x ${detail.reps} reps`).join('<br>') : ''; // Mỗi chi tiết trên một dòng
            let row = `<tr>
                            <td>${day}</td>
                            <td>${data.workout || 'Nghỉ ngơi'}</td>
                            <td>${details}</td>
                            <td>${data.duration || ''}</td>
                            <td>${data.calories || 0}</td>
                        </tr>`;
            table.innerHTML += row;
        }
    }
}
