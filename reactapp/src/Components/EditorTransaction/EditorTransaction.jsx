import React from "react";
import Styles from "./EditorTransaction.module.css";
import convertDate from "../../Helper/ConvertDate";
import Input from "../Forms/Input";
import { useEffect, useState } from "react";
import { getDb, postDb, putDb } from "../../Helper/Fetch";
import { GlobalContext } from "../../GlobalContext";
import useForm from "../../Hooks/useForm";
import Select from "../Forms/SElect";

const EditorTransaction = ({ editTransaction }) => {
  const { endpoint } = React.useContext(GlobalContext);

  const title = useForm(editTransaction?.title);
  const amount = useForm(editTransaction?.amount);
  const initialDate = useForm(editTransaction?.initialDate ? convertDate(editTransaction.initialDate, "InputDate") : '');
  const typeId = useForm(editTransaction?.type.id || 1);
  const categoryId = useForm(editTransaction?.category.id || 1);

  const [optionsTypes, setOptionsTypes] = useState();
  const [optionsCategories, setOptionsCategories] = useState();

  useEffect(() => { 
    getDb("types", setOptionsTypes);
    getDb(`categories/type/${typeId.value}`, setOptionsCategories);
  }, [typeId])

  function handleSubmit(e) {
      e.preventDefault();
      
    if (title.validate() && amount.validate() && initialDate.validate() && typeId.validate() && categoryId.validate()) {
      
      const transaction = {
        title: title.value,
        amount: amount.value,
        initialDate: initialDate.value,
        typeId: typeId.value,
        categoryId: categoryId.value,
      }

      if (!editTransaction) {
        postDb("transactions", transaction, endpoint);
      } else {
        putDb(`transactions/${editTransaction.id}`, transaction, endpoint);
      }
    }
  }

  return (
    <>
      <h2>{editTransaction ? "Editar transação" : "Nova transação"}</h2>

      <form onSubmit={(e) => handleSubmit(e)} className={Styles.editorTransaction}>
      
        <Input label="Título" name="title" type="text" {...title} />
        <Input label="Valor" name="value" type="number" {...amount} />
        <Input label="Data" name="initialDate" type="date" {...initialDate} />
        <Select label="Tipo" name="type" options={optionsTypes} {...typeId} />
        <Select label="Categoria" name="category" options={optionsCategories} {...categoryId} />
        <button>Enviar</button>
      </form>
    </>
  )
}

export default EditorTransaction;