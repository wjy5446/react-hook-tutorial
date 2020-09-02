import React, { useState, useEffect, useRef } from "react";
import "./App.css";

const useClick = (onClick) => {
  const element = useRef();

  useEffect(() => {
    if (element.current) {
      element.current.addEventListener("click", onClick);

      return () => element.current.removeEventListener("click", onClick);
    }
  }, []);

  return element;
};

function App() {
  const sayHello = () => console.log("hello");

  const title = useClick(sayHello);

  return (
    <div className="App">
      <div ref={title}>Hello</div>
    </div>
  );
}

export default App;
