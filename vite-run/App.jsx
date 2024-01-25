import React from "../core/React.js";

let countFoo = 1;
function Foo() {
  console.log("foo return");
  const update = React.update();
  function handleClick() {
    countFoo++;
    update();
  }

  return (
    <div>
      <button onClick={handleClick}>foo click {countFoo}</button>
    </div>
  );
}

let countBar = 1;
function Bar() {
  console.log("bar return");
  const update = React.update();
  function handleClick() {
    countBar++;
    update();
  }

  return (
    <div>
      <button onClick={handleClick}>bar click {countBar}</button>
    </div>
  );
}

function App() {
  return (
    <div>
      <Foo></Foo>
      <Bar></Bar>
    </div>
  );
}

export default App;
