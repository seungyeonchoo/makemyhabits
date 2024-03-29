import { useState } from 'react';

const useToggle = (initialToggle = false) => {
  const [toggle, setToggle] = useState(initialToggle);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return { toggle, handleToggle, setToggle };
};

export default useToggle;
