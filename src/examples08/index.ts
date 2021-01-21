abstract class Department1{
  name:string
  
  constructor(name:string){
    this.name=name;
  }

  printName():void{
    console.log(this.name);
  }

  abstract printMeeting():void
}

class AccountDepartment extends Department1{
  constructor(){
    super('Account ad Auditing')
  }

  printMeeting(){
    console.log('pppppppppp');
  }

  test(){
    console.log('dadasdasdsa');
  }
}

// new Department1('xxx') //error 不能实例化抽象类
let department1=new AccountDepartment();
department1.printMeeting();
department1.test();


//---------------------

class Greeter2{
  static standardGreeting='hello there'

  greeting?:string

  constructor(message?:string){
    this.greeting=message;
  }

  greet(){
    if(this.greeting){
      return `hello,${this.greeting}`;
    }
    return Greeter2.standardGreeting;
  }
}

let greeter2:Greeter2;
greeter2=new Greeter2('world');
console.log(greeter2.greet());

let greeterMaker:typeof Greeter2=Greeter2;
greeterMaker.standardGreeting='Hey there';

let greeter22:Greeter2=new greeterMaker();
console.log(greeter22.greet());


class Point2{
  x?:number
  y?:number
}

interface Point3d extends Point2{
  z:number
}

let p:Point3d={x:1,y:2,z:3}
