import React from "react";
import { useState } from "react";

const UseDebounce = (value, delay = 1000) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = () => {
      setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
    };

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default UseDebounce;
