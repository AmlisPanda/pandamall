import React from 'react';
import './App.css';
import Products from './Products';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <div id='logo'>PandaMall</div>
        <div>
          Bienvenue <span>!</span>
        </div>
      </header>
      <Products />
    </div>
  );
}

export default App;
