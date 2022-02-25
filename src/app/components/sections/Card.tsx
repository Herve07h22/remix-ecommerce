import { Box, Heading, Text } from "@chakra-ui/react";

export const Card: React.FC<{ title: string }> = ({ title, children }) => (
  <Box w="100%" p={8} borderWidth="1px" borderRadius="lg" mb={8}>
    <Heading as="h1" size="xl" mb={5}>
      {title}
    </Heading>
    <Text fontSize="lg">{children}</Text>
  </Box>
);
