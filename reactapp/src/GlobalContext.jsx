import React from "react"
import { getDb } from "./Helper/Fetch";

export const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [endpoint, setEndpoint] = React.useState("transactions?type=&category=&minAmount=&maxAmount=&minDate=&maxDate=");
  const [transactions, setTransactions] = React.useState([]);

  React.useEffect(() => {
    getDb(endpoint, setTransactions)
 }, [endpoint])

  return (
    <GlobalContext.Provider value={{ transactions, endpoint, setEndpoint }}>
      {children}
    </GlobalContext.Provider>
  )
}