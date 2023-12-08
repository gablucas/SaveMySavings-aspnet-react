import CloseIcon from '../Svgs/CloseIcon';
import Styles from './Modal.module.css';

const Modal = ({ children, setToggle }) => {
    
    function handleClick(e) {
        if (e.target === e.currentTarget) {
            setToggle(false);
        }
    }

  return (
    <div onClick={(e) => handleClick(e)} className={Styles.modal_container}>
        <div className={Styles.modal_content}>
          <span onClick={() => setToggle(false)} className={Styles.modal_close}><CloseIcon /></span>
          {children}
        </div>
    </div>
  )
}

export default Modal;