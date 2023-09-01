import './App.css'
import { Link } from 'react-router-dom'

export function checkLocalStorage(key) {
  return localStorage.getItem(key) !== null
}

export function handleStatementUpdate(type, value, operation, balance) {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const formatedDate = `${day}/${month}/${year}`;
  let statements = JSON.parse(localStorage.getItem("statement") || "[]");
  let newStatement = {
    type: type,
    date: formatedDate,
    value: parseFloat(value),
    operation: operation,
    balance: localStorage.getItem("balance")
  }
  statements.push(newStatement);
  localStorage.setItem("statement", JSON.stringify(statements))
}

function App() {
  if (!checkLocalStorage("balance")) {
    localStorage.setItem("balance", 10000);
  }
//  if (!checkLocalStorage("statement")) {
//    localStorage.setItem("statement", []);
//  }
  const balance =  localStorage.getItem("balance");
  return (
    <div>
      <div>
        <h2>Saldo em conta</h2>
        <p>R$ {balance}</p>
      </div>
      <Link to="/deposit">
        <div>
          <h2>Deposito</h2>
        </div>
      </Link>
      <Link to="/withdraw">
        <div>
          <h2>Saque</h2>
        </div>
      </Link>
      <Link to="/transfer">
        <div>
          <h2>Transferência</h2>
        </div>
      </Link>
      <Link to="/statement">
        <div>
          <h2>Extrato</h2>
        </div>
      </Link>
    </div>
  )
}

export default App
