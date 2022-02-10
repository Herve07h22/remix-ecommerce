import { Heading, Input, Text, Button } from "@chakra-ui/react";
import { Link } from "remix";

export default function SignupRoute() {
    return (
        <>
        <Heading as="h1" size="xl">
          Obtenez votre lien d'accès au générateur d'idées
        </Heading>
        <Text fontSize="md">
          Pour l'instant, le générateur d'idée est un service gratuit.
          </Text><Text fontSize="md" align="justify">
          Mais en contrepartie, nous devons en limiter l'accès pour éviter d'être bombardé de demandes
          qui sont couteuses en temps de calcul.<br />
          Pour éviter les utilisations excessives, nous allons vous envoyer un lien d'accès par mail. 
          Ce lien est valable <b>pendant 24h</b>, et permet de lancer <b>10 fois</b> le service de génération.
        </Text>
        <Text fontSize="md">
          Si ces limites sont trop restrictives, dites-le nous en nous écrivant à <code>bonjour@sugggest.me</code> 
        </Text>
        <form method="post">
        
        <Input placeholder='monemail@domaine.com' name="email" type="email" />
        <Button
         type="submit"
        colorScheme="primary"
        borderRadius="8px"
        py="4"
        px="4"
        lineHeight="1"
        width="100%"
        mt={2}
      >
        Obtenir mon lien d'accès gratuit
      </Button>
      <Text fontSize="xs" mt={1} color="GrayText">
          A propos, nous aussi on déteste les spams. Nous ne revendons pas les emails collectés.
          Pour connaître en détail ce qu'il advient de votre adresse email, jetez un oeil à 
          la page <Link to="/how">Comment ça marche ?</Link>.
          </Text>
      
        </form></>)
}


  