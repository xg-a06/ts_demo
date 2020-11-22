import fs from 'fs';
import path from 'path'
import superagent from 'superagent';

interface Analyzer{
  analyze:(html: string, filePath: string)=>string
}

class Crawler{
  private filePath=path.resolve(__dirname,'../data/result.json');

  constructor(private url:string,private analyzer: Analyzer){
    this.doWork();
  }

  private async doWork(){
    const html=await this.getRawData();
    const content = this.analyzer.analyze(html, this.filePath);
    this.save(content);
  }

  private async getRawData(){
    const result=await superagent.get(this.url);
    return result.text;
  }
  
  private save(fileContent:string){
    fs.writeFileSync(this.filePath,fileContent);
  }
}

export {
  Analyzer
}

export default Crawler;