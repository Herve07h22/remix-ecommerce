import {
  Alert,
  AlertIcon,
  Box,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { ReactNode } from "react";

export const ErrorAlert: React.FC<{
  status: "error" | "warning" | "success";
  title: string | ReactNode;
  desc?: string | ReactNode;
}> = ({ status, title, desc }) => {
  return (
    <Alert status={status}>
      <AlertIcon />
      <Box>
        <AlertTitle>{title}</AlertTitle>

        {desc ? <AlertDescription>{desc}</AlertDescription> : null }
      </Box>
    </Alert>
  );
};
