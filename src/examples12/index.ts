let s='foo';
// s=null; //error
// s=undefined //error

function f(x:number,y?:number){
  return x+(y||0)
}

class C{
  a?:number
  b?:number
}

let ccc=new C();
ccc.a=undefined;
ccc.b=2;


function ff(sn:string|null):string{
  return sn||'default';
}

function fff(name:string|null):string{

  function postfix(tt:string){
    return name!.charAt(0)+'. the '+tt;
  }
  name=name||'Bob';

  return postfix(name);
}

console.log(fff('aa'));






type Easing='ease-in'|'ease-out'|'ease-in-out'

class UIElement1{
  animate(dx:number,dy:number,easing:Easing){
    if(easing==='ease-in'){

    }else if(easing==='ease-out'){
      
    }else if(easing==='ease-in-out'){

    }else{

    }
  }
}

let btn=new UIElement1()
btn.animate(0,0,'ease-in');
//btn.animate(0,0,'asd')//error 不在字面量字符串中