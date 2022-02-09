import React, { Fragment, Component, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import About from './components/pages/About';
import User from './components/users/User';
import GitHubState from './context/GitHub/GitHubState';
import AlertState from './context/Alert/AlertState';
import './App.css';
import Home from './components/pages/Home';
import Alert from './components/layout/Alert';
import NotFound from './components/pages/NotFound';

function App() {
  return (
    <GitHubState>
      <AlertState>
        <Router>
          <div className='App'>
            <Navbar title='GitHub Finder' />
            <div className='container'>
              <Alert />
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/user/:login' element={<User />} />
                <Route path='*' element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </Router>
      </AlertState>
    </GitHubState>
  );
}

export default App;
