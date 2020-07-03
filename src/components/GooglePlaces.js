import React from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import { CityContext } from "../CityContext";
import "../styles/google-search.scss"


const PlacesAutocomplete = () => {
  const [cityContext, setCityContext] = React.useContext(CityContext)
  
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  });
  const ref = useOnclickOutside(() => {
    // When user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions();
  });

  const handleInput = (e) => {
    // Update the keyword of the input element
    setValue(e.target.value);

  };

  const handleSelect = ({ description }) => () => {
    // When user selects a place, we can replace the keyword without request data from API
    // by setting the second parameter as "false"
    setValue(description, false);
    clearSuggestions();

    // Get latitude and longitude via utility functions
    getGeocode({ address: description })
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        console.log("📍 Coordinates: ", { lat, lng });
      })
      .catch((error) => {
        console.log("Error: ", error);
      });

      // ! My own custom code added below:
      setCityContext(description);
  };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li key={id} onClick={handleSelect(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  return (
    <>
      <input
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="where are you located?"
          
          // ! My own custom code added below:
          onInput={e => setCityContext(e.target.value)}        
        />

        
      <div ref={ref}>
        {/* We can use the "status" to decide whether we should display the dropdown or not */}
        {status === "OK" && 
            <ul className="search-suggestion">
              {renderSuggestions()}
            </ul>
        }
      </div>
    </>
  );
};


export default PlacesAutocomplete