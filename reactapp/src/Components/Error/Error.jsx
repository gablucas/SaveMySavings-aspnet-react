import Styles from "./Error.module.css";

const Error = ({ children }) => {

  return (
    <span className={Styles.error}>
      {children}
    </span>
  )
}

export default Error;