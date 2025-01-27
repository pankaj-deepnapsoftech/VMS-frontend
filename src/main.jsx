import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  BrowserRouter,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "./App";
import { AuthContextProvider, DataContextProvider, VulnerabililtyDataContextProvider } from "./context";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <DataContextProvider>
          <VulnerabililtyDataContextProvider>
            <App />
          </VulnerabililtyDataContextProvider>
        </DataContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>
);
