import { Container, Title, Text, Anchor } from "@mantine/core";
import { repository } from "../../../../../package.json";

export const HomePage = () => {
  return (
    <Container py="64px">
      <Title mb="24px">P5 Studio</Title>
      <Text>Welcome to P5 Studio,</Text>
      <Text>
        to get started please read the Getting Started informations on github:
      </Text>
      <Anchor href={repository} target="_blank">
        {repository}
      </Anchor>
    </Container>
  );
};
