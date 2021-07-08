// SIDE-MENU
const navBarHamburger = document.querySelector(".nav-bar__hamburger");
const sideMenu = document.querySelector(".side-menu");
const sideMenuList = document.querySelector(".side-menu__list");
const overlay = document.querySelector(".overlay");
let sideMenuActive = false;

const showSideMenu = function () {
  if (sideMenuActive) {
    sideMenu.style.height = "0";
    overlay.style.display = "none";
    sideMenuList.style.opacity = "0";
    sideMenuActive = false;
  } else if (!sideMenuActive) {
    sideMenu.style.height = "70px";
    overlay.style.display = "block";
    sideMenuActive = true;
    sideMenuList.style.opacity = "1";
  }
};

navBarHamburger.addEventListener("click", function () {
  showSideMenu();
});

overlay.addEventListener("click", function () {
  showSideMenu();
});
