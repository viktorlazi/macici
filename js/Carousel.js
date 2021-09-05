class Carousel{
  carouselItems;
  leftArrow;
  rightArrow;
  activeSlide = 0;
  scrollAmount;
  shouldAutoScroll = true;

  constructor(carousel){
    this.carouselItems = carousel.querySelector('.carousel-items');
    this.leftArrow = carousel.querySelector('.arrows .left-arrow');
    this.rightArrow = carousel.querySelector('.arrows .right-arrow');
    this.scrollAmount = carousel.offsetWidth/2;
    this.leftArrow.addEventListener('click', () =>{
      this.moveSlideBackwards();
      this.shouldAutoScroll = false;
    });
    this.rightArrow.addEventListener('click', () =>{
      this.moveSlideForwards();
      this.shouldAutoScroll = false;
    });
    this.initAutoScrolling;
  }
  initAutoScrolling = setInterval(() =>{
    const hoveredActiveSlideExists = this.carouselItems.querySelector('.active:hover');
    if(this.activeSlide === 3 || !this.shouldAutoScroll){
      clearInterval(this.initAutoScrolling);
    }
    if(!hoveredActiveSlideExists){
      this.moveSlideForwards();
    }
  }, 3000);
  moveSlideForwards = () =>{
    this.carouselItems.scrollBy({
      top: 0,
      left: this.scrollAmount,
      behavior: 'smooth'
    });
    if(this.activeSlide < 3){
      this.carouselItems.children[this.activeSlide].classList.remove('active');
      this.carouselItems.children[this.activeSlide+1].classList.add('active');
      this.activeSlide++;
    }
  }
  moveSlideBackwards = () =>{
    this.carouselItems.scrollBy({
      top: 0,
      left: -this.scrollAmount,
      behavior: 'smooth'
    });
    if(this.activeSlide){
      this.carouselItems.children[this.activeSlide].classList.remove('active');
      this.carouselItems.children[this.activeSlide-1].classList.add('active');
      this.activeSlide--;
    }
  }
}
export default Carousel;