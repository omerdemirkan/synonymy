import React from 'react';
import './App.css';

import Navbar from './containers/Navbar/Navbar';
import Main from './components/Main/Main';
import UserInput from './containers/UserInput/UserInput';

function App() {
  return <div className="App">
    <Navbar/>
      
    <Main>
      <UserInput/>
    </Main>

  </div>
}

export default App;
