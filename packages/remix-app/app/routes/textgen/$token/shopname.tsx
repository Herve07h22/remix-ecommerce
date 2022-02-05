import {
  Text,
  Heading,
  Textarea,
  Button,
  Box,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";

export default function TextGenIndexRoute() {
  return (
    <>
      <Heading as="h1" size="xl">
        Dites-nous quelques mots à propos de votre commerce
      </Heading>
      <Text fontSize="md">
        Ecrivez une ou deux phrases de contexte. Elles vont être analysées par
        l'IA pour en déduire des propositions de noms adaptées.
      </Text>
      <Textarea
        minHeight={150}
        isFullWidth
        placeholder="Je vends de produits cosmétiques bio fabriqués à partir de plantes sauvages récoltées en Corse, pour ceux qui veulent prendre naturellement soin de leur corps."
      />
      <Button
        colorScheme="primary"
        borderRadius="8px"
        py="4"
        px="4"
        lineHeight="1"
      >
        Trouver des idées de nom
      </Button>
      <Box w="100%" p={4} borderWidth="1px" borderRadius="lg">
        <UnorderedList>
          <ListItem>Lorem ipsum dolor sit amet</ListItem>
          <ListItem>Consectetur adipiscing elit</ListItem>
          <ListItem>Integer molestie lorem at massa</ListItem>
          <ListItem>Facilisis in pretium nisl aliquet</ListItem>
        </UnorderedList>
        <Box w="100%" textAlign={"end"}>
          <Button size="xs">Copier</Button>
        </Box>
      </Box>
    </>
  );
}
