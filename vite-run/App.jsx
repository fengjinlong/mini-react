import React from "../core/React.js";

let count = 101;

let pro = { id: "ccc", class: "ddd" };
const Fn = ({ num }) => {
  return (
    <button
      {...pro}
      onClick={() => {
        count++;
        pro = {};
        React.update();
        console.log("click");
      }}
    >
      {count}
    </button>
  );
};

function App() {
  return (
    <button
      {...pro}
      onClick={() => {
        count++;
        pro = {};
        React.update();
        console.log("click");
      }}
    >
      {count}
    </button>
  );
}

const App2 = <div>1</div>;

export default App;
