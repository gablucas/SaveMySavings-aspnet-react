import Header from "./Components/Header/Header";
import { GlobalProvider } from "./GlobalContext";
import Home from "./Pages/Home/Home";

const App = () => {
  return (
    <>
      <GlobalProvider>
        <Header />
        <Home />
      </GlobalProvider>
    </>
  )
}

export default App;