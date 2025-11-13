import AddTransaction from "@/Pages/AddTransaction";
import MyTransactions from "@/Pages/MyTransactions";
import Profile from "@/Pages/Profile";
import Reports from "@/Pages/Reports";
import TransactionDetails from "@/Pages/TransactionDetails";
import UpdateTransaction from "@/Pages/UpdateTransaction";
import Loader from "@/components/Common/Loader";
import PrivateRoute from "@/components/Layout/PrivateRoute";
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
        path: "/forgot-password",
        lazy: () => import("@/Pages/ForgotPassword"),
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
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile></Profile>
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
