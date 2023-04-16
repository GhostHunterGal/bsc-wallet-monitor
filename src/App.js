//App.js
import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [balances, setBalances] = useState([]);
  const [address, setAddress] = useState('');

  async function startMonitoring() {
    const response = await fetch(`http://localhost:3001/start-monitoring?address=${address}`);
  
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

  function handleAddressChange(event) {
    setAddress(event.target.value);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="mb-4">Monitor Addresses</h1>
        <div className="input-group mb-3">
          <input
            type="text"
            value={address}
            onChange={handleAddressChange}
            placeholder="Enter wallet address"
            className="form-control"
            aria-label="Enter wallet address"
          />
          <button onClick={startMonitoring} className="btn btn-outline-light">
            Start Monitoring
          </button>
        </div>
        <ul className="list-group">
          {balances.map((balance, index) => (
            <li key={index} className="list-group-item list-group-item-dark">
              Balance of {balance.address}: {balance.balance} ether
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
