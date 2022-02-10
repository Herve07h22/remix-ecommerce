import { Box, UnorderedList, ListItem, Button } from "@chakra-ui/react";

export const Suggest: React.FC<{ items: string[] }> = ({ items }) => (
  <Box w="100%" p={4} borderWidth="1px" borderRadius="lg">
    <UnorderedList>
      {items.map((item) => (
        <ListItem>{item}</ListItem>
      ))}
    </UnorderedList>
    <Box w="100%" textAlign={"end"}>
      <Button size="xs">Copier</Button>
    </Box>
  </Box>
);
