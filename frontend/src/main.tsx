import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@gravity-ui/uikit";

import { ScoresProvider } from "~common/providers";
import App from "./App";

import "@gravity-ui/uikit/styles/styles.css";
import "./styles.css";

window.addEventListener("DOMContentLoaded", () => {
  const rootElement = document.getElementById("root");

  if (!rootElement) {
    throw new Error("Root element not found");
  }

  const root = createRoot(rootElement);

  root.render(
    <StrictMode>
      <ThemeProvider theme="light">
        <ScoresProvider>
          <App />
        </ScoresProvider>
      </ThemeProvider>
    </StrictMode>,
  );
});
