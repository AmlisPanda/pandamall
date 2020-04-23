import React from 'react';
import './App.css';
import Products from './Products';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <div id='logo'>PandAmazon</div>
        <div>
          Bienvenue <span>!</span>
        </div>
      </header>
      <div id='content'>
        <Products />
      </div>
    </div>
  );
}

export default App;
