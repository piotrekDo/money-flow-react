import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { CategoriesPage } from "./pages/CategoriesPage";
import { KnownMerchantsPage } from "./pages/KnownMerchantsPage";
import { TransactionsPage } from "./pages/TransactionsPage";


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
        path: "transactions",
        element: <TransactionsPage />,
      },
      {
        path: "merchants",
        element: <KnownMerchantsPage />,
      },
      {
        path: "categories",
        element: <CategoriesPage />,
      },
    ],
  },
])
