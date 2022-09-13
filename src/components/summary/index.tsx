
import { useContext } from 'react';
import iconImg from '../../assets/Entradas.svg';
import saidas from "../../assets/Saídas.svg"
import total from "../../assets/Total.svg"
import { useTransactions } from '../../hooks/useTransactionsContext';

import { Container } from "./styles";

export function Summary(){
const {transactions} = useTransactions()

//const totalDeposits = transactions.reduce((acc, transaction)=>{
   // if(transaction.type==="deposit"){
  //    return acc + transaction.amount;}
//return acc;
//},0)

const summary = transactions.reduce((acc, transaction)=> {
  if (transaction.type==="deposit"){
    acc.deposit += transaction.amount;
    acc.total += transaction.amount;
  }else{
    acc.withdraws += transaction.amount;
    acc.total -= transaction.amount;
  }return acc;


},{
    deposit:0,
    withdraws:0,
    total:0,
})

return(
    <Container>
        <div>
            <header>
               <p>Entradas</p>
               <img src={iconImg} alt="entradas"/>
            </header>
            <strong>
            {new Intl.NumberFormat("pt-BR",{
                style: "currency",
                currency:"BRL"
              }).format(summary.deposit)}
            </strong>
        </div>
        <div>
            <header>
               <p>saidas</p>
               <img src={saidas} alt="saidas"/>
            </header>
            <strong>-           
                 {new Intl.NumberFormat("pt-BR",{
                style: "currency",
                currency:"BRL"
              }).format(summary.withdraws)}</strong>
        </div>
        <div className='heigtlightBackground'>
            <header>
               <p>total</p>
               <img src={total} alt="total"/>
            </header>
            <strong>
            {new Intl.NumberFormat("pt-BR",{
                style: "currency",
                currency:"BRL"
              }).format(summary.total)}
            </strong>
        </div>
    </Container>
    )
}