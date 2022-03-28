import React from "react";
import "./App.css";
import Fib from "./Fib";

function App() {
  return (
    <div className="App">
      <header
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      ></header>
      <div>
        <Fib />
      </div>
    </div>
  );
}

export default App;
