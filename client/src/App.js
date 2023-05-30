import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import RandomRecipe from './components/RecipeDisplay';
import Navbar from './components/Navbar.js';
import Button from './components/Button.js';
import Home from './pages/Home';
import About from './pages/About';

import './App.css';
import BodyB from './components/BodyB';
import Footer from './components/Footer';
import Log_in from './pages/Log-in';
import Sign_up from './pages/Sign-up';
import Search from './pages/Search';

export const UserContext = React.createContext();

function App() {
  const [user, setUser] = React.useState(null);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <UserContext.Provider value = {{user, setUser}}>
      <Router>
        <Navbar/>
          <Routes>
            <Route path='/' exact Component=
              {Home}/>
            
            <Route path='/log-in' exact Component=
              {Log_in}/>
            
            <Route path='/sign-up' exact Component=
              {Sign_up}/>

            <Route path='/search' exact Component=
              {Search}/>

            <Route path='/recipeGPT' exact Component=
              {About}/>
          </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
