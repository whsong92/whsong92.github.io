const projectSliderContainer = document.querySelector(".project-slider-container");
const slideRight = document.querySelector(".right-slide");
const slideLeft = document.querySelector(".left-slide");
const slidesLength = slideRight.querySelectorAll("div").length;

let activeSlideIndex = 0;

slideLeft.style.top = `-${(slidesLength - 1) * 100}vh`;

const changeSlide = (direction) => {
  const sliderHeight = projectSliderContainer.clientHeight;
  if (direction === "up") {
    activeSlideIndex++;
    if (activeSlideIndex > slidesLength - 1) activeSlideIndex = 0;
  } else if (direction === "down") {
    activeSlideIndex--;
    if (activeSlideIndex < 0) activeSlideIndex = slidesLength - 1;
  }
  slideRight.style.transform = `translateY(-${activeSlideIndex * sliderHeight}px)`;
  slideLeft.style.transform = `translateY(${activeSlideIndex * sliderHeight}px)`;
};

//upButton.addEventListener("click", () => changeSlide("up"));
//downButton.addEventListener("click", () => changeSlide("down"));

slideLeft.addEventListener("wheel", (e) => {
  changeSlide(e.deltaY > 0 ? "up": "down");
});

slideRight.addEventListener("wheel", (e) => {
  changeSlide(e.deltaY > 0 ? "up": "down");
});


