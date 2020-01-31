import React from 'react';
import Cycles from './Cycles'
import Weather from './Weather'

function App() {
  return (
    <section className="section">
      <div className="container">
        <Cycles />
        <Weather />
      </div>
    </section>
  );
}

export default App;
