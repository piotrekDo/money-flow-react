import { Box } from "@chakra-ui/react";
import { TransactionsPage } from "./components/pages/TransactionsPage";

function App() {
  return (
    <Box minH='100vh' w='100vw' maxW={'100vw'}>
      <TransactionsPage />
    </Box>
  );
}

export default App;
