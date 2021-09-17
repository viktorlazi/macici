import KittenCard from "./KittenCard.js";
import SearchFilter from "./SearchFilter.js";

export default class KittenManager{
  gridElement;
  allKittens;
  displayKittens = [];
  showingPerPage = 10;
  showingPerRow = 5;
  showMoreButton;
  searchFilter;
  buyKitten;

  constructor(kittenManager, allKittens, buyKitten){
    this.allKittens = allKittens;
    this.buyKitten = buyKitten;
    this.gridElement = kittenManager.querySelector('.kitten-grid');
    this.showMoreButton = kittenManager.querySelector('.show-more');
    this.showMoreButton.addEventListener('click', this.showMoreKittens);
    this.searchFilter = new SearchFilter(
      kittenManager.querySelector('.filters'),
      this.updateDOM
    );
    this.filter();
    this.updateDOM();
  }
  filter = () =>{
    return this.allKittens.filter(e =>{
      const searchContainsName = e.name.toLowerCase().includes(this.searchFilter.searchBox.value.toLowerCase());
      const isUnderAgeLimit = this.searchFilter.ageLimit? (e.age < this.searchFilter.ageLimit) : true;
      const isRightColour = this.searchFilter.colourFilter? (e.colour.includes(this.searchFilter.colourFilter)) : true;
      return searchContainsName && isUnderAgeLimit && isRightColour;
    });
  }
  removeOne = (name) =>{
    this.allKittens = this.allKittens.filter(e => e.name !== name)
    this.updateDOM();
  }
  updateDOM = () =>{
    this.gridElement.innerHTML = '';
    const filteredKittens = this.filter();
    filteredKittens.slice(0, this.showingPerPage).forEach(e => {
      this.gridElement.appendChild(new KittenCard(e, this.buyKitten));
    });
  }
  showMoreKittens = () =>{
    if(this.showingPerPage < this.allKittens.length){
      this.showingPerPage += this.showingPerRow;
    }else{
      this.showingPerPage = 10;
    }
    if(this.showingPerPage >= this.allKittens.length){
      this.showMoreButton.innerHTML = 'prikaži manje';
    }else{
      this.showMoreButton.innerHTML = 'prikaži više';
    }
    this.updateDOM();
  }
}