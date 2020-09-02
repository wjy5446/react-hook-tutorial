import React, { useState, useEffect } from "react";
import "./App.css";

const useTitle = (initialTitle) => {
  const [title, setTitle] = useState(initialTitle);

  const updateTitle = () => {
    const htmlTitle = document.querySelector("title");
    htmlTitle.innerText = title;
  };

  useEffect(updateTitle, [title]);

  return setTitle;
};

function App() {
  const titleUpdater = useTitle("Loading....");
  setTimeout(() => titleUpdater("Home"), 5000);
  const sayHello = () => console.log("hello");

  const [number, setNumber] = useState(0);
  const [anumber, setAnumber] = useState(0);

  useEffect(() => {
    sayHello();
  }, [number]);

  return (
    <div className="App">
      <div>Hello</div>
      <button onClick={() => setNumber(number + 1)}>{number}</button>
      <button onClick={() => setAnumber(anumber + 1)}>{anumber}</button>
    </div>
  );
}

export default App;
