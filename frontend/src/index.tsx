import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/Store";

// Safely get the root element and handle the null case
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found in the DOM");
}

// Create the root and render the application
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
