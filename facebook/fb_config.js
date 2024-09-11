window.fbAsyncInit = function () {
  FB.init({
    appId: "YOUR_APP_ID", // Thay YOUR_APP_ID bằng App ID của bạn từ Facebook Developer
    cookie: true, // Cho phép sử dụng cookie để theo dõi trạng thái đăng nhập
    xfbml: true, // Xử lý các nút Facebook
    version: "v15.0", // Phiên bản API
  });

  FB.AppEvents.logPageView();
};

// Kiểm tra trạng thái đăng nhập
function checkLoginState() {
  FB.getLoginStatus(function (response) {
    statusChangeCallback(response);
  });
}

function statusChangeCallback(response) {
  if (response.status === "connected") {
    // Người dùng đã đăng nhập
    FB.api("/me", { fields: "name,email" }, function (response) {
      console.log("Chào mừng " + response.name + "!");
      // Gửi thông tin đến server PHP để xử lý
      fetch("fb-callback.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: response.name,
          email: response.email,
          id: response.id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            window.location.href = "welcome.php"; // Chuyển hướng sau khi đăng nhập thành công
          } else {
            alert("Đăng nhập thất bại");
          }
        });
    });
  } else {
    console.log("Người dùng chưa đăng nhập Facebook");
  }
}
