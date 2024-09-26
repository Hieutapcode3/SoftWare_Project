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
