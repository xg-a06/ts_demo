function identity<T>(arg:T):T {
  return arg;
}

interface GenericIdentityFn<T>{
  (arg:T):T
}

let myIdentity1:<T>(arg:T)=>T=identity;
let myIdentity2:{<T>(arg:T):T}=identity;
let myIdentity3:GenericIdentityFn<Number>=identity;

// let output=identity<string>('test');
let output=identity('test'); //自动推断
console.log(output);

function loggingIdentity<T>(arg:T[]):T[] {
  console.log(arg.length);
  return arg;
}

//泛型约束
interface Lengthwise{
  length:number
}

function loggingIdentity1<T extends Lengthwise>(arg:T):T {
  console.log(arg.length);
  return arg;
}

loggingIdentity1({length:2})
// loggingIdentity1({a:1})/error 

function getProperty<T,K extends keyof T>(obj:T,key:K){
  return obj[key];
}

let testObj={x:1,y:2};
getProperty(testObj,'x')
// getProperty(testObj,'z')//error 不存在的key

function create<T>(c:{new():T}):T{
  return new c();
}






class GenericNumber<T>{
  zeroValue?:T

  add?:(x:T,Y:T)=>T
}

let stringNumberic=new GenericNumber<string>();
stringNumberic.zeroValue='0';
stringNumberic.add=(x,y)=>{
  return x+y;
}

console.log(stringNumberic.add('1','2'));





class BeeKeeoer{
  hasMask?:boolean
}

class LoinKeeoer{
  nameTag?:string
}

class Animal4{
  numLengs?:number
}

class Bee extends Animal4{
  keeper?:BeeKeeoer
}

class Lion extends Animal4{
  keeper?:LoinKeeoer
}

function create1<T extends Animal4>(c:new()=>T):T{
  return new c();
}
create(Lion).keeper?.nameTag
create1(Bee).keeper?.hasMask
