import Carousel from "./Models/Carousel/Carousel.js";
import KittensService from './Services/KittensService.js';
import KittenManager from "./Models/Grid/KittenManager.js";

class Index{
  document;
  kittens;
  unavailableKittens = [];
  mainCarousel;
  kittenManager;
  kittensService = new KittensService;

  constructor(doc){
    this.document = doc;
    this.kittens = this.kittensService.get();
    
    this.initMainCarousel(doc);
    this.initMainKittenManager(doc);
  }
  initMainCarousel = async (doc) =>{
    doc.getElementById('mainCarousel').querySelector('.carousel-items').innerHTML = '';
    this.mainCarousel = new Carousel(
      doc.getElementById('mainCarousel'), 
      await this.getYoungestKittensAsync(4),
      this.buyKitten
    );
  }
  initMainKittenManager = async (doc) =>{
    this.kittenManager = new KittenManager(
      doc.getElementById('mainKittenManager'),
      await this.getYoungestKittensAsync(),
      this.buyKitten
    );
  }
  buyKitten = async (name) =>{
    this.unavailableKittens.push(name);
    this.kittenManager.removeOne(name);
    this.mainCarousel.update(await this.getYoungestKittensAsync(4));
  }
  getYoungestKittensAsync = async (amount) =>{
    const kittens = this.filterUnavailable(await this.kittens);
    if(amount >= kittens.length){
      return this.sortByAge(kittens);
    }
    return this.sortByAge(kittens).slice(0, amount);
  }
  filterUnavailable = (kittens) =>{
    return kittens.filter(e =>{
      return !this.unavailableKittens.includes(e.name);
    });
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
