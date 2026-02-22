import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { CategoriesPage } from "./pages/CategoriesPage";
import { KnownMerchantsPage } from "./pages/KnownMerchantsPage";
import { TransactionsPage } from "./pages/TransactionsPage";
import { ROUTE_CATEGORIES, ROUTE_MERCHANTS, ROUTE_TRANSACTIONS } from "./library";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,   // ← layout z menu
    children: [
      {
        index: true,
        element: <TransactionsPage />,
      },
      {
        path: ROUTE_TRANSACTIONS,
        element: <TransactionsPage />,
      },
      {
        path: `${ROUTE_MERCHANTS}/:merchantId?`,
        element: <KnownMerchantsPage />,
      },
      {
        path: ROUTE_CATEGORIES,
        element: <CategoriesPage />,
      },
    ],
  },
])
