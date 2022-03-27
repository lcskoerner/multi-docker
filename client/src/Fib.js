import React from "react";
import axios from "axios";

function Fib() {
  const [state, setState] = React.useState({
    seenIndexes: [],
    values: {},
    index: "",
  });

  React.useEffect(async () => {
    fetchValues();
    fetchIndexes();
  }, [state.index]);

  const fetchValues = async () => {
    const values = await axios.get("/api/values/current");
    const { data } = values;
    setState({
      ...state,
      values: data,
    });
  };

  const fetchIndexes = async () => {
    const seenIndexes = await axios.get("/api/values/all");
    const { data } = seenIndexes;
    setState((currentState) => {
      return {
        ...currentState,
        seenIndexes: data,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("/api/values", {
      ...state,
      index: state.index,
    });
    setState({ index: "" });
  };

  const renderSeenIndexes = () => {
    return state.seenIndexes.map(({ number }) => number).join(", ");
  };

  const renderValues = () => {
    const entries = [];

    for (let key in state.values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {state.values[key]}
        </div>
      );
    }

    return entries;
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter your index:</label>
        <input
          value={state.index}
          onChange={(event) =>
            setState({ ...state, index: event.target.value })
          }
        />
        <button>Submit</button>
      </form>

      <h3>Indexes I have seen:</h3>
      {state.seenIndexes && renderSeenIndexes()}

      <h3>Calculated Values:</h3>
      {state.values && renderValues()}
    </div>
  );
}

export default Fib;
