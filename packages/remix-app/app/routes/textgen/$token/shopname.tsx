import {
  Text,
  Heading,
  Textarea,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  CircularProgress,
} from "@chakra-ui/react";

import { App } from "@sugggest/core/App";
import { ActionFunction, Form, json, redirect, useActionData, useTransition } from "remix";
import { ErrorAlert } from "~/components/sections/ErrorAlert";
import { Suggest } from "~/components/sections/Suggest";

type ActionData = {
  status: string;
  message?: string | undefined;
  results?: string[] | undefined;
};

const formatInfoMessage = (message?: string) => {
  switch (message) {
    case "TOKEN_NOT_FOUND":
      return "Votre lien n'est plus valide";
    case "MAX_DAILY_NB_GENERATION":
      return "Vous avez atteint le maximum de générations (10)";
    case "MIN_DELAY_BETWEEN_EACH_GENERATION":
      return "Doucement :) Il faut attendre 10s entre chaque génération";
    case "IA_MODEL_ERROR":
      return "Le modèle de l'IA n'est pas disponible";
    default:
      return "Une erreur est survenue";
  }
};

export const action: ActionFunction = async ({ request, params }) => {
  const body = await request.formData();
  const textinput = body.get("text")?.toString() || "";
  const token = params.token || "";
  if (token && textinput) {
    const result: ActionData = await App.textGen({
      token,
      input: textinput,
      context: "shop_name",
    });
    return json(result, { status: 200 });
  }
};

export default function TextGenIndexRoute() {
  const result = useActionData<ActionData>();
  const transition = useTransition();
  const busy = transition.submission
  return (
    <>
      <Heading as="h1" size="xl">
        Dites-nous quelques mots à propos de votre commerce
      </Heading>
      <Text fontSize="md">
        Ecrivez une ou deux phrases de contexte. Elles vont être analysées par
        l'IA pour en déduire des propositions de noms adaptées.
      </Text>
      <Form method="post">
        <Textarea
          name="text"
          minHeight={150}
          isFullWidth
          placeholder="Je vends des produits cosmétiques bio fabriqués à partir de plantes sauvages récoltées en Corse, pour ceux qui veulent prendre naturellement soin de leur corps."
        />
        <Button
          type="submit"
          colorScheme="primary"
          borderRadius="8px"
          py="4"
          px="4"
          lineHeight="1"
          mt="2"
          width="100%"
        >
          {busy ? <CircularProgress isIndeterminate color='primary' /> : "Trouver des idées de nom"} 
        </Button>
      </Form>
      {(function () {
        switch (result?.status) {
          case "success":
            return <Suggest items={result.results || []} />;
          case "error":
            return (
              <ErrorAlert
                status="error"
                title={formatInfoMessage(result?.message)}
              />
            );
          default:
            return null;
        }
      })()}
    </>
  );
}
