import Styles from "./Home.module.css";
import { useEffect, useState } from "react";
import Dashboard from "../../Components/Dashboard/Dashboard";
import Transactions from "../../Components/Transactions/Transactions";
import { getDb } from "../../Helper/Fetch";

const Home = () => {

  const [transactions, setTransactions] = useState([]);


  useEffect(() => {
     getDb("transactions", setTransactions)
  }, [])

  return (
    <section className={Styles.home}>
      <Dashboard transactions={transactions} />
      <Transactions transactions={transactions} />
    </section>
  )
}

export default Home;