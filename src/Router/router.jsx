import AddTransaction from "@/Pages/AddTransaction";
import MyTransactions from "@/Pages/MyTransactions";
import TransactionDetails from "@/Pages/TransactionDetails";
import Loader from "@/components/Common/Loader";
import PrivateRoute from "@/components/Layout/PrivateRoute";
import { createBrowserRouter } from "react-router";
import Root from "./Root";
import UpdateTransaction from "@/Pages/UpdateTransaction";
import Reports from "@/Pages/Reports";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    hydrateFallbackElement: <Loader />,
    loader: () => fetch("/data.json"),
    children: [
      {
        path: "/",
        lazy: () => import("@/Pages/Home"),
      },
      {
        path: "/register",
        lazy: () => import("@/Pages/Register"),
      },
      {
        path: "/login",
        lazy: () => import("@/Pages/Login"),
      },
      {
        path: "/my-transactions",
        element: (
          <PrivateRoute>
            <MyTransactions></MyTransactions>
          </PrivateRoute>
        ),
      },
      {
        path: "/add-transaction",
        element: (
          <PrivateRoute>
            <AddTransaction></AddTransaction>
          </PrivateRoute>
        ),
      },
      {
        path: "/transaction/:id",
        element: (
          <PrivateRoute>
            <TransactionDetails></TransactionDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/update-transaction/:id",
        element: (
          <PrivateRoute>
            <UpdateTransaction></UpdateTransaction>
          </PrivateRoute>
        ),
      },
      {
        path: "/reports",
        element: (
          <PrivateRoute>
            <Reports></Reports>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    lazy: () => import("@/Pages/NotFound"),
  },
]);

export default router;
