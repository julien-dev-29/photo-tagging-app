import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import Root from "./Root";
import Home from "./components/pages/Home";
import "./index.css";
import { StrictMode } from "react";
import GameLayout from "./layouts/GameLayout";
import Game from "./components/pages/Game";
const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [{ index: true, Component: Home }],
  },
  {
    path: "/game",
    Component: GameLayout,
    children: [
      {
        index: true,
        Component: Game,
      },
    ],
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
