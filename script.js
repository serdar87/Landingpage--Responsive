const tabsContainer = document.querySelector(".activities__tabcontainer");
const tabContent = document.querySelectorAll(".activities__content");
const tabs = document.querySelectorAll(".activities__tab");
const header = document.querySelector(".header");
const nav = document.querySelector(".navigation");
const gallery = document.querySelector(".gallery");
const navButton = document.querySelector(".navigation__button");
const navList = document.querySelector(".navigation__list");
const navIcon = document.querySelector(".navigation__icon");

// Functions
const navigationAdapt = function () {
  navList.classList.toggle("showMenu");
  navIcon.classList.toggle("fixed");
};

//Smooth scrolling
document
  .querySelector(".navigation__list")
  .addEventListener("click", function (e) {
    e.preventDefault();

    if (e.target.closest(".navigation__link")) {
      if (window.innerWidth <= 600) {
        navigationAdapt();
        navList.classList.toggle("changeHeight");
        document.querySelector(".navigation__checkbox").checked = false;
      }
      const id = e.target.getAttribute("href");
      document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    }
  });

// Active Tabs
tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".activities__tab");
  if (!clicked) return;
  tabs.forEach((el) => el.classList.remove("activities__tab--active"));
  clicked.classList.add("activities__tab--active");

  //Activate Content Area
  tabContent.forEach((content) =>
    content.classList.remove("activities__content--active")
  );
  document
    .querySelector(`.activities__content__${clicked.dataset.tab}`)
    .classList.add("activities__content--active");
});

//Reveal Sections
const allSections = document.querySelectorAll(".section");
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.1,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

//Slider
const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");
  let currentSlide = 0;
  let maxSlide = slides.length;

  //Functions
  const createDots = function () {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide='${slide}']`)
      .classList.add("dots__dot--active");
  };

  const gotoSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${(i - slide) * 100}%)`)
    );
  };

  const nextSlide = function () {
    if (currentSlide === maxSlide - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    gotoSlide(currentSlide);
    activateDot(currentSlide);
  };
  const prevSlide = function () {
    if (currentSlide === 0) {
      currentSlide = maxSlide - 1;
    } else {
      currentSlide--;
    }
    gotoSlide(currentSlide);
    activateDot(currentSlide);
  };
  const init = function () {
    gotoSlide(0);
    createDots();
    activateDot(0);
  };
  init();

  //EventHandlers
  btnLeft.addEventListener("click", nextSlide);
  btnRight.addEventListener("click", prevSlide);

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      let { slide } = e.target.dataset;
      gotoSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

//Navigation Mobile Effect

navButton.addEventListener("click", function () {
  navigationAdapt();
  setTimeout(function () {
    navList.classList.toggle("changeHeight");
  }, 0);
});
