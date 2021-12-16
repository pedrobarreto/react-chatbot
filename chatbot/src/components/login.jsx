import React, { useContext } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  Link,
  SubmitBtn,
} from "./inputs";
import { Marginer } from './margins';
import { AccountContext } from './context';

export function LoginForm(props) {
  const { switchToSignup } = useContext(AccountContext);

  return (
    <BoxContainer>
      <FormContainer>
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Senha" />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <Link href="#">Esqueceu sua senha?</Link>
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitBtn type="submit">Entrar</SubmitBtn>
      <Marginer direction="vertical" margin="1em" />
      <Link href="#">
        Não tem uma conta ?{" "}
        <BoldLink href="#" onClick={switchToSignup}>
          Criar Conta
        </BoldLink>
      </Link>
    </BoxContainer>
  );
}