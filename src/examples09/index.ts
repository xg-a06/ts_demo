function add1(x:number,y:number):number{
  return x+y;
}

let myAdd1:(x:number,y?:number)=>number=(x:number,y?:number):number=>{
  if(!y){
    y=2;
  }
  return x+y;
}

let z:number=100;

function addToZ(x:number,y:number):number{
  return x+y+z;
}



function buildName(firstName:string,lastName:string ='Smith',...restNames:string[]):string{
  return `${firstName} ${lastName}`;
}

console.log(buildName('Bob'));
console.log(buildName('Bob','Adams'));
console.log(buildName('Bob','Adams','dd'));


interface Card{
  suit:string,
  card:number
}

interface Deck{
  suits:string[]
  cards:number[]
  createCardPicker():()=>Card
}
let deck:Deck={
  suits:['hearts','spades','clubs','diamonds'],
  cards:Array(52),
  createCardPicker:function (this:Deck) {
     return  ()=>{
       let pickedCard=Math.floor(Math.random()*52);
       let pickedSuit=Math.floor(pickedCard/13);
       return {
         suit:this.suits[pickedSuit],
         card:pickedCard%13
       }
     }
  }
}

let cardPicker=deck.createCardPicker();
let pickedCard=cardPicker();

console.log(`card: ${pickedCard.card} of ${pickedCard.suit}`);




interface UIElement{
  addClickListener(onclick:(e:Event)=>void):void
}

class Handler{
  type?:string
  
  constructor(){

  }

  onClickBad(e:Event){
    this.type=e.type
  }

}

let h=new Handler();
let uiElement:UIElement={
  addClickListener(){

  }
}

uiElement.addClickListener(h.onClickBad);


function test3(n: string): void;
function test3(n: number): number;
function test3(c: any): void | number {
    if(typeof c == "number"){
 
    }else if(typeof c == "string"){
 
    }
 
    return c;
}
 
console.log(test3("jianan"));
console.log(test3(21));
