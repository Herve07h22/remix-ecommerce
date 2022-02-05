import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Container,
  VStack,
} from "@chakra-ui/react";
import { Outlet, useParams } from "@remix-run/react";

// Ici on requête sur le token pour voir :
// - Jusqu'à quand le token est valide
// - combien de générations ont été réalisées (et combien il en reste )

export default function TokenRoute() {
  const params = useParams();
  console.log(params.token);
  return (
    <Container maxW="2xl">
    <VStack spacing={8} align="stretch" mb="5rem">
      {/* Ici on pourrait proposer plusieurs générateurs : nom de boutiques, ... */}
      <Outlet />

      <Alert status="warning">
        <AlertIcon />
        <Box>
          <AlertTitle>
            Il n'est plus possible de générer de nouvelles propositions.
          </AlertTitle>

          <AlertDescription>
            Il semble que votre lien ne soit plus valide (il expire au bout de
            24h) ou que votre nombre de requêtes est dépassé (max 10).
            Votre token est {params.token}
          </AlertDescription>
        </Box>
      </Alert>
    </VStack>
    </Container>
  );
}
