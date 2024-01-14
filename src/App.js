import { useState } from 'react';
import './App.css';
import { Weather_Api_url, Weather_api_key } from './api';
import CurrentWeather from './components/current-weather/current-weather';
import Forecast from './components/forecast/forecast';
import Search from './components/search/search';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat,lon] = searchData.value.split(" ");

    const CurrentWeatherFetch = fetch(`${Weather_Api_url}/weather?lat=${lat}&lon=${lon}&appid=${Weather_api_key}&units=metric`);
    const forecastFetch = fetch(`${Weather_Api_url}/forecast?lat=${lat}&lon=${lon}&appid=${Weather_api_key}&units=metric`);

    Promise.all([CurrentWeatherFetch,forecastFetch])
    .then(async (response) => {
      const weatherResponse =  await response[0].json();
      const forecastResponse = await response[1].json();

      setCurrentWeather({city: searchData.label , ...weatherResponse});
      setForecast({city: searchData.label , ...forecastResponse});
    })
    .catch((err) => console.log(err));
  }
  
  console.log(forecast);

  return (
    <div className='container'>
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather}/>}
      {forecast && <Forecast data={forecast}/>}
    </div>
  )
}

export default App;