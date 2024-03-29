import React from "../core/React.js";

function Foo() {
  const [count, setCount] = React.useState(10);
  const [bar, setBar] = React.useState(20);
  function handleClick() {
    setCount((c) => c + 1);
    setBar((c) => c + 10);
  }

  return (
    <div>
      {count}
      <p>{bar}</p>
      <button onClick={handleClick}>foo click </button>
    </div>
  );
}

function App() {
  return (
    <div>
      <Foo></Foo>
    </div>
  );
}

export default App;
