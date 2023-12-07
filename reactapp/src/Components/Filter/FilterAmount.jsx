import React from "react";
import Styles from "./Filter.module.css";
import { GlobalContext } from "../../GlobalContext";
import { addOrUpdateEndpointParameter, removeEndpointParameterValue } from "../../Helper/handleParameters";

const FilterAmount = ({ setToggle }) => {
  const { endpoint, setEndpoint } = React.useContext(GlobalContext);
  const [minAmount, setMinAmount] = React.useState("");
  const [maxAmount, setMaxAmount] = React.useState("");

  function handleFilter()
  {

    if (minAmount !== "" && maxAmount !== "") {
      let newEndpoint = addOrUpdateEndpointParameter(endpoint, "minAmount", minAmount);
      newEndpoint = addOrUpdateEndpointParameter(newEndpoint, "maxAmount", maxAmount);
      setEndpoint(newEndpoint);

    } else if (minAmount !== "" && maxAmount == "") {
      setEndpoint(addOrUpdateEndpointParameter(endpoint, "minAmount", minAmount));

    } else if (maxAmount !== "" && minAmount == "") {
      setEndpoint(addOrUpdateEndpointParameter(endpoint, "maxAmount", maxAmount));

    } else if(minAmount == "" && maxAmount == "") {
      let newEndpoint = removeEndpointParameterValue(endpoint, "minAmount");
      newEndpoint = removeEndpointParameterValue(newEndpoint, "maxAmount");
      setEndpoint(newEndpoint);

    } else if (minAmount == "" && minAmount !== "") {
      setEndpoint(removeEndpointParameterValue(endpoint, "minAmount"));

    } else {
      setEndpoint(removeEndpointParameterValue(endpoint, "maxAmount"));
    }

    setToggle(false);
  }

  return (
    <div className={Styles.filter}>
      <label htmlFor="">Valor mínimo
        <input type="number" value={minAmount} onChange={(e) => setMinAmount(e.target.value)}/>
      </label>

      <label htmlFor="">Valor Máximo
        <input type="number" value={maxAmount} onChange={(e) => setMaxAmount(e.target.value)} />
      </label>
      <button onClick={handleFilter}>Filtrar</button>
    </div>
  )
}

export default FilterAmount;