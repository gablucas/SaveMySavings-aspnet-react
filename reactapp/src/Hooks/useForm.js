import React from 'react'


const useForm = (initialValue) => {
  const [value, setValue] = React.useState(initialValue || '');
  const [error, setError] = React.useState();

  function validate(value) {
    if(value === "") {
      setError('Campo vazio');
      return false;
    } else {
      setError(null);
      return true;
    }
  }

  function onChange({ target }) {
    if (error) validate(target.value)
    setValue(target.value);
  }

  return {
    value,
    setValue,
    onChange,
    error,
    validate: () => validate(value),
    onBlur: () => validate(value),
  }

}

export default useForm