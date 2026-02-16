import { Box } from "@chakra-ui/react";
import { TransactionsPage } from "./components/pages/TransactionsPage";
import { CategoriesPage } from "./components/pages/CategoriesPage";
import { KnownMerchantsPage } from "./components/pages/KnownMerchantsPage";

function App() {

  return (
    <Box minH='100vh' w='100vw' maxW={'100vw'}>
      {/* <TransactionsPage /> */}
      {/* <CategoriesPage /> */}
      <KnownMerchantsPage />
    </Box>
  );
}

export default App;