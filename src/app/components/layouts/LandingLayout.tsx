import { Box, Flex } from "@chakra-ui/react";
import { Header } from "../sections/Header";

export const LandingLayout: React.FC = ({ children }) => (
  <Flex
    direction="column"
    align="center"
    maxW={{ xl: "1200px" }}
    m="0 auto"
    h="100vh"
    justify={"space-between"}
  >
    <Header />
    {children}
    <Box p="2" mb="2">
      Camilab @2022 - mentions légales - confidentialité
    </Box>
  </Flex>
);
