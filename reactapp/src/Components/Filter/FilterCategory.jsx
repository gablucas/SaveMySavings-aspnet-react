import React from "react";
import Styles from "./Filter.module.css";
import { getDb } from "../../Helper/Fetch";
import { GlobalContext } from "../../GlobalContext";
import { addOrUpdateEndpointParameter, getEndpointParameterValue, removeEndpointParameterValue } from "../../Helper/handleParameters";

const FilterCategory = ({ setToggle }) => {
  const { endpoint, setEndpoint } = React.useContext(GlobalContext);
  const [types, setTypes] = React.useState();
  const [category, setCategory] = React.useState(getEndpointParameterValue(endpoint, "category") || "");

  React.useEffect(() => {
    getDb("categories", setTypes)
  }, [])

  function handleFilter()
  {
    if (category !== "") {
      setEndpoint(addOrUpdateEndpointParameter(endpoint, "category", category));
    } else {
      setEndpoint(removeEndpointParameterValue(endpoint, "category"));
    }

    setToggle(false);
  }

  function handleCleanFilter() {
    setCategory("");
    setEndpoint(removeEndpointParameterValue(endpoint, "category"));
  }

  return (
    <div className={Styles.filter}>
      <label htmlFor="">Tipo
        <select name="" id="" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Todos</option>
          {types?.map((t) => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>
      </label>
      
      {category !== "" && <button onClick={handleCleanFilter}>Limpar filtro</button>}
      <button onClick={handleFilter}>Filtrar</button>
    </div>
  )
}

export default FilterCategory;