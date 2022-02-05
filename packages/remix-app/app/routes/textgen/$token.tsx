import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Container,
  VStack,
} from "@chakra-ui/react";
import { Link, Outlet, useLoaderData, useParams } from "@remix-run/react";
import { json, LoaderFunction } from "remix";
import { App } from "@sugggest/core/App";
import { GetLeadStatsResult } from "@sugggest/core/domain/register/usecases/getLeadStats";
import { ErrorAlert } from "~/components/sections/ErrorAlert";

// Ici on requête sur le token pour voir :
// - Jusqu'à quand le token est valide
// - combien de générations ont été réalisées (et combien il en reste )

export const loader: LoaderFunction = async ({ params }) => {
  const token = params.token || "";
  const result = await App.getLeadStats({ token });
  return json(result);
};

const formatInfoMessage = (flags : {tooFrequentGeneration: boolean;
  tooManyGeneration: boolean;
  hasValidToken: boolean;}) => {
    switch(true) {
      case !flags.hasValidToken : return "Votre lien n'est plus valide"
      case flags.tooManyGeneration : return "Vous avez atteint le maximum de générations (10)"
      case flags.tooFrequentGeneration : return "Doucement :) Il faut attendre 10s entre chaque génération"
      default : ""       
    }
  }

export default function TokenRoute() {
  const data = useLoaderData<GetLeadStatsResult>();
  console.log(data);
  const errorMessage = data.status==="success" && formatInfoMessage(data)

  return (
    <Container maxW="2xl">
      <VStack spacing={8} align="stretch" mb="5rem">
        {/* Ici on pourrait proposer plusieurs générateurs : nom de boutiques, ... */}
        {data && data.status === "error" ? (
          <ErrorAlert
            status="error"
            title="Oups, il semble que ce lien ne soit pas valide."
            desc={
              <span>
                Cliquer <Link to="/signup">ici</Link> pour obtenir un nouveau
                lien.
              </span>
            }
          />
        ) : null}
        <Outlet />

        {data && data.status === "success" ? (
          <ErrorAlert
            status={errorMessage ? "error" : "success"}
            title={<span>{errorMessage}</span>}
            desc={
              <span>{data.generationCount} / 10 générations jusqu'au {new Date(data.validTokenUntil).toLocaleString()} </span>
            }
          />
        ) : null}
      </VStack>
    </Container>
  );
}
