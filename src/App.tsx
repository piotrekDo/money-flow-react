import { Box, Flex } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import { Outlet, useLocation } from "react-router";
import { MainMenu } from "./components/main-menu/MainMenu";
import { BasePageContainer } from "./pages/BasePageContainer";

function App() {
  const location = useLocation();

  return (
    <Flex>
      <MainMenu />

      <Box w="100%">
        <AnimatePresence mode="wait">
          <BasePageContainer key={location.pathname.split("/")[1]}>
            <Outlet />
          </BasePageContainer>
        </AnimatePresence>
      </Box>
    </Flex>
  );
}

export default App;