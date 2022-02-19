import { Heading, Input, Text } from "@chakra-ui/react";
import { ActionFunction, Form, Link, redirect, useTransition } from "remix";
import { SubmitButton } from "~/app/components/ui/SubmitButton";
import { App } from "~/App.server";

export const action: ActionFunction = async ({ request }) => {
  const body = await request.formData();
  const email = body.get("email");
  if (email) {
    const result = await App.getAToken({ email: email.toString() || "" });
    if (result.status === "success") return redirect(`/signup/sent`);
  }
  return redirect("/signup/error");
};

export default function SignupRoute() {
  const transition = useTransition();
  const busy = !!transition.submission;
  return (
    <>
      <Heading as="h1" size="xl">
        Obtenez votre lien d'accès au générateur d'idées
      </Heading>
      <Text fontSize="md">
        Pour l'instant, le générateur d'idée est un service gratuit.
      </Text>
      <Text fontSize="md" align="justify">
        Mais en contrepartie, nous devons en limiter l'accès pour éviter d'être
        bombardé de demandes qui sont couteuses en temps de calcul.
        <br />
        Pour éviter les utilisations excessives, nous allons vous envoyer un
        lien d'accès par mail. Ce lien est valable <b>pendant 24h</b>, et permet
        de lancer <b>10 fois</b> le service de génération.
      </Text>
      <Text fontSize="md">
        Si ces limites sont trop restrictives, dites-le nous en nous écrivant à{" "}
        <code>bonjour@sugggest.me</code>
      </Text>
      <Form method="post">
        <Input placeholder="monemail@domaine.com" name="email" type="email" />
        <SubmitButton label="Obtenir mon lien d'accès gratuit" loading={busy} />

        <Text fontSize="xs" mt={1} color="GrayText">
          A propos, nous aussi on déteste les spams. Nous ne revendons pas les
          emails collectés. Pour connaître en détail ce qu'il advient de votre
          adresse email, jetez un oeil à la page{" "}
          <Link to="/how">Comment ça marche ?</Link>.
        </Text>
      </Form>
    </>
  );
}
