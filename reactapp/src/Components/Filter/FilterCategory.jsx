import React from "react";
import Styles from "./Filter.module.css";
import { getDb } from "../../Helper/Fetch";
import { GlobalContext } from "../../GlobalContext";
import { addOrUpdateEndpointParameter, removeEndpointParameterValue } from "../../Helper/handleParameters";

const FilterCategory = ({ setToggle }) => {
  const { endpoint, setEndpoint } = React.useContext(GlobalContext);
  const [types, setTypes] = React.useState();
  const [value, setValue] = React.useState("");

  React.useEffect(() => {
    getDb("categories", setTypes)
  }, [])

  function handleFilter()
  {
    if (value !== "") {
      setEndpoint(addOrUpdateEndpointParameter(endpoint, "category", value));
    } else {
      setEndpoint(removeEndpointParameterValue(endpoint, "category"));
    }

    setToggle(false);
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

export default FilterCategory;