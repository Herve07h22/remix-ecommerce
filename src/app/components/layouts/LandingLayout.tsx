import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
} from "@chakra-ui/react";
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
      <Breadcrumb separator="-">
        <BreadcrumbItem>
          <BreadcrumbLink href="https://camilab.co">
            Remix playground made by Camilab
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink href="https://github.com/Herve07h22/ecommerce">
            Source
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink href="https://remix.run">
            Built with Remix
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    </Box>
  </Flex>
);
