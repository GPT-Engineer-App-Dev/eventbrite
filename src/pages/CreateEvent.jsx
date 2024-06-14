import { useState } from "react";
import { Container, VStack, Heading, Input, Button, Textarea, useToast } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

const CreateEvent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  const handleCreateEvent = () => {
    const newEvent = {
      id: uuidv4(),
      title,
      description,
    };

    const events = JSON.parse(localStorage.getItem("events")) || [];
    events.push(newEvent);
    localStorage.setItem("events", JSON.stringify(events));

    toast({
      title: "Event created.",
      description: "Your event has been created successfully.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });

    navigate("/events");
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Heading as="h1" size="xl">Create Event</Heading>
        <Input placeholder="Event Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Textarea placeholder="Event Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <Button colorScheme="teal" onClick={handleCreateEvent}>Create Event</Button>
      </VStack>
    </Container>
  );
};

export default CreateEvent;