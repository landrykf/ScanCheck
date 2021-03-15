import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import App from "./App";

// import "./styles/main.scss";
import "font-awesome/css/font-awesome.min.css";
import "./styles/index.scss";

import { Provider } from "react-redux";
import { createStore } from "redux";
import { applyMiddleware } from "redux";
import thunk from "redux-thunk";
import RootReducer from "./reducers";
import { UidContext } from "./components/AppContext";

import { getUsers } from "./actions/users.actions";
//dev tools
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";

//part 2
import reportWebVitals from "./reportWebVitals";

const store = createStore(
  RootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
store.dispatch(getUsers());

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
