//类型推断

let x11=3;

let t11=[0,1,null];

class Animal11{
  numLengs?:number
}

class Bee11 extends Animal11{
  keeper?:BeeKeeoer
}

class Lion11 extends Animal11{
  keeper?:LoinKeeoer
}

let zoo:Animal11[]=[new Bee11(),new Lion11()];


window.onmousedown=function(mouseEvent:any){
  console.log(mouseEvent.clickTime);
}

//交叉类型
function extend<T,U>(first:T,second:U):T & U{
  let result={} as T & U;
  
  for(let id in first){
    result[id]=first[id] as any;
  }

  for(let id in second){
    if(!((result as Object).hasOwnProperty(id))){
      result[id]=second[id] as any;
    }
  }

  return result;
}

class Person11{
  name:string

  constructor(name:string){
    this.name=name;
  }

}

interface Loggable{
  log():void
}

class ConsoleLogger implements Loggable{
  log(){

  }
}

let oo=extend(new Person11('11'),new ConsoleLogger())


//联合类型
function padLeft(value:string,padding:number|string):string{
  if(typeof padding === 'number'){
    return new Array(padding+1).join('')+value;
  }
  if(typeof padding === 'string'){
    return padding+value;
  }
  throw new Error('Expected string or number got');
}
padLeft('hello',1);
padLeft('hello','asd');
// padLeft('hello',true);/error



interface Bird{
  fly():void
  layEggs():void
}

interface Fish{
  swim():void
  layEggs():void
}

function getSmallPet():Fish|Bird {
  return {} as Bird;
}

let pet=getSmallPet();
pet.layEggs();
// pet.swim()//error 只能调用共同属性

function isFish(pet:Fish|Bird):pet is Fish{
  return (pet as Fish).swim!==undefined;
}

if(isFish(pet)){
  pet.swim();
}else{
  pet.fly();
}




function isNumber(x:any):x is number{
  return typeof x ==='number';
}

function isString(x:any):x is string{
  return typeof x ==='string';
}

function padLeft1(value:string,padding:number|string):string{
  if(isNumber(padding)){
    return new Array(padding+1).join('')+value;
  }
  if(x instanceof String){//这样也行
    return padding+value;
  }
  throw new Error('Expected string or number got');
}