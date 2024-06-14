import { useState, useEffect } from "react";
import { Container, VStack, Heading, Input, Button, Textarea, useToast } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";

const EditEvent = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const events = JSON.parse(localStorage.getItem("events")) || [];
    const event = events.find(event => event.id === id);
    if (event) {
      setTitle(event.title);
      setDescription(event.description);
    }
  }, [id]);

  const handleUpdateEvent = () => {
    const events = JSON.parse(localStorage.getItem("events")) || [];
    const updatedEvents = events.map(event => 
      event.id === id ? { ...event, title, description } : event
    );
    localStorage.setItem("events", JSON.stringify(updatedEvents));

    toast({
      title: "Event updated.",
      description: "Your event has been updated successfully.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });

    navigate("/events");
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Heading as="h1" size="xl">Edit Event</Heading>
        <Input placeholder="Event Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Textarea placeholder="Event Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <Button colorScheme="teal" onClick={handleUpdateEvent}>Update Event</Button>
      </VStack>
    </Container>
  );
};

export default EditEvent;