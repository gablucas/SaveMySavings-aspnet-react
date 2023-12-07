import React from "react";
import Styles from "./Filter.module.css";
import { GlobalContext } from "../../GlobalContext";
import { addOrUpdateEndpointParameter, removeEndpointParameterValue } from "../../Helper/handleParameters";
import convertDate from "../../Helper/ConvertDate";

const FilterDate = ({ setToggle }) => {
  const { endpoint, setEndpoint } = React.useContext(GlobalContext);
  const [minDate, setMinDate] = React.useState("");
  const [maxDate, setMaxDate] = React.useState("");

  function handleFilter()
  {

    console.log(convertDate(maxDate, "endpoint"))

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

  return (
    <div className={Styles.filter}>
      <label htmlFor="">Valor mínimo
        <input type="date" value={minDate} onChange={(e) => setMinDate(e.target.value)}/>
      </label>

      <label htmlFor="">Valor Máximo
        <input type="date" value={maxDate} onChange={(e) => setMaxDate(e.target.value)} />
      </label>
      <button onClick={handleFilter}>Filtrar</button>
    </div>
  )
}

export default FilterDate;