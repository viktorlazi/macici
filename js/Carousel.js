class Carousel{
  carouselItems;
  activeSlide;
  scrollAmount;

  constructor(carousel, kittens, initialSlide=0){
    this.carouselItems = carousel.querySelector('.carousel-items');
    this.addSlidesToCarousel(kittens);
    this.scrollAmount = carousel.offsetWidth / 2;
    this.activeSlide = initialSlide < kittens.length? initialSlide:0;
    this.setInitialSlide();
    this.initArrowEventListeners(carousel);
    this.initAutoScrolling;
  }
  setInitialSlide = () =>{
    this.carouselItems.scrollTo({
      left: this.scrollAmount*this.activeSlide
    });
    this.carouselItems.children[this.activeSlide].classList.add('active');
  }
  initArrowEventListeners = (carousel) =>{
    const leftArrow = carousel.querySelector('.arrows .left-arrow');
    const rightArrow = carousel.querySelector('.arrows .right-arrow');
    leftArrow.addEventListener('click', () =>{
      this.moveSlideBackwards();
      clearInterval(this.initAutoScrolling);
    });
    rightArrow.addEventListener('click', () =>{
      this.moveSlideForwards();
      clearInterval(this.initAutoScrolling);
    });
  }
  initAutoScrolling = setInterval(() =>{
    const activeSlideIsHovered = this.carouselItems.querySelector('.active:hover');
    if(this.activeSlide === 3){
      clearInterval(this.initAutoScrolling);
    }
    if(!activeSlideIsHovered && !document.hidden){
      this.moveSlideForwards();
    }
  }, 3000);
  moveSlideForwards = () =>{
    this.carouselItems.scrollBy({
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
      left: -this.scrollAmount,
      behavior: 'smooth'
    });
    if(this.activeSlide){
      this.carouselItems.children[this.activeSlide].classList.remove('active');
      this.carouselItems.children[this.activeSlide-1].classList.add('active');
      this.activeSlide--;
    }
  }
  addSlidesToCarousel = (items) =>{
    this.carouselItems.innerHTML = '';
    items.forEach((e) =>{
      this.carouselItems.appendChild(this.createSlide(e.name));
    });
  }
  createSlide = (name) =>{
    const slide = document.createElement('div');
    slide.setAttribute('class', 'carousel-item');    
    const img = document.createElement('img');
    img.setAttribute('src', `./assets/${name}.jpg`)
    slide.appendChild(img);
    const h1 = document.createElement('h1');
    h1.innerHTML = name;
    slide.appendChild(h1);
    return slide;
  }
}
export default Carousel;