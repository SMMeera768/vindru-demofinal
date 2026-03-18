const scrollContainer = document.querySelector(".products-scroll");
const btnLeft = document.querySelector(".scroll-btn.left");
const btnRight = document.querySelector(".scroll-btn.right");

let isUserInteracting = false;
let autoScrollSpeed = 0.6;   // smooth speed
let autoScroll;

/* AUTO SCROLL LOOP */
function startAutoScroll() {
  autoScroll = setInterval(() => {
    if (!isUserInteracting) {
      scrollContainer.scrollLeft += autoScrollSpeed;
    }
  }, 16); // ~60fps
}

function stopAutoScroll() {
  clearInterval(autoScroll);
}

/* USER SCROLL */
function userScroll(amount) {
  isUserInteracting = true;
  scrollContainer.scrollLeft += amount;

  // resume auto scroll after user stops
  setTimeout(() => {
    isUserInteracting = false;
  }, 1200);
}

/* ARROW EVENTS */
btnLeft.addEventListener("click", () => {
  userScroll(-320);
});

btnRight.addEventListener("click", () => {
  userScroll(320);
});

/* PAUSE WHEN HOVERING */
scrollContainer.addEventListener("mouseenter", () => {
  isUserInteracting = true;
});

scrollContainer.addEventListener("mouseleave", () => {
  isUserInteracting = false;
});

/* START */
startAutoScroll();