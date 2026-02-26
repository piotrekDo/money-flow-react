import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { ROUTE_CATEGORIES, ROUTE_TRANSACTIONS } from "./library";
import { CategoriesPage } from "./pages/CategoriesPage";
import { DashboardPage } from "./pages/DashboardPage";
import { KnownMerchantsPage } from "./pages/KnownMerchantsPage";
import { TransactionsPage } from "./pages/TransactionsPage";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: ROUTE_TRANSACTIONS,
        element: <TransactionsPage />,
      },
      {
        path: "merchants",
        element: <KnownMerchantsPage />,
        children: [
          {
            path: ":merchantId",
            element: null,
          },
        ],
      },
      {
        path: ROUTE_CATEGORIES,
        element: <CategoriesPage />,
      },
    ],
  },
])
