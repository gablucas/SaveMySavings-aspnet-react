import React from "react";
import Styles from "./Filter.module.css";
import { getDb } from "../../Helper/Fetch";
import { GlobalContext } from "../../GlobalContext";

const FilterType = () => {
  const { setEndpoint } = React.useContext(GlobalContext);
  const [types, setTypes] = React.useState();
  const [value, setValue] = React.useState("");

  React.useEffect(() => {
    getDb("types", setTypes)
  }, [])

  function handleFilter()
  {
    if (value !== "") {
      setEndpoint(`transactions/type/${value}`);
    } else {
      setEndpoint(`transactions`);
    }
  }

  return (
    <div className={Styles.filter}>
      <label htmlFor="">Tipo
        <select name="" id="" value={value} onChange={(e) => setValue(e.target.value)}>
          <option value="">Todos</option>
          {types?.map((t) => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>
      </label>
      <button onClick={handleFilter}>Filtrar</button>
    </div>
  )
}

export default FilterType;