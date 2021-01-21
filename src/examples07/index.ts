let passcode='secret';

class Employee3 {
  private _fullName:string
  constructor(full:string='ttt'){
    this._fullName= full;
  }
  get fullName():string{
    return this._fullName;
  }
  set fullName(newName:string){
    if(passcode&&passcode==='secret'){
      this._fullName=newName;
    }else{
      console.log('error');
    }
  }
}

let employee3=new Employee3();
employee3.fullName='Bob Smith';



class Grid{
  static origin={x:0,y:0}

  scale:number

  constructor(scale:number){
    this.scale=scale;
  }

  calcDisFromOrigin(point:{x:number,y:number}){
    let xDis=point.x-Grid.origin.x;
    let yDis=point.y-Grid.origin.y;

    return Math.sqrt(xDis*xDis+yDis*yDis)*this.scale;
  }
}

let grid1=new Grid(1);
let grid2=new Grid(5.0);

console.log(grid1.calcDisFromOrigin({x:3,y:4}));
console.log(grid2.calcDisFromOrigin({x:3,y:4}));
