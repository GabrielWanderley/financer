import { useState } from "react"
import Modal from "react-modal"
import logoImg from "../../assets/Logo.svg"
import total from "../../assets/Total.svg"

import { Content} from "./styles"
import { Container } from "./styles"


interface HeaderProps{
    onOpenNewTransactionModal:() => void;
}


export function Header({onOpenNewTransactionModal}: HeaderProps){


    return(

     <Container>
        <Content>
         <h1><img src={total}/>Financer</h1>
         <button type="button" onClick={onOpenNewTransactionModal} > nova transação</button>
    </Content>
     </Container>

    )

}

