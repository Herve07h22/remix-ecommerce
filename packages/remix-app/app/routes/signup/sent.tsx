import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

export default function SentRoute() {
  return (
    <Alert status="success">
      <AlertIcon />
      <AlertTitle mr={2}>Envoyé !</AlertTitle>
      <AlertDescription>Regardez dans votre boite mail.</AlertDescription>
    </Alert>
  );
}
