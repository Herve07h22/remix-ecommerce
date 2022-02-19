import { Container, VStack } from "@chakra-ui/react";
import { Outlet } from "remix";

export default function SignupRoute() {
  return (
    <Container maxW="2xl">
      <VStack spacing={8} align="stretch" mb="5rem">
        <Outlet />
      </VStack>
    </Container>
  );
}
