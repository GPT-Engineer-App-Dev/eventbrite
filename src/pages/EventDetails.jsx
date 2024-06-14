import { useState, useEffect } from "react";
import { Container, VStack, Heading, Text, Button, Box, useToast } from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const events = JSON.parse(localStorage.getItem("events")) || [];
    const event = events.find(event => event.id === id);
    if (event) {
      setEvent(event);
    } else {
      toast({
        title: "Event not found.",
        description: "The event you are looking for does not exist.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      navigate("/events");
    }
  }, [id, navigate, toast]);

  if (!event) {
    return null;
  }

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Heading as="h1" size="xl">{event.title}</Heading>
        <Text>{event.description}</Text>
        <Button colorScheme="teal" onClick={() => navigate("/events")}>Back to Events</Button>
      </VStack>
    </Container>
  );
};

export default EventDetails;