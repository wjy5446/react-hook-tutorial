import React, { useState, useEffect, useRef } from "react";
import "./App.css";

const usePreventLeave = () => {
  const listener = (event) => {
    event.preventDefault();
    event.returnValue = "";
  };

  const enablePrevent = () => window.addEventListener("beforeunload", listener);
  const disablePrevent = () =>
    window.removeEventListener("beforeunload", listener);

  return { enablePrevent, disablePrevent };
};

function App() {
  const { protect, unprotect } = usePreventLeave();

  return (
    <div className="App">
      <button onClick={protect}>Protect</button>
      <button onClick={unprotect}>Unprotext</button>
    </div>
  );
}

export default App;
