import Crawler from "./crawler";
import Analyzer1 from './analyzer1'

const url=`http://e.vhall.com/category/4`;
const analyzer1=Analyzer1.getInstance();
new Crawler(url,analyzer1);