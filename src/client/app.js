import React from "react";
import "./styles.css";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";
import RouterComponent from "./router";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <RouterComponent />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}
