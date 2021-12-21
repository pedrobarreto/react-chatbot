import React, { useContext, useState, useEffect } from "react";
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
import axios from 'axios';

export function SignupForm(props) {
  const { switchToSignin, setUserInfo, userInfo } = useContext(AccountContext);
  const [ dbUser, setDbUser ] = useState([])

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserInfo({ ...userInfo, [name]: value})
  };

  useEffect(()=> {
    axios.get("http://localhost:3001/users").then((response) => {
    setDbUser(response.data);
    })
  },[])
 

  const handleSubmit = () => {
   const emailInDb = dbUser.some(({email}) => email === userInfo.email );
   const validEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if ( userInfo.name && userInfo.name.length < 3){
    alert('Preencha com um nome válido') 
    } else if( emailInDb){
      alert('email já cadastrado')
    } else if ( userInfo.email && !userInfo.email.match(validEmail)){
      alert('email inválido')
    } else if ( userInfo.password && !userInfo.password.match(userInfo.checkpassword) ) {
      alert('A senha não confere')
    } else if ( userInfo.name && userInfo.email.match(validEmail) && userInfo.password ) {
      console.log('bbb');
      return switchToSignin()
    } else {
      alert('erro')
    }
  }
  
  return (
    <BoxContainer>
      <SignContainer>
        <Input type="text" name="name" onChange={handleChange} placeholder="Nome Completo" />
        <Input type="email" name="email" onChange={handleChange} placeholder="Email" />
        <Input type="password" name="password" onChange={handleChange} placeholder="Senha" />
        <Input type="password" name= "checkpassword" onChange={handleChange}  placeholder="Confirmar Senha" />
      </SignContainer>
      <Marginer direction="vertical" margin={10} />
      <SignBtn type="submit" onClick={handleSubmit} >Enviar </SignBtn>
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