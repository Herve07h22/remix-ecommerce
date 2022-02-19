import { Button, CircularProgress, Center } from "@chakra-ui/react";

export const SubmitButton: React.FC<{
  loading: boolean;
  label: string;
}> = ({ loading, label }) => {
  return loading ? (
    <Center width="100%" mt="2">
      <CircularProgress isIndeterminate size="20px" />
    </Center>
  ) : (
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
      {label}
    </Button>
  );
};
