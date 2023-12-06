import Styles from "./EditorTransaction.module.css";
import { useEffect, useState } from "react";
import { getDb, postDb, putDb } from "../../Helper/Fetch";

const EditorTransaction = ({ editTransaction }) => {

    const [title, setTitle] = useState(editTransaction?.title || '');
    const [amount, setAmount] = useState(editTransaction?.amount || 0);
    const [initialDate, setInitialDate] = useState(editTransaction?.initialDate || '');
    const [type, setType] = useState(editTransaction?.type || 1);
    const [category, setCategory] = useState(editTransaction?.category || 1);

    const [optionsTypes, setOptionsTypes] = useState();
    const [optionsCategories, setOptionsCategories] = useState();

    useEffect(() => {
      getDb("categories", setOptionsCategories);
      getDb("types", setOptionsTypes);
    }, [])

    console.log(type)

    function handleSubmit(e) {
        e.preventDefault();
        
        const transaction = {
            title,
            amount,
            initialDate,
            type,
            category,
        }

        if (!editTransaction) {
          postDb("transactions", transaction);
        } else {
          putDb(`transactions/${editTransaction.id}`, transaction);
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
                <select name="" id="" onChange={(e) => setType(e.target.value)}>
                  {optionsTypes?.map((ot => (
                    <option key={ot.id} value={ot.id}>{ot.name}</option>
                  )))}
                </select>
              </label>


              <label htmlFor="">Categoria
                <select name="" id="" onChange={(e) => setCategory(e.target.value)}>
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