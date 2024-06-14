import { Container, VStack, Heading, Text, Button, Box, HStack } from "@chakra-ui/react";
import { FaCalendarPlus, FaCalendarCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={8}>
        <Heading as="h1" size="2xl" textAlign="center">Events Management App</Heading>
        <Text fontSize="lg" textAlign="center">Manage your events efficiently and effortlessly.</Text>
        <HStack spacing={4}>
          <Button leftIcon={<FaCalendarPlus />} colorScheme="teal" size="lg" onClick={() => navigate("/create-event")}>
            Create Event
          </Button>
          <Button leftIcon={<FaCalendarCheck />} colorScheme="blue" size="lg" onClick={() => navigate("/events")}>
            View Events
          </Button>
        </HStack>
      </VStack>
    </Container>
  );
};

export default Index;