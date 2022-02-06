import {
  Text,
  Heading,
  Textarea,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";

import { App } from "@sugggest/core/App";
import { ActionFunction, Form, json, redirect, useActionData } from "remix";
import { ErrorAlert } from "~/components/sections/ErrorAlert";
import { Suggest } from "~/components/sections/Suggest";

type ActionData = {
  status: string;
  message?: string | undefined;
  results?: string[] | undefined;
};

export const action: ActionFunction = async ({ request, params }) => {
  const body = await request.formData();
  const textinput = body.get("textinput")?.toString() || "";
  const token = params.token || "";
  const result: ActionData = await App.textGen({
    token,
    input: textinput,
    context: "shop_name",
  });
  return json(result, { status: 200 });
};

export default function TextGenIndexRoute() {
  const result = useActionData<ActionData>();
  console.log("result:", result);
  return (
    <>
      <Heading as="h1" size="xl">
        Dites-nous quelques mots à propos de votre commerce
      </Heading>
      <Text fontSize="md">
        Ecrivez une ou deux phrases de contexte. Elles vont être analysées par
        l'IA pour en déduire des propositions de noms adaptées.
        {JSON.stringify(result)}
      </Text>
      <Form method="post">
        <Textarea
          name="text"
          minHeight={150}
          isFullWidth
          placeholder="Je vends de produits cosmétiques bio fabriqués à partir de plantes sauvages récoltées en Corse, pour ceux qui veulent prendre naturellement soin de leur corps."
        />
        <Button
          type="submit"
          colorScheme="primary"
          borderRadius="8px"
          py="4"
          px="4"
          lineHeight="1"
        >
          Trouver des idées de nom
        </Button>
      </Form>
      {(function () {
        switch (result?.status) {
          case "success":
            return <Suggest items={result.results || []} />;
          case "error":
            return <ErrorAlert status="error" title={result?.message} />;
          default:
            return null;
        }
      })()}
    </>
  );
}
