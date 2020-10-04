import React from "react";
import ReactDOM from "react-dom";
import { CalendarApp } from "./CalendarApp";
import * as serviceWorker from "./serviceWorker";
// style
import "./assets/style/index";

ReactDOM.render(
  <React.StrictMode>
    <CalendarApp />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
