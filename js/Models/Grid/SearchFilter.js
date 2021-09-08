export default class SearchFilter{
  searchBox;
  ageLimit;
  colourFilter;
  youngerThan6CheckBox;
  youngerThan12CheckBox;
  colourIsBlackCheckBox;
  
  constructor(filtersDiv, shouldUpdate){
    this.searchBox = filtersDiv.querySelector('.search-box');
    this.searchBox.addEventListener('input', shouldUpdate);

    this.youngerThan6CheckBox = filtersDiv.querySelector('#youngerThan6');
    this.youngerThan12CheckBox = filtersDiv.querySelector('#youngerThan12');
    this.colourIsBlackCheckBox = filtersDiv.querySelector('#colourIsBlack');

    this.youngerThan6CheckBox.addEventListener('change', () =>{
      this.calculateAgeLimit();
      shouldUpdate();
    });
    this.youngerThan12CheckBox.addEventListener('change', () =>{
      this.calculateAgeLimit();
      shouldUpdate();
    });
    this.colourIsBlackCheckBox.addEventListener('change', () =>{
      if(this.colourIsBlackCheckBox.checked){
        this.colourFilter = 'crna';
      }else{
        this.colourFilter = '';
      }
      shouldUpdate();
    });
  }
  calculateAgeLimit = () =>{
    if(this.youngerThan6CheckBox.checked){
      this.ageLimit = 6;
    }else if(this.youngerThan12CheckBox.checked){
      this.ageLimit = 12;
    }else{
      this.ageLimit = 1000;
    }
  }
}