import React from "react";
import ReactDOM from "react-dom/client";
import { v4 as uuidV4 } from "uuid";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Editor, ErrorPage, Login, SignUp } from "./components";
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
    element: <div>
    </div>
  },
  {
    path: "/editor/:roomId",
    element: <Editor />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
