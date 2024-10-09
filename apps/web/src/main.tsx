import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container!);
const baseUrl: string = import.meta.env.VITE_BASE_URL;

if (!baseUrl) {
  throw new Error("VITE_BASE_URL environment variable does not exist");
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
