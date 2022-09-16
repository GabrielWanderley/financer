import { transitions } from "polished";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../Services/api"

interface Transaction{
    id:number;
    title:string;
    amount:number;
    type:string;
    category:string;
    createdAt:string;
  }

type TransactionInput = Omit<Transaction, "id"|"createdAt">;


interface TransactionProviderProps{
    children: ReactNode;
}
interface TransactionsContextData{
    transactions: Transaction[];
    createTransaction: (transaction: TransactionInput) => Promise<void>;
    removeTransaction: (transactionId: number) => Promise<void>;

}

 const TransactionsContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData
)

export function TransactionProvider({children}: TransactionProviderProps){
    const [transactions,setTransaction] = useState<Transaction[]>([])

    useEffect(()=>{
      api.get("transactions")
      .then(response=> setTransaction(response.data.transactions))
  },[]);

  async function createTransaction(transactionInput : TransactionInput){
    const response = await api.post("/transactions", {
    ...transactionInput,
     createdAt: new Date()}
    )
    const {transaction} = response.data

    setTransaction([
        ...transactions,
        transaction,
    ])
  }
 async function removeTransaction (transactionId: number){
  const updatedtrans = [...transactions]
  const transIndex = updatedtrans.findIndex((transaction) => transaction.id === transactionId)

  if(transIndex >= 0){
   updatedtrans.splice(transIndex, 1)
   setTransaction(updatedtrans)
  }
}
  return(
    <TransactionsContext.Provider value={{transactions, createTransaction, removeTransaction}}>
   {children}
    </TransactionsContext.Provider>
  )
  
}
export function useTransactions(){
  const context =useContext(TransactionsContext)

  return context;
}
