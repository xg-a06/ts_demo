import fs from 'fs';
import cheerio from 'cheerio';
import { Analyzer } from "./crawler";

interface Play{
  title:string,
  count:number
}

interface PlayResult{
  time:number,
  data:Play[]
}

interface FileContent{
  [propName:number]:Play[]
}

class Analyzer1 implements Analyzer{
  private static instance:Analyzer1;

  static getInstance(){
    if(!Analyzer1.instance){
      Analyzer1.instance=new Analyzer1();
    }
    return Analyzer1.instance;
  }
  
  private constructor(){}

  private getResultData(html:string){
    const $=cheerio.load(html);
    const items=$('.common-events-list li');
    const plays:Play[]=[];
    items.map((index,item)=>{
      const title=$(item).find('.title').text();
      const count=parseInt($(item).find('.followers').text(),10);
      plays.push({title,count})
    })
    const result={
      time:new Date().getTime(),
      data:plays
    }
    return result;
  }
  private updateResult(result:PlayResult,filePath:string){
    let fileContent:FileContent={};
    if(fs.existsSync(filePath)){
      fileContent=JSON.parse(fs.readFileSync(filePath,'utf-8'));
    }
    fileContent[result.time]=result.data;
    return fileContent;
  }
  analyze(html: string, filePath: string) {
    const result = this.getResultData(html);
    const content = this.updateResult(result,filePath);
    return JSON.stringify(content, null, '\t')
  }
}

export default Analyzer1;