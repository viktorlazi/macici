export default class KittenCard{
  confirmation = false;

  constructor(args, buttonFunction){
    const img = document.createElement('img');
    img.setAttribute('src', `./assets/${args.name}.jpg`);
    const p = document.createElement('p');
    p.innerHTML = args.name + ', ' + args.colour + ', ' + args.age + '. mjesec';
    const button = document.createElement('button');
    button.innerHTML = 'udomi';
    button.addEventListener('click', () =>{
      this.buttonConfirmation(button, args.name, buttonFunction);
    });
    
    const card = document.createElement('div')
    card.setAttribute('class', 'card');
    card.appendChild(img);
    card.appendChild(p);
    card.appendChild(button);
    return card;
  }
  buttonConfirmation = (button, name, buttonFunction) =>{
    if(this.confirmation){
      buttonFunction(name);
      return;
    }
    this.confirmation = true;
    button.innerHTML = 'POTVRDI';

    setTimeout(() =>{
      let time = 0;
      const counter = setInterval(() =>{
        button.innerHTML = 'POTVRDI ' + (3-time);
        time += 1;
        if(time > 3){
          clearInterval(counter);
          this.confirmation = false;
          button.innerHTML = 'udomi';
        }
      }, 333);
    }, 1000);
  }
}