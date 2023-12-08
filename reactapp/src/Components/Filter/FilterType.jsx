import React from "react";
import Styles from "./Filter.module.css";
import { getDb } from "../../Helper/Fetch";
import { GlobalContext } from "../../GlobalContext";
import { addOrUpdateEndpointParameter, getEndpointParameterValue, removeEndpointParameterValue } from "../../Helper/handleParameters";

const FilterType = ({ setToggle }) => {
  const { endpoint, setEndpoint } = React.useContext(GlobalContext);
  const [types, setTypes] = React.useState();
  const [type, setType] = React.useState(getEndpointParameterValue(endpoint, "type") || "");
  console.log(getEndpointParameterValue(endpoint, "type"))

  React.useEffect(() => {
    getDb("types", setTypes)
  }, [])

  function handleFilter()
  {
    if (type !== "") {
      setEndpoint(addOrUpdateEndpointParameter(endpoint, "type", type));
    } else {
      setEndpoint(removeEndpointParameterValue(endpoint, "type"));
    }

    setToggle(false);
  }

  function handleCleanFilter() {
    setType("");
    setEndpoint(removeEndpointParameterValue(endpoint, "type"));
  }

  return (
    <div className={Styles.filter}>
      <label htmlFor="">Tipo
        <select name="" id="" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">Todos</option>
          {types?.map((t) => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>
      </label>

      {type !== "" && <button onClick={handleCleanFilter}>Limpar Filtro</button>}
      <button onClick={handleFilter}>Filtrar</button>
    </div>
  )
}

export default FilterType;