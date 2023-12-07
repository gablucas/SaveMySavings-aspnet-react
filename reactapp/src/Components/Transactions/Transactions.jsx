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
import FilterCategory from "../Filter/FilterCategory";
import FilterAmount from "../Filter/FilterAmount";
import FilterDate from "../Filter/FilterDate";

const Transactions = () => {
  const { transactions } = useContext(GlobalContext);
  const type = useToggle();
  const category = useToggle();
  const amount = useToggle();
  const date = useToggle();

  const [toggle, setToggle] = useState(false);
  const [editTransaction, setEditTransaction] = useState({});

  function handleEdit(id) {
    setToggle(!toggle);
    setEditTransaction(transactions.filter(t => t.id === id)[0]);
  }

    return (
      <section className={Styles.transactions}>

        <ul className={Styles.menu}>
          <li>Tipo <img onClick={() => type.setToggle(true)} src={FilterIcon} alt="" /></li>
          <li>Categoria <img onClick={() => category.setToggle(true)} src={FilterIcon} alt="" /></li>
          <li>Descrição</li>
          <li>Valor <img onClick={() => amount.setToggle(true)} src={FilterIcon} alt="" /></li>
          <li>Data <img onClick={() => date.setToggle(true)} src={FilterIcon} alt="" /></li>
          <li>Editar item</li>
          <li>Excluir item</li>
        </ul>

        {transactions?.map((transaction) => (
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
      {type.toggle && <Modal setToggle={type.setToggle}><FilterType setToggle={type.setToggle}/></Modal>}
      {category.toggle && <Modal setToggle={category.setToggle}><FilterCategory setToggle={category.setToggle}/></Modal>}
      {amount.toggle && <Modal setToggle={amount.setToggle}><FilterAmount setToggle={amount.setToggle}/></Modal>}
      {date.toggle && <Modal setToggle={date.setToggle}><FilterDate setToggle={date.setToggle}/></Modal>}
      </section>  
    )
}

export default Transactions;