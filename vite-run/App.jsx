import React from "../core/React.js";

function Foo() {
  const [count, setCount] = React.useState(10);
  const [bar, setBar] = React.useState(20);
  function handleClick() {
    setCount((c) => c + 1);
  }
  function handleClickBar() {
    setBar((c) => c + 10);
  }
  React.useEffect(() => {
    console.log("init effect");
  }, []);

  React.useEffect(() => {
    console.log(" count & bar init & change effect");
  }, [count, bar]);

  return (
    <div>
      {count}
      <p>{bar}</p>
      <button onClick={handleClick}>foo click </button>
      <button onClick={handleClickBar}>bar click </button>
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
