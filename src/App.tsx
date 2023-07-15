import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom' 
import './App.css';
import { Main } from './pages/main/main';
import { Login } from './pages/login';
import { Navbar } from './components/navbar';
import {Create} from './pages/createpost/create-post';


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Main/>}/>
          <Route path='/login' element={<Login/>} /> 
          <Route path='/create' element={<Create/>}/>         
        </Routes>
      </Router>
    </div>
  );
}

export default App;

