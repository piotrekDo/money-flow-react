import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { CategoriesPage } from "./components/pages/CategoriesPage";
import { KnownMerchantsPage } from "./components/pages/KnownMerchantsPage";
import { TransactionsPage } from "./components/pages/TransactionsPage";


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
