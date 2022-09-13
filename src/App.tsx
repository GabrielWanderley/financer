import { GlobalStyle } from "./styles/global";
import Modal from "react-modal";
import {Header} from "./components/header";
import { Dashboard } from "./components/Dashboard";
import { useState } from "react";
import { Newtransactionmodal } from "./components/NewTransactionModal";
import { TransactionProvider, } from "./hooks/useTransactionsContext";

Modal.setAppElement("#root");

export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false)
    
  function handleOpenNewTransactionModal(){
  setIsNewTransactionModalOpen(true)
  }
  
  function handleCloseNewTransactionModal(){
  setIsNewTransactionModalOpen(false)
  }
  return (
    <TransactionProvider>

<Header onOpenNewTransactionModal={handleOpenNewTransactionModal}/>
<Dashboard/>

<Newtransactionmodal 
 isOpen={isNewTransactionModalOpen}
 onRequestClose={handleCloseNewTransactionModal}
 />
<GlobalStyle />
    </TransactionProvider>
  );
}

 
