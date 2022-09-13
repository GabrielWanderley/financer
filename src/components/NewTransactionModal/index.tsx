import Modal from "react-modal"
import { FormEvent, useState } from "react";

import receber from "../../assets/Entradas.svg"
import perder from "../../assets/Saídas.svg"
import fechar from "../../assets/Botão.svg"

import { Container, TransactionTypeContainer, RadioBox } from "./styled";
import { useTransactions} from "../../hooks/useTransactionsContext";


interface NewTransactionModalProps{
    isOpen: boolean;
    onRequestClose:()=> void;
}
export function Newtransactionmodal({isOpen, onRequestClose}: NewTransactionModalProps) {
  
  const { createTransaction } = useTransactions()
  
  const [title, setTitle] = useState('');
  const [value, setValue] = useState(0);
  const [category, setCategory] = useState('');
  const [type, setType]= useState('deposit')

  async function handleCreateNewTransaction(event: FormEvent){
    event.preventDefault();

   await createTransaction({
      title,
      amount:value,
      category,
      type,
    })
    setTitle("")
    setValue(0)
    setCategory("")
    setType("deposit")
     onRequestClose();
  }

  return (
    <Modal 
    isOpen={isOpen} 
    onRequestClose={onRequestClose}
    overlayClassName="react-modal-overlay"
    className="react-modal-content"
    >

   <button 
   type="button" 
   onClick={onRequestClose}
   className="react-modal-close">
    <img src={fechar} alt="fechar modal"/>
   </button>
   
    <Container onSubmit={handleCreateNewTransaction}>  
        <h2>cadastrar transação</h2>
    <input 
    placeholder="Título"
    value={title}
    onChange={event => setTitle(event.target.value) }
    />

    <input 
    type="number" 
    placeholder="valor"
    value={value}
    onChange={event => setValue(Number(event.target.value)) }
    />

    <TransactionTypeContainer>
    <RadioBox
    type="button" 
    onClick={()=>{setType("deposit")}}
    isActive={type === "deposit"}
    activeColor="green"
    >

   <img src={receber} alt="entrada" />
   <span>Entrada</span>
    
    </RadioBox>

    <RadioBox
    type="button" 
    onClick={()=>{setType("withdraw")}}
    isActive={type === "withdraw"}
    activeColor="red"
    >

   <img src={perder} alt="saida" />
   <span>Saida</span>

    </RadioBox>
    </TransactionTypeContainer>

    <input 
    placeholder="Categoria"
    value={category}
    onChange={event => setCategory(event.target.value) }
    />

    <button 
    type="submit">
        Cadastrar
    </button>

    </Container>   

    </Modal>
  )
}

