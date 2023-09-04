import './App.css'
import { Link } from 'react-router-dom'

export function checkLocalStorage(key) {
  return localStorage.getItem(key) !== null
}

function handleOperationOfTypeTransfer(newMovement, dailyMovements) {
  const { operation, value } = newMovement
  let todaysTransfer = dailyMovements['transfer']
  console.log("Today's tranfer: ", todaysTransfer)
  const transferSum = parseFloat(todaysTransfer) + value
  if (parseFloat(todaysTransfer) >= 8000 || transferSum > 8000) {
    alert("Não foi possível realizar a transferência. Limite diário atingido.")
    return false
  }
  const updatedTransfer = parseFloat(todaysTransfer) + value
  dailyMovements['transfer'] = updatedTransfer
  localStorage.setItem("movements", JSON.stringify(dailyMovements))
  return true
}

function handleOperationOfTypeWithdraw(newMovement, dailyMovements) {
  const { operation, value } = newMovement
  let todaysWithdraw = dailyMovements['withdraw']
  const withdrawSum = parseFloat(todaysWithdraw) + value
  if (parseFloat(todaysWithdraw) >= 5000 || withdrawSum > 5000) {
    alert("Não foi possível realizar o saque. Limite diário atingido.")
    return false
  }
  const updatedWithdraw = parseFloat(todaysWithdraw) + value
  dailyMovements['withdraw'] = updatedWithdraw
  localStorage.setItem("movements", JSON.stringify(dailyMovements))
  return true
}

function handleDailyMovements(newMovement, dailyMovements) {
  const { operation, value } = newMovement
  const funcObj = {
    "Transferência": handleOperationOfTypeTransfer,
    "Saque": handleOperationOfTypeWithdraw,
    "Deposito": handleOperationOfTypeDeposit
  }
  return funcObj[operation](newMovement, dailyMovements)
}

export function handleStatementUpdate(type, value, operation, balance) {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const formatedDate = `${day}/${month}/${year}`;
  let statements = JSON.parse(localStorage.getItem("statement") || "[]");
  let dailyMovements = JSON.parse(localStorage.getItem("movements") || "{}");
  let newStatement = {
    type: type,
    date: formatedDate,
    value: parseFloat(value),
    operation: operation,
    balance: localStorage.getItem("balance")
  let newMovement = {
    operation,
    value
  }
  statements.push(newStatement);
  localStorage.setItem("statement", JSON.stringify(statements))
  const movementsObjectLength = Object.keys(dailyMovements).length
  const thereIsNoMovementsYet = movementsObjectLength === 0
  if (thereIsNoMovementsYet) {
    let obj = {}
    if (operation == "Transferência") {
      obj = {"transfer": value, "withdraw": 0}
      newStatement['balance'] = parseFloat(localStorage.getItem("balance")) + parseFloat(value)
    } else if (operation == "Saque") {
      obj = {"withdraw": value, "transfer": 0}
      newStatement['balance'] = parseFloat(localStorage.getItem("balance")) - parseFloat(value)
    }
    localStorage.setItem("movements", JSON.stringify(obj))
    statements.push(newStatement);
    localStorage.setItem("statement", JSON.stringify(statements))
    return true
  } else {
    const userIsAllowedToExecOperation = handleDailyMovements(newMovement, dailyMovements)
    if (!userIsAllowedToExecOperation) {
      return false
    }
    if (operation == "Transferência") {
      newStatement['balance'] = parseFloat(localStorage.getItem("balance")) + parseFloat(value)
    } else if (operation == "Saque") {
      newStatement['balance'] = parseFloat(localStorage.getItem("balance")) - parseFloat(value)
    }
    statements.push(newStatement);
    localStorage.setItem("statement", JSON.stringify(statements))
    return true
  }
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
