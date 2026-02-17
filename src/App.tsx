import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router";
import { MainMenu } from "./components/main-menu/MainMenu";

function App() {

  return (
    <Flex>
      <MainMenu />

      <Box
        w="100%"
      >
        <Outlet />
      </Box>
    </Flex>
  );
}

export default App;