import { createBrowserRouter } from "react-router";
import Login from "../views/login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
  },
]);

export default router
