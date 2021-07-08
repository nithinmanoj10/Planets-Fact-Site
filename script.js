// SIDE-MENU
const navBarHamburger = document.querySelector(".nav-bar__hamburger");
const sideMenu = document.querySelector(".side-menu");
const overlay = document.querySelector(".overlay");
let sideMenuActive = false;

const showSideMenu = function () {
  if (sideMenuActive) {
    sideMenu.style.transform = "translateX(100%)";
    overlay.style.display = "none";
    sideMenuActive = false;
  } else if (!sideMenuActive) {
    sideMenu.style.transform = "translateX(0)";
    overlay.style.display = "block";
    sideMenuActive = true;
  }
};

navBarHamburger.addEventListener("click", function () {
  showSideMenu();
});

overlay.addEventListener("click", function () {
  showSideMenu();
});
