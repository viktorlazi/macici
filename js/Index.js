import Carousel from "./Models/Carousel/Carousel.js";
import KittensService from './Services/KittensService.js';
import KittenManager from "./Models/Grid/KittenManager.js";

class Index{
  kittens;
  mainCarousel;
  mainKittenGrid;
  kittensService = new KittensService;

  constructor(doc){
    this.kittens = this.kittensService.get();
    this.createMainCarousel(doc);
    this.createMainKittenManager(doc);
  }
  createMainCarousel = async (doc) =>{
    this.mainCarousel = new Carousel(
      doc.getElementById('mainCarousel'), 
      await this.getYoungestKittensAsync(4)
    );
  }
  createMainKittenManager = async (doc) =>{
    this.mainKittenGrid = new KittenManager(
      doc.getElementById('mainKittenManager'),
      await this.getYoungestKittensAsync()
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
