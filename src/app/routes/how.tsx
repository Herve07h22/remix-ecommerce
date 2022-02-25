import {
  Box,
  Container,
  Heading,
  List,
  ListIcon,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { EmailIcon, EditIcon, RepeatIcon } from "@chakra-ui/icons";
import { Card } from "../components/sections/Card";

export default function CommentCaMarche({}) {
  return (
    <Container maxW="3xl">
      <Card title="Comment ça marche ?">
        <List spacing={3}>
          <ListItem fontSize="lg">
            <ListIcon as={EmailIcon} color="green.500" />
            Vous recevez par mail un lien valable 24h pour accéder au
            générateur.
          </ListItem>
          <ListItem fontSize="lg">
            <ListIcon as={EditIcon} color="green.500" />
            Vous écrivez un texte descriptif en vous inspirant de l'exemple. Il
            permet à l'IA de suggérer des noms en rapport avec ce contexte.
          </ListItem>
          <ListItem fontSize="lg">
            <ListIcon as={RepeatIcon} color="green.500" />
            Il est possible de demander 10 suggestions différentes, à condition
            d'attendre au moins 10 secondes entre chaque demande.
          </ListItem>
        </List>
      </Card>

      <Card title="Est-ce gratuit ?">
        Oui ! Mais pour une utilisation limitée par le lien d'accès obtenu par
        mail. Pour une utilisation plus intense, il faut souscrire à l'offre
        payante. Contactez-nous pour en savoir +{" "}
      </Card>
      <Card title="Que faîtes-vous de mon mail ?">
        L'adresse mail sert à vous envoyer le lien d'accès au générateur, et à
        vérifier les condition d'usages.
        <br />
        On vous écrira à l'occasion du passage à la version commerciale de
        l'outil. Mais nous ne revendons pas votre email à quiconque, et nous
        n'envoyons pas de spam.
      </Card>

      <Card
        title="Que faîtes-vous des textes que j'écris et des résultats suggérés par
          l'IA ?"
      >
        Rien. Ils ne sont pas mémorisés. Les résultats sont générés à votre
        seule attention. Mais il est possible que le modèle génère des noms
        identiques à ceux d'autres utilisateurs.
      </Card>

      <Card title="Les noms générés sont-ils libres de droits ?">
        <Text fontSize="lg">
          Aucune idée ! Si une proposition vous tape dans l'oeil, c'est à vous
          de vérifier qu'elle est utilisable. L'IA ne s'occupe pas de la
          propriété intellectuelle de ce qu'elle génère.
        </Text>
      </Card>
    </Container>
  );
}
