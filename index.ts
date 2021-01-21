import { from ,Observable, of, zip} from "rxjs";
import { filter, groupBy, mergeMap,  reduce, toArray } from "rxjs/operators";
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
).subscribe(item => console.log(item.customer));

const observable2 = from (invoices)

observable2
.pipe(
  filter((item : Invoice) => {
    const timestamp = item.date;
    const month = new Date(timestamp).getMonth()+1;/* mettiamo +1 perchè i mesi partono da zero */
    return month === 11;
  }),
  reduce( (acc : number , item : Invoice) =>{
   
    return acc +item.amount;
  },0 )
).subscribe(val => console.log(`Il totale fatturato di novembre è : ${val}`))


/*RAGGRUPPARE LE FATTURE  */

const observable3 = from (invoices)

observable3
.pipe(
  groupBy((item : Invoice)  => new Date(item.date).getMonth()+1,
    (invoice : Invoice) => invoice.amount
  ),
  mergeMap(group => zip ( of(group.key), group.pipe(toArray())))
).subscribe(val => console.log({val}))

