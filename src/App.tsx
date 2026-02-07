import { Button, HStack } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import type { KnownMerchant } from "./model/KnownMerchant";
import { fetchAllKnownMerchants } from "./service/KnownMerchantHttpService";

function App() {
  const [merchants, setMerchants] = useState<KnownMerchant[]>([]);

  useEffect(() => {
    fetchAllKnownMerchants().then(m => console.log(m))
  }, []);

  return (
    <HStack>
      <Button>Click me</Button>
      <Button>Click me</Button>
    </HStack>
  )
}

export default App
