import React from "react"
import { getDb } from "./Helper/Fetch";

export const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [endpoint, setEndpoint] = React.useState("transactions");
  const [transactions, setTransactions] = React.useState([]);

  React.useEffect(() => {
    console.log("oi")
    getDb(endpoint, setTransactions)
 }, [endpoint])

  return (
    <GlobalContext.Provider value={{ transactions, setEndpoint }}>
      {children}
    </GlobalContext.Provider>
  )
}