import defaultAxios from "axios";
import React, { useState, useEffect, useRef } from "react";
import "./App.css";

const useAxios = (opts, axiosInstance = defaultAxios) => {
  const [state, setState] = useState({
    loading: true,
    error: null,
    data: null,
  });

  const [trigger, setTrigger] = useState("");

  const refetch = () => {
    setState({
      ...state,
      loading: true,
    });
    console.log(state);
    setTrigger(Date.now());
  };

  useEffect(() => {
    axiosInstance(opts)
      .then((data) => {
        setState({
          ...state,
          loading: false,
          data,
        });
      })
      .catch((error) => {
        setState({ ...state, loading: false, error });
      });
  }, [trigger]);
  return { ...state, refetch };
};

function App() {
  const { loading, data, error, refetch } = useAxios({
    url: "https://yts.am/api/v2/list_movies.json",
  });

  console.log("q");
  console.log(refetch);
  console.log(loading, data, error);

  return (
    <div className="App" style={{ height: "1000vh" }}>
      <h1>{data && data.status}</h1>
      <h2>{loading && "Loading"}</h2>
      <button onClick={refetch}>Refetch</button>
    </div>
  );
}

export default App;
