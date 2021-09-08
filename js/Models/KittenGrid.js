import KittenCard from "./KittenCard.js";

export default class KittenGrid{
  gridElement;
  allKittens;
  displayKittens = [];
  showingPerPage = 10;
  constructor(gridElement, allKittens){
    this.gridElement = gridElement;
    this.allKittens = allKittens;
    this.filter();
    this.updateDOM();
    return this.gridElement;
  }
  filter = () =>{
    this.displayKittens = this.allKittens;
  }
  updateDOM = () =>{
    this.gridElement.innerHTML = '';
    this.displayKittens.slice(0, this.showingPerPage)
    .forEach(e => {
      this.gridElement.appendChild(new KittenCard(
        e, ()=>{
          alert(e.name)
        }
      ));
    });
  }
}