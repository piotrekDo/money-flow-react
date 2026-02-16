import { createBrowserRouter } from "react-router-dom";
import { TransactionsPage } from "./components/pages/TransactionsPage";
import { KnownMerchantsPage } from "./components/pages/KnownMerchantsPage";
import { CategoriesPage } from "./components/pages/CategoriesPage";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <TransactionsPage />,
  },

]);