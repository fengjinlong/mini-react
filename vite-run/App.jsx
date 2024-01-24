import React from "../core/React.js";

let showBar = false;

// function Counter() {
//   // const foo = <div>foo</div>;
//   function Fun() {
//     return <div>foo</div>;
//   }
//   const bar = <div>bar</div>;
//   function handleShowBar() {
//     showBar = !showBar;
//     React.update();
//   }
//   return (
//     <div>
//       Counter
//       {/* <div>{showBar ? bar : foo}</div> */}
//       <div>{showBar ? bar : <Fun />}</div>
//       <button onClick={handleShowBar}>btn</button>
//     </div>
//   );
// }

// 新的比老的短
// function Counter() {
//   const foo = (
//     <div>
//       foo
//       <div>
//         child
//         <p>123</p>
//       </div>
//     </div>
//   );
//   const bar = <div>bar</div>;
//   function handleShowBar() {
//     showBar = !showBar;
//     React.update();
//   }
//   return (
//     <div>
//       Counter
//       <div>{showBar ? bar : foo}</div>
//       <button onClick={handleShowBar}>btn</button>
//     </div>
//   );
// }

// case
function Counter() {
  const bar = <div>bar</div>;
  function handleShowBar() {
    showBar = !showBar;
    React.update();
  }
  return (
    <div>
      Counter
      <div>{showBar && bar}</div>
      <button onClick={handleShowBar}>btn</button>
    </div>
  );
}
function App() {
  return (
    <div>
      <Counter />
    </div>
  );
}

export default App;
