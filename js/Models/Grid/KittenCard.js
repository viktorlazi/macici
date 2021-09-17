export default class KittenCard{
  constructor(args, buttonFunction){
    const img = document.createElement('img');
    img.setAttribute('src', `./assets/${args.name}.jpg`);
    const p = document.createElement('p');
    p.innerHTML = args.name + ', ' + args.colour + ', ' + args.age + ' mjeseca';
    const button = document.createElement('button');
    button.innerHTML = 'udomi';
    button.addEventListener('click', ()=>{
      buttonFunction(args.name)
    });
    
    const card = document.createElement('div')
    card.setAttribute('class', 'card');
    card.appendChild(img);
    card.appendChild(p);
    card.appendChild(button);
    return card;
  }
}