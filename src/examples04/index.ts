interface ClockInterface{
  currentTime:Date
}

class Clock implements ClockInterface{
  currentTime:Date 
  
  constructor(h:number,m:number){
    this.currentTime=new Date();
  }

  setTime(d:Date){

  }
}

interface ClockInterface2{
  tick():any
}

interface ClockConstructor{
  new(h:number,m:number):ClockInterface2
}

function createClock(ctor:ClockConstructor,h:number,m:number):ClockInterface2{
  return new ctor(h,m);
}

class DigitalClock implements ClockInterface2{
  constructor(h:number,m:number){
  }

  tick(){
    console.log('beep beep');
  }
}

class AnalogClock implements ClockInterface2{
  constructor(h:number,m:number){
  }

  tick(){
    console.log('tick toc');
  }
}

let digitalClock=createClock(DigitalClock,1,2);
let analogClock=createClock(AnalogClock,1,2);
console.log(digitalClock,analogClock);


interface Shape{
  color:string
}

interface PenStroke{
  penWidth:number
}

interface Square extends Shape,PenStroke{
  sideLength:number
}

let square={} as Square;
square.color='111';
square.sideLength=2;
square.penWidth=5.0;



interface Counter{
  (start:number):string
  interval:number
  reset():void
}

function getCounter():Counter{
  let counter=(function(start:number){

  }) as Counter;

  counter.interval=123;
  counter.reset=()=>{

  }

  return counter;
}

let cc=getCounter();
cc(10);
cc.reset();
cc.interval=5.0;


class Control{
  private state:any
}

interface SelectableControl extends Control{
  select():any
}

class Button extends Control implements SelectableControl{
  select(){

  }
}

class TextBox extends Control{
  select(){

  }
}

//报错 没有继承Control
// class ImageBox implements SelectableControl{
//   select(){

//   }
// }

