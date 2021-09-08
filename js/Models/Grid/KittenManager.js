import KittenCard from "./KittenCard.js";
import SearchFilter from "./SearchFilter.js";

export default class KittenManager{
  gridElement;
  allKittens;
  displayKittens = [];
  unavailableKitten = ['alex', 'iris'];
  showingPerPage = 10;
  showingPerRow = 5;
  showMoreButton;
  searchFilter;

  constructor(kittenManager, allKittens){
    this.allKittens = allKittens;
    this.gridElement = kittenManager.querySelector('.kitten-grid');
    this.showMoreButton = kittenManager.querySelector('.show-more');
    this.showMoreButton.addEventListener('click', this.showMoreKittens);
    this.searchFilter = new SearchFilter(
      kittenManager.querySelector('.filters'),
      this.updateDOM
    );
    this.filter();
    this.updateDOM();
    return this.gridElement;
  }
  filter = () =>{
    return this.allKittens.filter(e =>{
      const searchContainsName = e.name.toLowerCase().includes(this.searchFilter.searchBox.value.toLowerCase());
      const isUnderAgeLimit = this.searchFilter.ageLimit? (e.age < this.searchFilter.ageLimit) : true;
      const isRightColour = this.searchFilter.colourFilter? (e.colour.includes(this.searchFilter.colourFilter)) : true;
      const isAvailable = !this.unavailableKitten.includes(e.name.toLowerCase());
      console.log(isAvailable);
      return searchContainsName && isUnderAgeLimit && isRightColour && isAvailable;
    });
  }
  updateDOM = () =>{
    this.gridElement.innerHTML = '';
    const filteredKittens = this.filter();
    filteredKittens.slice(0, this.showingPerPage).forEach(e => {
      this.gridElement.appendChild(new KittenCard(e, null));
    });
  }
  buyKitten = (name) =>{
    this.unavailableKitten.push(name.toLowerCase());
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