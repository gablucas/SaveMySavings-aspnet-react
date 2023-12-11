import Error from "../Error/Error"

const Input = ({ label, type, placeholder, name, value, onChange, onBlur, error }) => {
  return (
    <div>
      <label htmlFor={name} >{label}</label>
      <input 
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        />
        <Error>{error}</Error>

    </div>
  )
}

export default Input