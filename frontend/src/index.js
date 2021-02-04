import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import "./styles/scss/main.css";
import "font-awesome/css/font-awesome.min.css";
import "./styles/scss/index.scss"

import { Provider } from "react-redux";
import { createStore } from "redux";
import {applyMiddleware} from "redux";
import thunk from "redux-thunk";
import RootReducer from "./reducers";
//dev tools
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";

const store = createStore(
  RootReducer,
  composeWithDevTools(applyMiddleware(thunk,logger))
);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,

  document.getElementById("root")
);
