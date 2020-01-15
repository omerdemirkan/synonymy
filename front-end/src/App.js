import React, {useEffect} from 'react';
import './App.css';

import Navbar from './containers/Navbar/Navbar';
import Main from './components/Main/Main';
import UserInput from './containers/UserInput/UserInput';
import About from './components/About/About';
import Inspect from './containers/Inspect/Inspect';
import Footer from './components/Footer/Footer';
import Tutorial from './containers/Tutorial/Tutorial';
import FAQ from './components/FAQ/FAQ';

import { Route, Switch } from 'react-router-dom';

function App() {

  // Sets theme preference on first use
  useEffect(() => {
    if (localStorage.getItem('darkMode') == null) {
      localStorage.setItem('darkMode', false);
    }
    window.scrollTo(0, 0);
  }, []);

  return <div className="App">

      <Navbar/>

      <Switch>

        <Route path="/faq" exact component={FAQ}/>

        <Route path="/" render={() => {
          return <Main>
            <Inspect/>
            <UserInput/>
            <About/>
          </Main>
        }}/>

      </Switch>

      <Tutorial/>
      
      <Footer/>

  </div>
}

export default App;
