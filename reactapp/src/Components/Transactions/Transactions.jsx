import Styles from "./Transaction.module.css";
import Modal from "../../Components/Modal/Modal";
import useToggle from "../../Hooks/useToggle";
import convertCurrency from "../../Helper/ConvertCurrency";
import convertDate from "../../Helper/ConvertDate";
import { deleteDb } from '../../Helper/Fetch';
import { useContext, useState } from "react";
import { GlobalContext } from "../../GlobalContext";
import EditorTransaction from "../EditorTransaction/EditorTransaction";
import FilterType from "../Filter/FilterType";
import FilterIcon from "../../assets/icons/filter.svg";

const Transactions = () => {
  const { transactions } = useContext(GlobalContext);
  const filter = useToggle();

  const [toggle, setToggle] = useState(false);
  const [editTransaction, setEditTransaction] = useState({});

  function handleEdit(id) {
    setToggle(!toggle);
    setEditTransaction(transactions.filter(t => t.id === id)[0]);
  }
  
    if (transactions.length > 0)
    return (
      <section className={Styles.transactions}>

        <ul className={Styles.menu}>
          <li>Tipo <img onClick={() => filter.setToggle(true)} src={FilterIcon} alt="" /></li>
          <li>Categoria</li>
          <li>Descrição</li>
          <li>Valor</li>
          <li>Data</li>
          <li>Editar item</li>
          <li>Excluir item</li>
        </ul>

        {transactions.map((transaction) => (
          <ul key={transaction.id} className={Styles.transaction}>
            <li>{transaction.type.name}</li>
            <li>{transaction.category.name}</li>
            <li>{transaction.title}</li>
            <li>{convertCurrency(transaction.amount)}</li>
            <li>{convertDate(transaction.initialDate, "BR")}</li>
            <li className={Styles.action} onClick={() => handleEdit(transaction.id)}>Editar</li>
            <li className={Styles.action} onClick={() => deleteDb(`transactions/${transaction.id}`)}>Excluir</li>
          </ul>
        ))}

      {toggle && <Modal setToggle={setToggle}><EditorTransaction editTransaction={editTransaction} /></Modal>}
      {filter.toggle && <Modal setToggle={filter.setToggle}><FilterType /></Modal>}
      </section>  
    )
    else
    return(<h1>Sem itens adicionados</h1>)
}

export default Transactions;