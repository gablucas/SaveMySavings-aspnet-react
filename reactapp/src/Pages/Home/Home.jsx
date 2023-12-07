import Styles from "./Home.module.css";
import Dashboard from "../../Components/Dashboard/Dashboard";
import Transactions from "../../Components/Transactions/Transactions";

const Home = () => {
  return (
    <section className={Styles.home}>
      <Dashboard />
      <Transactions />
    </section>
  )
}

export default Home;