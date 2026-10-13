import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles.css";

// Each page owns its route; Shell restores its scroll position on navigation.
window.history.scrollRestoration = "manual";

// GitHub Pages serves directory entries with a trailing slash; keep app routes canonical.
if (window.location.pathname.length > 1 && window.location.pathname.endsWith("/")) {
  window.history.replaceState(window.history.state, "", window.location.pathname.replace(/\/+$/, "") + window.location.search + window.location.hash);
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
