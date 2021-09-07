import Carousel from "./Carousel.js";
import KittensService from './Services/KittensService.js';

class Index{
  mainCarousel;
  kittensService = new KittensService;
  kittens;

  constructor(doc){
    this.kittens = this.kittensService.get();
    this.createMainCarousel(doc);
  }
  createMainCarousel = async (doc) =>{
    this.mainCarousel = new Carousel(
      doc.getElementById('mainCarousel'), 
      await this.getYoungestKittensAsync(4)
    );
  }
  getYoungestKittensAsync = async (amount) =>{
    let kittens = await this.kittens;
    if(amount >= kittens.length){
      return this.sortByAge(kittens);
    }
    return this.sortByAge(kittens).slice(0, amount);
  }
  sortByAge = (arr) =>{
    return arr.sort((a,b)=>{
      if (a.age < b.age) {
        return -1;
      }else if (a.age > b.age) {
        return 1;
      }
      return 0;
    });
  }
}

new Index(document);