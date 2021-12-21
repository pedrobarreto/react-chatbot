import React, { useContext, useState, useEffect, useRef } from "react";
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
import { useForm } from 'react-hook-form';


export function SignupForm(props) {
  const { switchToSignin, setUserInfo, userInfo } = useContext(AccountContext);
  const { register, errors, handleSubmit, watch } = useForm({});
  const [ dbUser, setDbUser ] = useState([]);
  const emailInDb = dbUser.some(({email}) => email === userInfo.email );
  const password = useRef({});
  password.current = watch("password", "");

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserInfo({ ...userInfo, [name]: value})
  };

  useEffect(()=> {
    axios.get("http://localhost:3001/users").then((response) => {
    setDbUser(response.data);
    })
  },[])
  
  return (
    <BoxContainer>
      <SignContainer>
            <Input
        onChange={handleChange}
        placeholder="Nome Completo"
        name="name"
        type="text"
        ref={register({
          required: "Campo obrigatório",
          minLength: {
            value: 2,
            message: "Por favor preencha um nome válido"
          }
        })}
      />
        <form onSubmit={e => e.preventDefault()}>
        <Input
         onChange={handleChange}
          type="email"
          id="inputEmail"
          name="email"
          placeholder="Email"
          ref={register({
            validate: {
              isEmail: () =>
              !emailInDb || "Email já cadastrado 📧",
            },
            required: "Email obrigatório",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Digite um email válido",
            },
          })}
        />
        {errors.email && <p className="error">{errors.email.message}</p>}
        <Input
        onChange={handleChange}
        placeholder="Senha"
        name="password"
        type="password"
        ref={register({
          required: "Campo obrigatório",
          minLength: {
            value: 4,
            message: "A senha deve ser maior que 4 caracteres"
          }
        })}
      />
      {errors.password && <p>{errors.password.message}</p>}

      <Input
        name= "checkpassword"
        placeholder="Confirmar Senha"
        onChange={handleChange}
        type="password"
        ref={register({
          validate: value =>
            value === password.current || "As senhas não são iguais."
        })}
      />
      {errors.password_repeat && <p>{errors.password_repeat.message}</p>}
      <Marginer direction="vertical" margin={10} />
        <SignBtn type="submit" onClick={handleSubmit(switchToSignin)}> Enviar </SignBtn>
        </form>
      </SignContainer>
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