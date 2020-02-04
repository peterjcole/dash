import React from 'react';
import Cycles from './Cycles'
import Weather from './Weather'
import Trains from './Trains'

function App() {
  return (
    <section className="section">
      <div className="container">
        <Cycles />
        <Weather />
        <Trains />
      </div>
    </section>
  );
}

export default App;
