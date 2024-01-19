import React from "../core/React.js";
// const App = React.createElement(
//   "div",
//   {
//     id: "app",
//   },
//   "app",
//   "-ye"
// );

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

// const App = (
//   <p id="app">
//     app<Fn></Fn>
//   </p>
// );

function App() {
  return (
    // <div id="app">
    //   <Fn num={2000}></Fn>
    // </div>
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

export default App;
