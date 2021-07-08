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

// GETTING JSON DATA

let planetsData;

fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    planetsData = data;
  });

// WORKING
const planetMainLinks = document.querySelectorAll(".main-menu__list__item");
const planetSideLinks = document.querySelectorAll(".side-menu__list__item");

// gets the planet object from data.json depensing on which link was clicked
const getPlanetData = function (links) {
  links.forEach(function (link) {
    link.addEventListener("click", function (clickedLink) {
      planetLink = clickedLink.target;
      planetsData.forEach(function (planetObject) {
        if (planetObject.name == planetLink.text) {
          updateView(planetObject);
        }
      });
    });
  });
};

getPlanetData(planetMainLinks);
getPlanetData(planetSideLinks);

// planet is an object, gonna update the description based on the object
const updateView = function (planet) {
  const planetInfoHeading = document.querySelector(".planet-info__heading");
  const planetInfoDescription = document.querySelector(
    ".planet-info__description"
  );

  const planetRotation = document.getElementById("rotation-data");
  const planetRevolution = document.getElementById("revolution-data");
  const planetRadius = document.getElementById("radius-data");
  const planetTemp = document.getElementById("temperature-data");
  const planetPicture = document.querySelector(".planet-picture");

  const { rotation, revolution, radius, temperature } = planet;
  const { planet: planetPic, internal, geology } = planet.images;

  planetInfoHeading.innerHTML = planet.name;
  planetInfoDescription.innerHTML = planet.overview.content;
  planetRotation.innerHTML = rotation;
  planetRevolution.innerHTML = revolution;
  planetRadius.innerHTML = radius;
  planetTemp.innerHTML = temperature;
  planetPicture.style.backgroundImage = `url(${planetPic})`;
};
