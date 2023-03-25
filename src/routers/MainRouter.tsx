import { createBrowserRouter } from "react-router-dom";
import Error404 from "../components/errors/Error404";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Main from "../layouts/Main";

export const mainRouter = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <Error404 />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "login",
        element: <Login />
      }
    ]
  },
]);
