import "./App.css";
import Dropdown from "./components/Dropdown/Dropdown";

function App() {
  const options = [
    {
      id: "monday",
      label: "Monday",
    },
    {
      id: "tuesday",
      label: "Tuesday",
    },
    {
      id: "wednesday",
      label: "Wednesday",
    },
    {
      id: "thursday",
      label: "Thursday",
    },
    {
      id: "friday",
      label: "Friday",
    },
    {
      id: "saturday",
      label: "Saturday",
    },
    {
      id: "sunday",
      label: "Sunday",
    },
  ];

  return (
    <div className="App">
      <Dropdown options={options} />
      <Dropdown options={options} placeholder={"Select (Multi)"} isMulti />
    </div>
  );
}

export default App;
