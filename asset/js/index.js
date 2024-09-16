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
