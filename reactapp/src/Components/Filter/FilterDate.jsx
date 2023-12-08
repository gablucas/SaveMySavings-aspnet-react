import React from "react";
import Styles from "./Filter.module.css";
import { GlobalContext } from "../../GlobalContext";
import { addOrUpdateEndpointParameter, getEndpointParameterValue, removeEndpointParameterValue } from "../../Helper/handleParameters";
import convertDate from "../../Helper/ConvertDate";

const FilterDate = ({ setToggle }) => {
  const { endpoint, setEndpoint } = React.useContext(GlobalContext);
  const [minDate, setMinDate] = React.useState(getEndpointParameterValue(endpoint, "minDate") || "");
  const [maxDate, setMaxDate] = React.useState(getEndpointParameterValue(endpoint, "maxDate") || "");

  function handleFilter()
  {
    if (minDate !== "" && maxDate !== "") {
      let newEndpoint = addOrUpdateEndpointParameter(endpoint, "minDate", minDate);
      newEndpoint = addOrUpdateEndpointParameter(newEndpoint, "maxDate", maxDate);
      setEndpoint(newEndpoint);

    } else if (minDate !== "" && maxDate == "") {
      setEndpoint(addOrUpdateEndpointParameter(endpoint, "minDate", minDate));

    } else if (maxDate !== "" && minDate == "") {
      setEndpoint(addOrUpdateEndpointParameter(endpoint, "maxDate", maxDate));

    } else if(minDate == "" && maxDate == "") {
      let newEndpoint = removeEndpointParameterValue(endpoint, "minDate");
      newEndpoint = removeEndpointParameterValue(newEndpoint, "maxDate");
      setEndpoint(newEndpoint);

    } else if (minDate == "" && minDate !== "") {
      setEndpoint(removeEndpointParameterValue(endpoint, "minDate"));

    } else {
      setEndpoint(removeEndpointParameterValue(endpoint, "maxDate"));
    }

    setToggle(false);
  }

  function handleCleanFilter() {
    setMinDate("");
    setMaxDate("");
    
    let newEndpoint = removeEndpointParameterValue(endpoint, "minDate");
      newEndpoint = removeEndpointParameterValue(newEndpoint, "maxDate");
      setEndpoint(newEndpoint);
  }

  return (
    <div className={Styles.filter}>
      <label htmlFor="">Valor mínimo
        <input type="date" value={minDate} onChange={(e) => setMinDate(e.target.value)}/>
      </label>

      <label htmlFor="">Valor Máximo
        <input type="date" value={maxDate} onChange={(e) => setMaxDate(e.target.value)} />
      </label>

      {(minDate !== "" || maxDate !== "") && <button onClick={handleCleanFilter}>Limpar Filtro</button>}
      <button onClick={handleFilter}>Filtrar</button>
    </div>
  )
}

export default FilterDate;