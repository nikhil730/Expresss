import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { legacy_createStore as createStore } from "redux";
import { applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import TagManager from "react-gtm-module";

import reducers from "./reducers";

import App from "./App";
import "./index.css";

const store = createStore(reducers, compose(applyMiddleware(thunk)));

const tagManagerArgs = {
  gtmId: "G-QDSRHM2RDJ",
};

TagManager.initialize(tagManagerArgs);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
