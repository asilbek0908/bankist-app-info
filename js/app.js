// Modal Window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnsShowModal = document.querySelectorAll(".btn--show-modal");
const btnCloseModal = document.querySelector(".btn--close-modal");

const showModal = () => {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const hideModal = () => {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

for (let btn of btnsShowModal) {
  btn.addEventListener("click", showModal);
}

btnCloseModal.addEventListener("click", hideModal);
overlay.addEventListener("click", hideModal);

document.addEventListener("keydown", function (e) {
  // console.log(e.key);
  if (
    e.key === "Escape" &&
    !modal.classList.contains("hidden") &&
    !overlay.classList.contains("hidden")
  ) {
    hideModal();
  }
});

////////////////////////////////////////////////////////////////////
const section1 = document.querySelector("#section--1");
const btnScroll = document.querySelector(".btn--scroll-to");

btnScroll.addEventListener("click", function () {
  section1.scrollIntoView({ behavior: "smooth" });
});

////////////////////////////////////////////////////////////////////

// Scrolling in sections which clicked in a link

document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

///////////////////////////////////////////////////////////////////

// Menu fade Animation
const nav = document.querySelector(".nav");

const handleHover = (e, opacity) => {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    // console.log(link);
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector(".nav__logo");

    siblings.forEach((el) => {
      if (el !== link) {
        el.style.opacity = opacity;
      }
    });
    logo.style.opacity = opacity;
  }
};

nav.addEventListener("mouseover", (e) => handleHover(e, 0.5));
nav.addEventListener("mouseout", (e) => handleHover(e, 1));

// Scroll

const initialCords = section1.getBoundingClientRect();
// console.log(initialCords);

window.addEventListener("scroll", function () {
  if (window.scrollY > initialCords.top) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
});

///////////////////////////////////////////////////////////////////////////

const tabsContainer = document.querySelector(".operations__tab-container");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContent = document.querySelectorAll(".operations__content");

tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");
  if (!clicked) {
    return;
  } else {
    // Removing active class from buttons
    tabs.forEach((tab) => tab.classList.remove("operations__tab--active"));
    // Adding active class in button
    clicked.classList.add("operations__tab--active");

    // Removing active class from content
    tabsContent.forEach((tabContent) =>
      tabContent.classList.remove("operations__content--active")
    );
    // Adding active class in content
    document
      .querySelector(`.operations__content--${clicked.dataset.tab}`)
      .classList.add("operations__content--active");
  }
});

/////////////////////////////////////////////////////////////////

// Slider

const slides = document.querySelectorAll(".slide");
const slider = document.querySelector(".slider");
const btnRight = document.querySelector(".slider__btn--right");
const btnLeft = document.querySelector(".slider__btn--left");

let curSlide = 0;
const maxSlide = slides.length;

// Adding style
// slider.style.overflow = "visible";

// Looping each slide
const goToSlide = (slide) => {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};

goToSlide(0);

// Next Slide
const nextSlide = () => {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSlide(curSlide);
  activateDots(curSlide);
};

// Prev Slide
const prevSlide = () => {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }

  goToSlide(curSlide);
  activateDots(curSlide);
};

// Listeners
btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    nextSlide();
  } else if (e.key === "ArrowLeft") {
    prevSlide();
  }
});

// Create dots

// `<button class="dots__dot" data-slide ="${i}" ></button>`
const dotContainer = document.querySelector(".dots");

// Added dots
const createDots = () => {
  slides.forEach((_, i) => {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot" data-slide ="${i}" ></button>`
    );
  });
};
createDots();

// Adding active class to the buttons
const activateDots = (slide) => {
  // removing active class
  document
    .querySelectorAll(".dots__dot")
    .forEach((dot) => dot.classList.remove("dots__dot--active"));
  // adding active class
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add("dots__dot--active");
};
activateDots(0);

// Listener
dotContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("dots__dot")) {
    const { slide } = e.target.dataset;
    goToSlide(slide);
    activateDots(slide);
  }
});
