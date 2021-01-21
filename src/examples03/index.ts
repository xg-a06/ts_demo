interface LabelObj{
  label:string
}

function printLabel(obj:LabelObj){
  console.log(obj.label);
}

let test={size:10,label:'ttttt'};

printLabel(test)


interface Square1{
  color:string
  area:number
}

interface SquareConfig{
  color?:string
  width?:number
  [propName:string]:any //签名索引
}

function createSquare(config:SquareConfig):Square1{
  let newSquare={color:'white',area:100};
  if(config.color){
    newSquare.color=config.color;
  }
  if(config.width){
    newSquare.area=config.width*config.width;
  }
  return newSquare; 
}

let testSquare=createSquare({color:'black'});

console.log(testSquare);

interface Point{
  readonly x:number,
  readonly y:number
}

let p1:Point={x:10,y:20};


let a:number[]=[1,2,3,4];
let ra:ReadonlyArray<number>=a; 

interface SearchFunc{
  (source:string,subString:string):boolean 
}

let mySearch:SearchFunc=function(source:string,subString:string):boolean{
  let result=source.search(subString);
  return result>-1;
}

interface StringArray{
  [index:number]:string
}

let myArr:StringArray=['BLO','ASD'];
console.log(myArr[0]);
