class Userx{
  fullName:string
  firstName:string
  lastName:string

  constructor(firstName:string,lastName:string){
    this.firstName=firstName;
    this.lastName=lastName;
    this.fullName=this.firstName+' '+this.lastName;
  }
}

interface Personx{
  firstName:string
  lastName:string
}

function greeter12(person: Personx){
  return 'hello '+person.firstName+' '+person.lastName;
}

let user={
  firstName:'aaa',
  lastName:'bbb'
};

let user1=new Userx('asd','zxc');

console.log(greeter12(user));
console.log(greeter12(user1));
