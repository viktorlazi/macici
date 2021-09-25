import KittenCard from "./KittenCard.js";
import SearchFilter from "./SearchFilter.js";

export default class KittenManager{
  kittenManager;
  grid;
  kittens;
  showMore = false;
  showMoreButton;
  searchFilter;
  buyKitten;
  showMoreButton;

  constructor(kittenManager, kittens, buyKitten){
    this.kittenManager = kittenManager;
    this.kittens = kittens;
    this.buyKitten = buyKitten;
    this.showMoreButton = kittenManager.querySelector('.show-more');
    this.grid = kittenManager.querySelector('.kitten-grid');
    this.showMoreButton = kittenManager.querySelector('.show-more');
    this.showMoreButton.addEventListener('click', this.showMoreKittensButtonHendler);
    this.searchFilter = new SearchFilter(
      kittenManager.querySelector('.filters'),
      this.updateDOM
    );
    this.updateDOM();
  }
  getFilteredKittens = () =>{
    return this.kittens.filter(e =>{
      const searchContainsName = e.name.toLowerCase().includes(this.searchFilter.searchBox.value.toLowerCase());
      const isUnderAgeLimit = this.searchFilter.ageLimit? (e.age < this.searchFilter.ageLimit) : true;
      const isRightColour = this.searchFilter.colourFilter? (e.colour.includes(this.searchFilter.colourFilter)) : true;
      return searchContainsName && isUnderAgeLimit && isRightColour;
    });
  }
  removeOne = (name) =>{
    this.kittens = this.kittens.filter(e => e.name !== name);
    this.updateDOM();
  }
  updateDOM = () =>{
    this.grid.innerHTML = '';
    const filteredKittens = this.getFilteredKittens();
    filteredKittens.slice(0, this.getShowingPerPage()).forEach(e => {
      this.grid.appendChild(new KittenCard(e, this.buyKitten));
    });
    if(this.kittens.length === 0){
      this.toggleNothingToDisplayMsg();
    }
    if(!this.showMore){
      if(this.getShowingPerPage() > filteredKittens.length){
        this.showMoreButton.style.visibility = 'hidden';
      }else{
        this.showMoreButton.style.visibility = 'visible';
      }
    }
  }
  toggleNothingToDisplayMsg = () =>{
    this.searchFilter.filtersDiv.style.visibility = 'hidden';
    this.showMoreButton.style.visibility = 'hidden';
    const msgExists = this.kittenManager.querySelector('h1');
    if(msgExists){
      return this.kittenManager.removeChild('h1');
    }
    const noDisplay = document.createElement('h1');
    noDisplay.innerHTML = 'Svi mačići su udomljeni :)'
    return this.kittenManager.appendChild(noDisplay);
  }
  getShowingPerPage = () =>{
    if(this.showMore){
      return this.kittens.length;
    }
    return 10;
  }
  showMoreKittensButtonHendler = () =>{
    this.showMore = true;
    this.showMoreButton.style.visibility = 'hidden';
    this.updateDOM();
  }
}