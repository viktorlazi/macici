export default class KittenInfoModal{
  modal;
  modalContent;
  closeSpan;
  button;
  buyKitten;

  constructor(name, colour, age, buyKitten){
    this.buyKitten = () =>{
      buyKitten(name);
    };
    this.createModal();
    this.modalContent.appendChild(
      this.formatContentText(name, colour, age)
    );
    this.modalContent.appendChild(this.button);
    this.closeSpan.addEventListener('click', () =>{
      this.modal.remove();
      delete this;
    });
    window.addEventListener('click', (e) =>{
      if(e.target == this.modal){
        this.modal.remove();
        delete this;
      }
    });
    return this.modal;
  }
  formatContentText = (_name, _colour, _age) =>{
    const name = document.createElement('p');
    const colour = document.createElement('p');
    const age = document.createElement('p');

    name.innerHTML = 'Ime: ' + _name;
    colour.innerHTML = 'Boja: ' + _colour;
    age.innerHTML = 'Dob: ' + _age + ' mjeseca';
    
    const content = document.createElement('div');
    content.appendChild(name);
    content.appendChild(colour);
    content.appendChild(age);
    return content;
  }
  createModal = () =>{
    const modal = document.createElement('div');
    modal.setAttribute('class', 'modal');
    const modalContent = document.createElement('div');
    modalContent.setAttribute('class', 'modal-content');
    const close = document.createElement('span');
    close.setAttribute('class', 'close');
    close.innerHTML = '&times;';
    const button = document.createElement('button');
    button.innerHTML = 'udomi';
    button.addEventListener('click', () =>{
      this.buyKitten();
      this.modal.remove();
      delete this;
    });
    this.button = button;

    
    modalContent.appendChild(close);
    modal.appendChild(modalContent);
    
    this.closeSpan = close;    
    this.modalContent = modalContent;
    this.modal = modal;
  }
}