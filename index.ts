import { from ,Observable} from "rxjs";
import { filter, reduce } from "rxjs/operators";
import {invoices} from './data.json'

type Invoice = {
  id : string;
  customer: string;
  date:Date
  amount:number;
  state: string;
}



const observable = from  (invoices)

observable
.pipe(
  filter((item:Invoice) => item.customer === 'Paolo Perrone')
).subscribe(item => console.log(item.amount));

const observable2 = from (invoices)

observable
.pipe(
  filter((item : Invoice) => {
    const timestamp = item.date;
    const month = new Date(timestamp).getMonth()+1;/* mettiamo +1 perchè i mesi partono da zero */
    return month === 11;
  }),
  reduce( (acc : number , item : Invoice) =>{
   
    return acc +item.amount;
  },0 )
).subscribe(val => console.log(`Il totale fatturato di dicembre è : ${val}`))