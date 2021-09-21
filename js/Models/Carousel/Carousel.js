import KittenInfoModal from "./KittenInfoModal.js";

class Carousel{
  carouselItems;
  activeSlideIndex;
  scrollAmount;
  kittens;
  buyKitten;

  constructor(carouselElement, kittens, buyKitten, initialSlide=0){
    this.kittens = kittens;
    this.buyKitten = buyKitten;
    this.carouselItems = carouselElement.querySelector('.carousel-items');
    this.addSlidesToCarousel(kittens);
    this.scrollAmount = carouselElement.offsetWidth / 2;
    this.activeSlideIndex = initialSlide < kittens.length? initialSlide:0;
    this.setInitialSlide();
    this.initArrowEventListeners(carouselElement);
    this.initAutoScrolling;
  }
  update = (newKittens) =>{
    this.kittens = newKittens;
    this.carouselItems.innerHTML = '';
    this.addSlidesToCarousel(newKittens);
    this.setInitialSlide();
    this.initAutoScrolling;
  }
  openModal = () =>{
    const kittenInfo = this.kittens[this.activeSlideIndex];
    document.body.appendChild(new KittenInfoModal(
      kittenInfo.name,
      kittenInfo.colour,
      kittenInfo.age,
      this.buyKitten
    ));
  }
  setInitialSlide = () =>{
    this.carouselItems.scrollTo({
      left: this.scrollAmount*this.activeSlideIndex
    });
    this.carouselItems.children[this.activeSlideIndex].classList.add('active');
    this.setClickListenerForActiveSlide();
  }
  setClickListenerForActiveSlide = () =>{
    this.carouselItems.children[this.activeSlideIndex]
    .addEventListener('click', this.openModal);
  }
  removeClickListenerForActiveSlide = () =>{
    this.carouselItems.children[this.activeSlideIndex]
    .removeEventListener('click', this.openModal);
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
    const activeSlideIsHoveredIndex = this.carouselItems.querySelector('.active:hover');
    if(this.activeSlideIndex === 3){
      clearInterval(this.initAutoScrolling);
    }
    if(!activeSlideIsHoveredIndex && !document.hidden){
      this.moveSlideForwards();
    }
  }, 3000);
  moveSlideForwards = () =>{
    this.carouselItems.scrollBy({
      left: this.scrollAmount,
      behavior: 'smooth'
    });
    if(this.activeSlideIndex < 3){
      this.removeClickListenerForActiveSlide();
      this.carouselItems.children[this.activeSlideIndex].classList.remove('active');
      this.carouselItems.children[this.activeSlideIndex+1].classList.add('active');
      this.activeSlideIndex++;
      this.setClickListenerForActiveSlide();
    }
  }
  moveSlideBackwards = () =>{
    this.carouselItems.scrollBy({
      left: -this.scrollAmount,
      behavior: 'smooth'
    });
    if(this.activeSlideIndex){
      this.removeClickListenerForActiveSlide();
      this.carouselItems.children[this.activeSlideIndex].classList.remove('active');
      this.carouselItems.children[this.activeSlideIndex-1].classList.add('active');
      this.activeSlideIndex--;
      this.setClickListenerForActiveSlide();
    }
  }
  addSlidesToCarousel = (items) =>{
    this.carouselItems.innerHTML = '';
    items.forEach((e) =>{
      this.carouselItems.appendChild(this.createSlideElement(e.name));
    });
  }
  createSlideElement = (name) =>{
    const slide = document.createElement('div');
    slide.setAttribute('class', 'carousel-item');    
    slide.setAttribute('name', name);
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