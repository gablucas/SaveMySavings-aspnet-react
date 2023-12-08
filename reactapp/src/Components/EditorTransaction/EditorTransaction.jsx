import React from "react";
import Styles from "./EditorTransaction.module.css";
import convertDate from "../../Helper/ConvertDate";
import { useEffect, useState } from "react";
import { getDb, postDb, putDb } from "../../Helper/Fetch";
import { GlobalContext } from "../../GlobalContext";

const EditorTransaction = ({ editTransaction }) => {
  const { endpoint } = React.useContext(GlobalContext);

  const [title, setTitle] = useState(editTransaction?.title || '');
  const [amount, setAmount] = useState(editTransaction?.amount || 0);
  const [initialDate, setInitialDate] = useState(editTransaction?.initialDate ? convertDate(editTransaction.initialDate, "InputDate") : '');
  const [typeId, setTypeId] = useState(editTransaction?.type.id || 1);
  const [categoryId, setCategoryId] = useState(editTransaction?.category.id || 1);

  const [optionsTypes, setOptionsTypes] = useState();
  const [optionsCategories, setOptionsCategories] = useState();

  useEffect(() => { 
    getDb("types", setOptionsTypes);
    getDb(`categories/type/${typeId}`, setOptionsCategories);
  }, [typeId])

  function handleSubmit(e) {
      e.preventDefault();
      
      const transaction = {
          title,
          amount,
          initialDate,
          typeId,
          categoryId,
      }

      if (!editTransaction) {
        postDb("transactions", transaction, endpoint);
      } else {
        putDb(`transactions/${editTransaction.id}`, transaction, endpoint);
      }
  }

  return (
    <>
      <h2>{editTransaction ? "Editar transação" : "Nova transação"}</h2>

      <form onSubmit={(e) => handleSubmit(e)} className={Styles.editorTransaction}>
      
        <label htmlFor="">Titulo
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>

        <label htmlFor="">Valor
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </label>

        <label htmlFor="">Data
          <input type="date" value={initialDate} onChange={(e) => setInitialDate(e.target.value)} />
        </label>

        <label htmlFor="">Tipo
          <select name="" id="" onChange={(e) => setTypeId(e.target.value)}>
            {optionsTypes?.map((ot => (
              <option key={ot.id} value={ot.id}>{ot.name}</option>
            )))}
          </select>
        </label>


        <label htmlFor="">Categoria
          <select name="" id="" onChange={(e) => setCategoryId(e.target.value)}>
            {optionsCategories?.map((oc => (
              <option key={oc.id} value={oc.id}>{oc.name}</option>
            )))}
          </select>
        </label>
        

        <button>Enviar</button>
      </form>
    </>
  )
}

export default EditorTransaction;