import React, { Component } from 'react';
import styled from 'styled-components';
import './App.css';
import {AccountBox} from './components/';

const AppContainer = styled.div`

width: 100%;
height: 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`;

class App extends Component {
  render() {
    return (
      <AppContainer>
     <AccountBox />
     </AppContainer>
    );
  }
}

export default App;
