import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { EditorLayout, ErrorPage, Login, SignUp } from "./components";
import EditorHelper from "./constant/EditorHelper.jsx";
import App from "./App.jsx";
import "./index.css";

const router = new createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <SignUp />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/editor",
    element: <EditorHelper />,
  },
  {
    path: "/editor/:roomId",
    element: <EditorLayout />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
