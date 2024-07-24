import React, { useEffect, useState } from "react";

const UseResize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = (event) => {
    setWindowSize(() => ({
      width: window.innerWidth,
      height: window.innerHeight,
    }));
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowSize;
};

export default UseResize;
