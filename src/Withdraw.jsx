import { useState } from 'react';
import './App.css'
import { handleStatementUpdate } from './App';

function Withdraw() {
  const [value, setValue] = useState(0);
  const currentBalance = localStorage.getItem("balance")

  const handleSubmit = (event) => {
    event.preventDefault();
    if (value > 5000) {
      alert("O valor máximo para saque diário é de R$ 5.000,00.")
      return
    } else if (value > parseFloat(currentBalance)) {
      alert("Não será possivel realizar o saque pois o valor a ser sacado é superior ao seu saldo.")
      return
    }
    localStorage.setItem("balance", parseFloat(currentBalance) - parseFloat(value))
    handleStatementUpdate("Saida", value, "Saque", currentBalance);
    window.location.reload();
  };

  const handleBalanChange = (event) => {
    setValue(parseFloat(event.target.value))
  }

  return (
    <div>
    <h2>Saque</h2>
    <p><b>Saldo atual:</b> R$ {currentBalance}</p>
    <form onSubmit={handleSubmit}>
      <label>
        <input
          type="number"
          onChange={(event) => handleBalanChange(event)}
        />
      </label><br/><br/>
      <b>Valor a ser sacado:</b> R$ {value} <br/><br/>
      <button>Sacar</button>
    </form>
    </div>
  )
}

export default Withdraw
