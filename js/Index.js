import Carousel from "./Models/Carousel/Carousel.js";
import KittensService from './Services/KittensService.js';
import KittenManager from "./Models/Grid/KittenManager.js";

class Index{
  kittens;
  unavailableKittens = ['Iris'];
  mainCarousel;
  mainKittenGrid;
  kittensService = new KittensService;

  constructor(doc){
    this.kittens = this.kittensService.get();
    this.updateMainCarousel(doc);
    this.updateMainKittenManager(doc);
  }
  updateMainCarousel = async (doc) =>{
    this.mainCarousel = new Carousel(
      doc.getElementById('mainCarousel'), 
      await this.getYoungestKittensAsync(4)
    );
  }
  updateMainKittenManager = async (doc) =>{
    this.mainKittenGrid = new KittenManager(
      doc.getElementById('mainKittenManager'),
      await this.getYoungestKittensAsync()
    );
  }
  buyKitten = (name) =>{
    this.unavailableKittens.push(name);
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
