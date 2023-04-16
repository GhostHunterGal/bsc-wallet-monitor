//App.js
import React, { useState } from 'react';
import './App.css';

function App() {
  const [balances, setBalances] = useState([]);

  async function startMonitoring() {
    const response = await fetch("http://localhost:3001/start-monitoring");
  
    if (response.ok) {
      const newBalances = await response.json();
      console.log("New Balances", newBalances);
      setBalances(newBalances);
    } else {
      const errorResponse = await response.json();
      console.error("Error fetching balances:", errorResponse.error);
      setBalances([]);
      // Alternatively, you can show an error message to the user
      // or handle the error in another way that fits your application
    }
  }
  

  return (
    <div className="App">
      <header className="App-header">
        <h1>Monitor Addresses</h1>
        <button onClick={startMonitoring}>Start Monitoring</button>
        <ul>
          {balances.map((balance, index) => (
            <li key={index}>
              Balance of {balance.address}: {balance.balance} ether
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
