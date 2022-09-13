import { useState } from "react"
import Modal from "react-modal"
import logoImg from "../../assets/Logo.svg"

import { Content} from "./styles"
import { Container } from "./styles"


interface HeaderProps{
    onOpenNewTransactionModal:() => void;
}


export function Header({onOpenNewTransactionModal}: HeaderProps){


    return(

     <Container>
        <Content>
         <img src={logoImg}alt="dt money"/>
         <button type="button" onClick={onOpenNewTransactionModal} > nova transação</button>
    </Content>
     </Container>

    )

}

