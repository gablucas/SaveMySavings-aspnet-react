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
import FilterCategory from "../Filter/FilterCategory";
import FilterAmount from "../Filter/FilterAmount";
import FilterDate from "../Filter/FilterDate";
import FilterIcon from "../Svgs/FilterIcon";
import { getEndpointParameterValue } from "../../Helper/handleParameters";
import EditIcon from "../Svgs/EditIcon";
import DeleteIcon from "../Svgs/DeleteIcon";

const Transactions = () => {
  const { endpoint, transactions } = useContext(GlobalContext);
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
          <li>Tipo 
            <div onClick={() => type.setToggle(true)}>
              <FilterIcon fillColor={getEndpointParameterValue(endpoint, "type") ? "#FFA700" : "#FFFFFF"}/>
            </div>
          </li>

          <li>Categoria 
            <div onClick={() => category.setToggle(true)}>
              <FilterIcon fillColor={getEndpointParameterValue(endpoint, "category") ? "#FFA700" : "#FFFFFF"}/>
            </div>
          </li>

          <li>Descrição</li>

          <li>Valor 
            <div onClick={() => amount.setToggle(true)} >
              <FilterIcon fillColor={getEndpointParameterValue(endpoint, "minAmount") ? "#FFA700" : getEndpointParameterValue(endpoint, "maxAmount") ? "#FFA700" : "#FFFFFF" }/>
            </div>
          </li>

          <li>Data 
            <div onClick={() => date.setToggle(true)} >
              <FilterIcon fillColor={getEndpointParameterValue(endpoint, "minDate") ? "#FFA700" : getEndpointParameterValue(endpoint, "maxDate") ? "#FFA700" : "#FFFFFF"}/>
            </div>
          </li>

          <li>Editar</li>
          <li>Excluir</li>
        </ul>

        {transactions?.map((transaction) => (
          <ul key={transaction.id} className={Styles.transaction}>
            <li>{transaction.type.name}</li>
            <li>{transaction.category.name}</li>
            <li>{transaction.title}</li>
            <li>{convertCurrency(transaction.amount)}</li>
            <li>{convertDate(transaction.initialDate, "BR")}</li>
            <li className={Styles.action} onClick={() => handleEdit(transaction.id)}><EditIcon /></li>
            <li className={Styles.action} onClick={() => deleteDb(`transactions/${transaction.id}`)}><DeleteIcon /></li>
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