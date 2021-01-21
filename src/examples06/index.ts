class Animal2 {
  private name:string

  public constructor(name:string){
    this.name=name;
  }

  public move(dis:number){
    console.log(`${this.name} moved ${dis}`);
  }
}

class Rhino extends Animal2{
  constructor(){
    super('Rhina')
  }
}

class Employee{
  private name:string
  constructor(name:string){
    this.name=name;
  }
}

let animal=new Animal2('Goat');
let rhino=new Rhino();
let employee=new Employee('Bob');  
animal=rhino;
//animal=employee;//不兼容



class Person{
  protected readonly name:string
  protected constructor(name:string){
    this.name=name;
  }
}

//参数属性 不推荐 不好阅读
// class Person{
//   protected constructor(protected readonly name:string){
//     this.name=name;
//   }
// }


class Employee1 extends Person{
  private department:string
  constructor(name:string,department:string){
    super(name);
    this.department=department;
    // this.name='222' //只读 除了初始化 无法修改
  }

  getElevatorPitch(){
    console.log(`hello,my name is ${this.name} ant i wori in ${this.department}`);
  }
}

let howard=new Employee1('Howard','Sales');
howard.getElevatorPitch();
// new Person('nn'); //error 只能在父类和子类中使用
// howard.name//error 只能在父类和子类中使用