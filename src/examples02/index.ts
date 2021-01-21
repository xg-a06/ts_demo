let isDone:boolean=true;
let dec:number=20;
let hex:number=0x14;
let binary:number=0b10100;
let octal:number=0o24;
let name1:string='test';

let list:number[]=[1,2,3,4];
let list1:Array<number>=[1,2,3,4];

let x:[string,number]=['aaa',2];

enum Color{
  Red,
  Green,
  Blue
}

let c:Color=Color.Green;
console.log(Color[2]); //blue

let aa:any=4;

function ttt():void{
  console.log('return nothing');
}

let u:undefined=undefined;
let n:null=null;//=undefined是null的子类型 所以可以赋值

function error(msg:string):never{
  throw new Error(msg);
}

// declare function create(o:object|null):void;

// create({prop:0})


let tv:any='asdasd';
console.log((<string>tv).length);
console.log((tv as string).length);

