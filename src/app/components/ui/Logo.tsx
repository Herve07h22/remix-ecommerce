import { Box, Text } from "@chakra-ui/react";

export const Logo: React.FC<{ w?: string }> = () => (
  <Box color={["white", "white", "primary.500", "primary.500"]}>
    <Text fontSize="lg" fontWeight="bold">
      PhoneStore
    </Text>
  </Box>
);
