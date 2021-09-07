class KittenInfoModal{
  modal;
  modalContent;
  closeSpan;

  constructor(name, colour, age){
    this.createModal();
    this.modalContent.appendChild(
      this.formatContentText(name, colour, age)
    );

    this.closeSpan.addEventListener('click', () =>{
      this.modal.remove();
      delete this;
    });
    window.addEventListener('click', (e) =>{
      if (e.target == this.modal) {
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
    age.innerHTML = 'Dob: ' + _age;
    
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

    this.closeSpan = close;    
    modal.appendChild(modalContent);
    modalContent.appendChild(close);
    this.modalContent = modalContent;
    this.modal = modal;
  }
}
export default KittenInfoModal;

/*
<div id="myModal" class="modal">
  <div class="modal-content">
    <span class="close">&times;</span>
    <p>Some text in the Modal..</p>
  </div>
</div>
*/