import { Container, VStack } from "@chakra-ui/react";
import { ActionFunction, Outlet, redirect } from "remix";
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
  return (
    <Container maxW="2xl">
      <VStack spacing={8} align="stretch" mb="5rem">
        <Outlet />
      </VStack>
    </Container>
  );
}
