import './App.css'

function Statement() {
  const statements = localStorage.getItem("statement");
  console.log(statements)
  return (
    <div>
     <h1>Extrato</h1>
     <table>
      <thead>
        <tr>
          <th>Tipo</th>
          <th>Data</th>
          <th>Valor</th>
          <th>Operação</th>
          <th>Saldo</th>
        </tr><br/>
      </thead>
      <tbody>
          {JSON.parse(statements).map((statement) => (
            <tr>
              <td>{statement.type}</td>
              <td>{statement.date}</td>
              <td>R$ {statement.value}</td>
              <td>{statement.operation}</td>
              <td>R$ {statement.balance}</td>
            </tr>
          ))}
      </tbody>
    </table>
    </div>
  )
}

export default Statement
