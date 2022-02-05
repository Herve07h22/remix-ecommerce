import { Container, VStack } from "@chakra-ui/react";
import { ActionFunction, Outlet, redirect } from "remix";
import { App } from "@sugggest/core/App";

export const action: ActionFunction = async ({ request }) => {
    const body = await request.formData();
    const email = body.get("title")?.toString()
    const result = await App.getAToken({ email: email || "" });
    if (result.status==="success") return redirect(`/signup/sent?token=${result.token}`);
    return redirect("/signup/error")
  }

  
export default function SignupRoute () {

    return (
        <Container maxW="2xl">
        <VStack spacing={8} align="stretch" mb="5rem">
            <Outlet />
        </VStack>
        </Container>
    )
}