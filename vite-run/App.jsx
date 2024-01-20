import React from "../core/React.js";

let count = 10;

let pro = { id: 111 };
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

function App2() {
  return (
    <button
      onClick={() => {
        count++;
        React.update();
        console.log("click");
      }}
    >
      {count}
    </button>
  );
}

const App = <div>1</div>;

export default App;
