import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useRef, useState } from "react";

function Autocomplete() {
  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>();
  const [searchInput, setSearchInput] = useState<string | null>("");
  // const [suggestions, setSuggestions] = useState<string[]>();

  const [placeAutocomplete, setPlaceAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const places = useMapsLibrary("places");

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options = {
      fields: ["geometry", "name", "formatted_address"],
    };

    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    placeAutocomplete.addListener("place_changed", () => {
      setSelectedPlace(placeAutocomplete.getPlace());
      setSearchInput(placeAutocomplete.getPlace().formatted_address || "");
      console.log(placeAutocomplete.getPlace());
    });
  }, [setSelectedPlace, placeAutocomplete]);

  return (
    <Box maxW="md" mx="auto" p={4} bg="white" borderRadius="md" boxShadow="md">
      <Flex justify="space-between" mb={4}>
        <Input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search by place name..."
          w="full"
          p={2}
          ref={inputRef}
          fontSize="sm"
          color="gray.700"
          borderRadius="lg"
          focusBorderColor="gray.600"
        />
        <Button
          onClick={(e) => setSearchInput("")}
          ml={2}
          bg="green.500"
          _hover={{ bg: "green.700" }}
          color="white"
          fontWeight="bold"
          py={2}
          px={4}
          borderRadius="md"
        >
          clear
        </Button>
      </Flex>
      <Text>{selectedPlace ? `${JSON.stringify(selectedPlace)}` : ""}</Text>
    </Box>
  );
}

export default Autocomplete;
