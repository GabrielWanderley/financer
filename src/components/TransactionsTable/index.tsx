
import { Container } from "./style";
import { useTransactions } from "../../hooks/useTransactionsContext";
import Lixeira from "../../assets/Lixeira.png"
import { transcode } from "buffer";


export function TransactionTable(){
  const {transactions} = useTransactions()
  const {removeTransaction} = useTransactions()

function DeleteTransaction(transactionId: number){
  removeTransaction(transactionId)
}
  return(
       <Container>
        <table>
           <thead>
            <tr>
                <th>Titulo</th>
                <th>Valor</th>
                <th>Categoria</th>
                <th>Data</th>
            </tr>
           </thead>  
         <tbody>
        {transactions.map(transaction =>{
          return(
          <tr key={transaction.id}>
            <td>{transaction.title}</td>
            <td className={transaction.type}>
              {new Intl.NumberFormat("pt-BR",{
                style: "currency",
                currency:"BRL"
              }).format(transaction.amount)}
            </td>
            <td>{transaction.category}</td>
            <td>              
              {new Intl.DateTimeFormat("pt-BR",{
              }).format(new Date(transaction.createdAt))}
            </td>
            <td>
             <button className="trash" onClick={()=>DeleteTransaction(transaction.id)}><img src={Lixeira}/></button>
            </td>
          </tr>
          );
        })}
         </tbody>
        </table>
       </Container>

    )
}