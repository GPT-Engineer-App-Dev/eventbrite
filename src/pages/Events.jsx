import { useState, useEffect } from "react";
import { Container, VStack, Heading, Text, Button, Box, HStack, useToast } from "@chakra-ui/react";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Events = () => {
  const [events, setEvents] = useState([]);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    setEvents(storedEvents);
  }, []);

  const handleDeleteEvent = (id) => {
    const updatedEvents = events.filter(event => event.id !== id);
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));

    toast({
      title: "Event deleted.",
      description: "Your event has been deleted successfully.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const handleEditEvent = (id) => {
    navigate(`/edit-event/${id}`);
  };

  const handleViewEventDetails = (id) => {
    navigate(`/event-details/${id}`);
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Heading as="h1" size="xl">Events</Heading>
        {events.length === 0 ? (
          <Text>No events available. Create one!</Text>
        ) : (
          events.map(event => (
            <Box key={event.id} p={4} borderWidth="1px" borderRadius="lg" width="100%">
              <Heading as="h2" size="md">{event.title}</Heading>
              <Text mt={2}>{event.description}</Text>
              <HStack spacing={4} mt={4}>
                <Button leftIcon={<FaEye />} colorScheme="green" onClick={() => handleViewEventDetails(event.id)}>View Details</Button>
                <Button leftIcon={<FaEdit />} colorScheme="blue" onClick={() => handleEditEvent(event.id)}>Edit</Button>
                <Button leftIcon={<FaTrash />} colorScheme="red" onClick={() => handleDeleteEvent(event.id)}>Delete</Button>
              </HStack>
            </Box>
          ))
        )}
      </VStack>
    </Container>
  );
};

export default Events;