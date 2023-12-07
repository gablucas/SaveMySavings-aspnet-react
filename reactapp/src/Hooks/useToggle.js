import React from 'react';

const useToggle = () => {
  const [toggle, setToggle] = React.useState();

  return {
    toggle,
    setToggle
  }
}

export default useToggle;