import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import Root from "./components/Root";
import userReducer from "./user-reducer.js";

const store = createStore(
  userReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(<Root store={store} />, document.getElementById("root"));
