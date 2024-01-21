import React from "../core/React.js";
import ReactDOM from "../core/ReactDom.js";
import App from "./App.jsx";
const p = { id: "app" };
ReactDOM.createRoot(document.querySelector("#root")).render(<App {...p}></App>);
