import React from "../core/React.js";
// const App = React.createElement(
//   "div",
//   {
//     id: "app",
//   },
//   "app",
//   "-ye"
// );
const Fn = ({ num }) => {
  return <p>{num}</p>;
};

// const App = (
//   <p id="app">
//     app<Fn></Fn>
//   </p>
// );

function App() {
  return (
    <div id="app">
      app
      <Fn num={1000}></Fn>
      <Fn num={2000}></Fn>
    </div>
  );
}

export default App;
