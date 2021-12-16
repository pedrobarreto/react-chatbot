import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import { AccountContext } from './context';
import iphone from '../components/ios.png';

const IphoneBox = styled.div`
  margin: 60px;
  top: 50px;
  width:  340px;
  min-height: 697px;
  display: flex;
  flex-direction: column;
  background-image: url(${iphone});
  overflow: hidden;
`;


const rotating = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const BoxContainer = styled.div`
  top: 22px;
  left: 19px;
  width:  303px;
  min-height: 651px;
  display: flex;
  flex-direction: column;
  border-radius: 19px;
  box-shadow: 0 0 2px rgba( 15, 15 ,15, 0.28);
  position: relative;
  overflow: hidden;
`;

const TopContainer = styled.div`
  width: 100%;
  height: 160px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 1.8em;
  padding-bottom: 5em;
`;

const BackDrop = styled(motion.div)`
  width: 160%;
  height: 700px;
  position: absolute;
  display: flex;
  flex-direction: column;
  border-radius: 50%;
  animation: ${rotating} 6s linear infinite;
  top: -290px;
  left: -70px;
  background-image: radial-gradient( circle farthest-corner at 10% 20%,  rgba(14,174,87,1) 0%, rgba(12,116,117,1) 90% );
  z-index: -1;
`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const HeaderText = styled.h2`
  font-size: 30px;
  font-weight: 600;
  line-height: 1.24;
  color: #fff;
  z-index: 10;
  margin: 0;
`;

const SmallText = styled.h5`
  color: #fff;
  font-weight: 500;
  font-size: 11px;
  z-index: 10;
  margin: 0;
  margin-top: 7px;
`;

const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const backdropVariants = {
  expanded: {
    width: "233%",
    height: "1050px",
    borderRadius: "20%",
    transform: "rotate(60deg)",
  },
  collapsed: {
    width: "160%",
    height: "550px",
    borderRadius: "50%",
    transform: "rotate(60deg)",
  },
};

const expandingTransition = {
  type: "spring",
  duration: 2.3,
  stiffness: 30,
};

export function AccountBox(props) {
  const [isExpanded, setExpanded] = useState(false);
  const [active, setActive] = useState("signin");

  const playExpandingAnimation = () => {
    setExpanded(true);
    setTimeout(() => {
      setExpanded(false);
    }, expandingTransition.duration * 1000 - 1500);
  };

  const switchToSignup = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive("signup");
    }, 400);
  };

  const switchToSignin = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive("signin");
    }, 400);
  };

  const contextValue = { switchToSignup, switchToSignin };

  return (
    <AccountContext.Provider value={contextValue}>
      <IphoneBox>
      <BoxContainer>
        <TopContainer>
          <BackDrop
            initial={false}
            animate={isExpanded ? "expanded" : "collapsed"}
            variants={backdropVariants}
            transition={expandingTransition}
          />
          {active === "signin" && (
            <HeaderContainer>
              <HeaderText>Bem Vindo(a)</HeaderText>
              <HeaderText>ao ChatBot</HeaderText>
              <SmallText>Faça login para continuar</SmallText>
            </HeaderContainer>
          )}
          {active === "signup" && (
            <HeaderContainer>
              <HeaderText>Criar</HeaderText>
              <HeaderText>Conta</HeaderText>
              <SmallText>Agora faça login para continuar</SmallText>
            </HeaderContainer>
          )}
        </TopContainer>
        <InnerContainer>
        </InnerContainer>
      </BoxContainer>
      </IphoneBox>
    </AccountContext.Provider>
  );
}