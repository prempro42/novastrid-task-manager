import { APIProvider } from "@vis.gl/react-google-maps"
import Autocomplete from "components/Autocomplete"
import CustomAutocomplete from "components/CustomAutoComplete"
import GoogleSearch from "components/GoogleSearch"
import TaskManager from "components/TaskManager/TaskManager"

const App = () => {
  return (
    <>
      <CustomAutocomplete />
      {/* <APIProvider apiKey={""}>
        <TaskManager />;
        <GoogleSearch />;
        <Autocomplete />;
      </APIProvider> */}
    </>
  )
}

export default App

/* https://developers.google.com/maps/documentation/javascript/examples/rgm-autocomplete
https://www.npmjs.com/package/@vis.gl/react-google-maps */
