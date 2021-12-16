import React, { useContext } from "react";
import {
  BoldLink,
  BoxContainer,
  SignContainer,
  Input,
  Link,
  SignBtn,
} from "./inputs";
import { Marginer } from './margins';
import { AccountContext } from './context';

export function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);

  return (
    <BoxContainer>
      <SignContainer>
        <Input type="text" placeholder="Nome Completo" />
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Senha" />
        <Input type="password" placeholder="Confirmar Senha" />
      </SignContainer>
      <Marginer direction="vertical" margin={10} />
      <SignBtn type="submit" onClick={switchToSignin} >Enviar </SignBtn>
      <Marginer direction="vertical" margin="1em" />
      <Link href="#">
        Já possui uma conta ? 
        <BoldLink href="#" onClick={switchToSignin}>
          Entrar
        </BoldLink>
      </Link>
    </BoxContainer>
  );
}