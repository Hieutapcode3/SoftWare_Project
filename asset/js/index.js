document.addEventListener("DOMContentLoaded", function () {
  const checkbox = document.getElementById("checkbox-1");
  const alertBox = document.querySelector(".alert-nonecheckbox");
  const alertIcon = document.querySelector(".alert-nonecheckbox i");
  const links = document.querySelectorAll("#body-type a");
  let isSelect = false;

  links.forEach((link) => {
    link.addEventListener("click", function (event) {
      isSelect = true;
      if (!checkbox.checked) {
        event.preventDefault();
        alertBox.style.display = "flex";
        alertIcon.classList.add("shake");
      } else {
        alertBox.style.display = "none";
        window.location.href = "form.html";
        alertIcon.classList.remove("shake");
      }
    });
  });

  checkbox.addEventListener("click", function () {
    if (isSelect) {
      if (checkbox.checked) {
        alertBox.style.display = "none";
        alertIcon.classList.remove("shake");
      } else {
        alertBox.style.display = "flex";
        alertIcon.classList.add("shake");
      }
    }
  });
});
