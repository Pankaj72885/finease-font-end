import ErrorPage from "@/Components/Common/ErrorPage";
import Loader from "@/Components/Common/Loader";
import Home from "@/Pages/Home";
import { createBrowserRouter } from "react-router";
import Root from "./Root";

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
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
