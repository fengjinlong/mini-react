import React from "../core/React.js";

function Foo() {
  const [count, setCount] = React.useState(10);
  const [bar, setBar] = React.useState(20);
  function handleClick() {
    setCount((c) => c + 1);
    setBar((b) => b + 1);
  }

  return (
    <div>
      {count}
      <p>{bar}</p>
      <button onClick={handleClick}>foo click {count}</button>
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
