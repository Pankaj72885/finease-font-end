import ErrorPage from "@/components/Common/ErrorPage";
import Loader from "@/components/Common/Loader";
import Home from "@/Pages/Home";
import { createBrowserRouter } from "react-router";
import Root from "./Root";
import Login from "@/Pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    hydrateFallbackElement: <Loader />,
    loader: () => fetch("/data.json"),
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "/login",
        Component: Login,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
