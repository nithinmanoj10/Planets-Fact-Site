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
let currentPlanet;

fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    planetsData = data;
  });

// WORKING
const planetMainLinks = document.querySelectorAll(".main-menu__list__item");
const planetSideLinks = document.querySelectorAll(".side-menu__list__item");

// gets the planet object from data.json depending on which link was clicked
const getPlanetData = function (links) {
  links.forEach(function (link) {
    link.addEventListener("click", function (clickedLink) {
      planetLink = clickedLink.target;
      planetsData.forEach(function (planetObject) {
        if (planetObject.name == planetLink.text) {
          currentPlanet = planetObject;
          updateView(planetObject);
          changeActiveMain(planetLink);
          changeActiveSide(planetLink);
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
  console.log(planet);
  const { planet: planetPic, internal, geology } = planet.images;

  const sectionId = activeSectionTab();
  console.log(sectionId);
  console.log(planet);

  if (sectionId == "overview") {
    planetInfoDescription.innerHTML = planet.overview.content;
    planetPicture.style.backgroundImage = `url(${getAbsoluteLink(planetPic)})`;
  }
  if (sectionId == "structure") {
    planetInfoDescription.innerHTML = planet.structure.content;
    planetPicture.style.backgroundImage = `url(${getAbsoluteLink(internal)})`;
  }
  if (sectionId == "geology") {
    planetInfoDescription.innerHTML = planet.geology.content;
    planetPicture.style.backgroundImage = `url(${getAbsoluteLink(geology)})`;
  }

  planetInfoHeading.innerHTML = planet.name;
  planetRotation.innerHTML = rotation;
  planetRevolution.innerHTML = revolution;
  planetRadius.innerHTML = radius;
  planetTemp.innerHTML = temperature;
};

// SECTIONS TAB

const sectionBox = document.querySelector(".sections");
sectionBox.addEventListener("click", function () {
  const sectionsTab = document.querySelectorAll(".sections__list__item__link");
  sectionsTab.forEach(function (tab) {
    tab.addEventListener("click", function () {
      sectionsTab.forEach(function (item) {
        item.classList.remove("active");
      });
      tab.classList.add("active");

      console.log(currentPlanet);
      updateView(currentPlanet);
    });
  });
});

const activeSectionTab = function () {
  const sectionsTab = document.querySelectorAll(".sections__list__item__link");
  let id;
  sectionsTab.forEach(function (tab) {
    if (tab.classList.contains("active")) {
      console.log(tab.id);
      id = tab.id;
    }
  });
  return id;
};

// function to make absolute link for images
const getAbsoluteLink = function (relativeLink) {
  const absoluteLink =
    "https://nithinmanoj10.github.io/Planets-Fact-Site/img/" + relativeLink;
  return absoluteLink;
};

// function to change the active tab on the nav bar
const changeActiveMain = function (planetLink) {
  planetMainLinks.forEach(function (item) {
    if (item.firstElementChild.classList.contains("active")) {
      item.firstElementChild.classList.remove("active");
    }
  });
  planetLink.classList.add("active");
};

// function to change active tab on the side menu bar
const changeActiveSide = function (planetLink) {
  planetSideLinks.forEach(function (item) {
    if (item.firstElementChild.classList.contains("active")) {
      item.firstElementChild.classList.remove("active");
    }
  });
  planetLink.classList.add("active");
};
