import React from "react";
import { render } from "react-dom";
//import Map from "./Map";
import App from "./app";
import UserContextProvider from "./store/providers/UserContextProvider";

render(
  <>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </>,
  document.getElementById("root")
);
