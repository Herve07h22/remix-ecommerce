import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Badge,
  Box,
  Button,
  Container,
  Heading,
  ListItem,
  Text,
  Textarea,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";

export default function TextGenRoute() {
  return (
    <Container maxW="2xl">
      <VStack spacing={8} align="stretch" mb="5rem">
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
          placeholder="Exemple : Je vends de produits cosmétiques bio fabriqués à partir de plantes sauvages récoltées en Corse, pour ceux qui veulent prendre naturellement soin de leur corps."
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
        <Alert status="warning">
          <AlertIcon />
          <Box>
            <AlertTitle>
              Il n'est plus possible de générer de nouvelles propositions.
            </AlertTitle>

            <AlertDescription>
              Il semble que votre lien ne soit plus valide (il expire au bout de
              24h) ou que votre nombre de requêtes est dépassé (max 10).
            </AlertDescription>
          </Box>
        </Alert>
      </VStack>
    </Container>
  );
}
