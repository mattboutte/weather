import React, { useState } from 'react';
import './App.css'
import emojis from './weather-object';

export default function App() {

  interface Payload {
    location: { name: string },
    current: { temp_f: number, temp_c: number, condition: { text: string } },
  }





  const [input, setInput] = useState("");
  const [city, setCity] = useState("");
  const [fahrenheit, setFahrenheit] = useState(NaN);
  const [celsius, setCelsius] = useState(NaN);
  const [condition, setCondition] = useState("");
  const [currentScale, setScale] = useState("F");
  const [currentMode, setMode] = useState("Text");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }

  const setState = (newState: Payload) => {
    setCity(newState['location']['name']);
    setCelsius(newState['current']['temp_c']);
    setFahrenheit(newState['current']['temp_f']);
    setCondition(newState['current']['condition']['text']);
  };

  const getTempText = () => {
    if (currentScale === "F") {
      return isNaN(fahrenheit) ? "" : `Temperature: ${fahrenheit}°F`;
    }
    else {
      return isNaN(celsius) ? "" : `Temperature: ${celsius}°C`;
    }
  }

  const getConditionText = () => {
    if (currentMode === "Text") {
      return condition === "" ? "" : `Current conditions: ${condition}`;
    }
    else {
      let emoji = condition.toLowerCase() in emojis ? emojis[condition.toLowerCase()] : '❓'; 
      return condition === "" ? "" : `Current conditions: ${emoji}`;
    }
  }

  /*
    const handleSubmit = () => {
      const url: string = `http://api.weatherapi.com/v1/current.json?key=595209f47db94879a00182126243006&q=${input}&aqi=no`
      
      fetch(url)
        .then(response => response.json())
        .then(json => setState(json))
        .catch(error => console.log(error));
  
      setInput('');
    }
      */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // This will work for both form submit and button click events
    const url: string = `https://api.weatherapi.com/v1/current.json?key=595209f47db94879a00182126243006&q=${input}&aqi=no`;
    fetch(url)
      .then(response => response.json())
      .then(json => setState(json))
      .catch(error => console.log(error));
    setInput('');
  };

  return (
    <>
      <div className="container">

        <h1>Hello, {city === "" ? "weather" : city}!</h1>

        <div className="form">

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Enter a city"
            />
            {/* <button onClick={handleSubmit}>Submit</button> */}
            <button type="submit">Submit</button>

          </form>

        </div>

        <div className="output" onClick={() => currentScale === "F" ? setScale("C") : setScale("F")}>
          {getTempText()}
        </div>
        <div className="output" onClick={() => currentMode === "Text" ? setMode("Emoji") : setMode("Text")}>
          {getConditionText()}
        </div>


      </div>
    </>
  );

}
