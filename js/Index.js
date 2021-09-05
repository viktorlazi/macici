import Carousel from "./Carousel.js";
import KittensService from './Services/KittensService.js';


class Index{
  mainCarousel;
  kittensService = new KittensService;
  kittens;

  constructor(doc){
    this.kittens = this.kittensService.get();
    this.mainCarousel = new Carousel(doc.getElementById('mainCarousel'));
  }
}

new Index(document);
