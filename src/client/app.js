import React from "react";
import "./styles.css";
import RouterComponent from "./router";
import { BrowserRouter } from "react-router-dom";

export default function App() {
  // Use Tailwind to create a nice entry point for our multiplayer game.
  // Add a nice header with Tailwind
  return (
    <BrowserRouter>
      <RouterComponent />
    </BrowserRouter>
  );
}
