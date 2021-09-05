const carouselItems = document.getElementById("carouselItems");
const leftArrow = document.getElementById("leftArrow");
const rightArrow = document.getElementById("rightArrow");

let activeSlide = 0;
let carouselIsBeingScrolled = false;

const autoScrolling = setInterval(() =>{
  const hoveredActiveSlideExists = carouselItems.querySelector('.active:hover');
  if(activeSlide === 3){
    clearInterval(autoScrolling);
  }
  if(!hoveredActiveSlideExists){
    moveSlideForwards();
  }
}, 3000);

const moveSlideForwards = () =>{
  carouselItems.scrollBy({
    top: 0,
    left: 400,
    behavior: 'smooth'
  });
  if(activeSlide < 3){
    carouselItems.children[activeSlide].classList.remove('active');
    carouselItems.children[activeSlide+1].classList.add('active');
    activeSlide++;
  }
}
const moveSlideBackwards = () =>{
  carouselItems.scrollBy({
    top: 0,
    left: -400,
    behavior: 'smooth'
  });
  if(activeSlide){
    carouselItems.children[activeSlide].classList.remove('active');
    carouselItems.children[activeSlide-1].classList.add('active');
    activeSlide--;
  }
}

leftArrow.addEventListener('click', () =>{
  moveSlideBackwards();
  clearInterval(autoScrolling);
});
rightArrow.addEventListener('click', () =>{
  moveSlideForwards();
  clearInterval(autoScrolling);
});