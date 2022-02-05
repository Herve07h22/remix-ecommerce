import { Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react";

export default function SentErrorRoute() {
    return (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle mr={2}>Aïe !</AlertTitle>
          <AlertDescription>L'envoi du mail a échoué...</AlertDescription>
        </Alert>
      )
}


  