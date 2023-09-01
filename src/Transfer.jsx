import { useState } from 'react';
import './App.css'
import { handleStatementUpdate } from './App';

function Transfer() {
  const [value, setValue] = useState(0);

  const currentBalance = localStorage.getItem("balance");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (value > 8000) {
      alert("O valor máximo para transferência diária é de R$ 8.000,00.")
      return
    } else if (value > parseFloat(currentBalance)) {
      alert("Não será possivel realizar a transferência pois o valor a ser transferido é superior ao seu saldo.")
      return
    }
    localStorage.setItem("balance", parseFloat(currentBalance) + parseFloat(value))
    handleStatementUpdate("Entrada", value, "Transferência", currentBalance);
    window.location.reload();
  };


  const handleBalanChange = (event) => {
    setValue(parseFloat(event.target.value))
  }

  return (
    <div>
    <h2>Transferencia</h2>
    <p><b>Saldo atual:</b> R$ {currentBalance}</p>
    <form onSubmit={handleSubmit}>
      <label>
        <input
          type="number"
          onChange={(event) => handleBalanChange(event)}
        />
      </label><br/><br/>
      <b>Valor a ser transferido:</b> R$ {value} <br/><br/>
      <button>Transferir</button>
    </form>
    </div>
  )
}

export default Transfer
