import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import * as matcherActions from "./reducer/matcherActions";
import type * as types from "./types";

const order1: types.order = {
  action: "Buy",
  username: "Elliott",
  price: 5,
  volume: 10,
  timestamp: new Date(),
  id: "order1",
};

const order2: types.order = {
  action: "Sell",
  username: "Elliott",
  price: 2,
  volume: 20,
  timestamp: new Date(),
  id: "order2",
};

store.dispatch(matcherActions.addOrder(order1));
store.dispatch(matcherActions.addOrder(order2));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
