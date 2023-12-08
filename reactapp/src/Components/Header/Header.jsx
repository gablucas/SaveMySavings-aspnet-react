import { useState } from "react";
import Styles from "./Header.module.css";
import EditorTransaction from "../EditorTransaction/EditorTransaction";
import Modal from "../Modal/Modal";
import Logo from "../../assets/icons/logo.svg";

const Header = () => {
    const [toggle, setToggle] = useState(false);

    return(
      <>
        <header className={Styles.header}>
          <h1>SaveMySavings <img src={Logo} alt="" /></h1>
          <button onClick={() => setToggle(!toggle)}>Adicionar nova transação</button>
        </header>

        {toggle && <Modal setToggle={setToggle}><EditorTransaction /></Modal>}
      </>
    )
}

export default Header;