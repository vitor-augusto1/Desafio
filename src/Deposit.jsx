import { useContext, useState } from 'react'
import './App.css'
import { handleStatementUpdate } from './App';

export function Deposit() {
  const [value, setValue] = useState(0);
  let currentBalance = localStorage.getItem("balance")

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(parseFloat(currentBalance), parseFloat(value));
    localStorage.setItem("balance", parseFloat(currentBalance) + parseFloat(value));
    handleStatementUpdate("Entrada", value, "Deposito", currentBalance);
    window.location.reload();
  };

  const handleBalanChange = (event) => {
    setValue(parseFloat(event.target.value))
  }

  return (
    <div>
    <h2>Deposito</h2>
    <p><b>Saldo atual:</b> R$ {currentBalance}</p>
    <form onSubmit={handleSubmit}>
      <label>
        <input
          type="number"
          onChange={(event) => handleBalanChange(event)}
        />
      </label><br/><br/>
      <b>Valor a ser depositado:</b> R$ {value} <br/><br/>
      <button>Depositar</button>
    </form>
    </div>
  )
}

export default Deposit
