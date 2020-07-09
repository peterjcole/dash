import React from 'react';
import Cycles from './Cycles'
import Weather from './Weather'
import Trains from './Trains'
import Commutes from './Commutes'
import './App.scss'

function App() {
  return (
    <section className="section">
      <div className="container">
        <Commutes />
        <Cycles />
        <Trains />
        <Weather />
      </div>
    </section>
  );
}

export default App;
