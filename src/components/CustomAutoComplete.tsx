import React, { useState, useRef, ChangeEvent } from "react"
import { LoadScript, useLoadScript } from "@react-google-maps/api"

interface Suggestion {
  description: string
  place_id: string
}

// Correctly typing the libraries array
const libraries: ("places" | "drawing" | "geometry" | "visualization")[] = [
  "places",
]

const CustomAutocomplete: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("")
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const autocompleteService =
    useRef<google.maps.places.AutocompleteService | null>(null)
  const sessionToken =
    useRef<google.maps.places.AutocompleteSessionToken | null>(null)

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "",
    libraries: libraries,
  })

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)

    if (value.length > 0 && isLoaded) {
      if (!autocompleteService.current) {
        autocompleteService.current =
          new window.google.maps.places.AutocompleteService()
        sessionToken.current =
          new window.google.maps.places.AutocompleteSessionToken()
      }

      // Get autocomplete predictions
      autocompleteService.current.getPlacePredictions(
        {
          input: value,
          sessionToken: sessionToken.current!,
        },
        (predictions, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            setSuggestions(predictions || [])
          }
        }
      )
    } else {
      setSuggestions([])
    }
  }

  const handleSuggestionClick = (suggestion: Suggestion) => {
    setInputValue(suggestion.description)
    setSuggestions([]) // Clear the suggestions after selection
  }

  if (!isLoaded) {
    return <div>Loading...</div> // Show loading state while the script is loading
  }

  return (
    <div style={{ position: "relative", width: "300px" }}>
      <input
        type="text"
        placeholder="Search places..."
        value={inputValue}
        onChange={handleInputChange}
        style={{ width: "100%", padding: "5px" }}
      />
      {suggestions.length > 0 && (
        <ul
          style={{
            position: "absolute",
            top: "40px",
            left: "0",
            right: "0",
            maxHeight: "150px",
            overflowY: "auto",
            background: "#fff",
            border: "1px solid #ccc",
            zIndex: 1000,
            listStyle: "none",
            padding: "0",
            margin: "0",
          }}
        >
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.place_id}
              onClick={() => handleSuggestionClick(suggestion)}
              style={{
                padding: "10px",
                cursor: "pointer",
                borderBottom: "1px solid #eee",
              }}
            >
              {suggestion.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default CustomAutocomplete
