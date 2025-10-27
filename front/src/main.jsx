import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import "./index.css";
import App from "./App.jsx";
import { Evento } from "./page";
import { AppMenu } from "./components";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

const router = createBrowserRouter([
  { path: "/", element: <Evento /> },
  { path: "/evento", element: <Evento /> },
]);

createRoot(document.getElementById("root")).render(
  <>
    <AppMenu sx={{ position: "fixed", top: 0, left: 0, right: 0 }} />
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </>
);
