class Greeter{
  greeting:string

  constructor(message:string){
    this.greeting=message;
  }

  greet(){
    return `hello,${this.greeting}`;
  }
}

let greeter1=new Greeter('world');
console.log(greeter1.greet());



class Animal{
  name:string

  constructor(name:string){
    this.name=name;
  }

  move(dis:number=0){
    console.log(`${this.name} moved ${dis}m`);
  }
}

class Snake extends Animal{
  constructor(name:string){
    super(name);
  }

  move(dis:number=5){
    console.log('Slithering...');
    super.move(dis);
  }
}

class Horse extends Animal{
  constructor(name:string){
    super(name);
  }

  move(dis:number=45){
    console.log('Galloping...');
    super.move(dis);
  }

  test(){
    console.log('test method');
  }
}
const sam=new Snake('Sammy');
const tom:Animal=new Horse('Tommy');
sam.move();
tom.move()

