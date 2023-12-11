import Error from "../Error/Error"

const Select = ({ options, label, placeholder, name, value, onChange, onBlur, error }) => {
  return (
    <div>
      <label htmlFor={name} >{label}</label>
      <select 
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}>

        {options?.map((ot => (
          <option key={ot.id} value={ot.id}>{ot.name}</option>
        )))}
      </select>
        <Error>{error}</Error>
    </div>
  )
}

export default Select