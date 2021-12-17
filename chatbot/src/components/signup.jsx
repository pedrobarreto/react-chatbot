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
  const { switchToSignin, setUserInfo, userInfo } = useContext(AccountContext);

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserInfo({ ...userInfo, [name]: value})
  };
  
  return (
    <BoxContainer>
      <SignContainer>
        <Input type="text" name="name" onChange={handleChange} placeholder="Nome Completo" />
        <Input type="email" name="email" onChange={handleChange} placeholder="Email" />
        <Input type="password" name="password" onChange={handleChange} placeholder="Senha" />
        <Input type="password" name= "checkpassword" onChange={handleChange}  placeholder="Confirmar Senha" />
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