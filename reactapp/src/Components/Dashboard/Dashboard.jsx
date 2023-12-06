import Styles from "./Dashboard.module.css";
import convertCurrency from "../../Helper/ConvertCurrency";

const Dashboard = ({ transactions }) => {

  const totalReceita = transactions.filter(t => t.type.id === 1).map(t => t.amount).reduce((prev, cur) => prev + cur, 0);

  const totalDespesas = transactions.filter(t => t.type.id === 2).map(t => t.amount).reduce((prev, cur) => prev + cur, 0);

  return (
    <section className={Styles.dashboard}>
      <div>
        <h2>Total Receitas</h2>
        <span>{convertCurrency(totalReceita)}</span>
      </div>

      <div>
        <h2>Total Despesas</h2>
        <span>{convertCurrency(totalDespesas)}</span>
      </div>
    </section>
  )
}

export default Dashboard;