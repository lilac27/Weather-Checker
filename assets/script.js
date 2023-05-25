// Function to fetch weather forecast for a given city
async function fetchWeatherForecast(city) {
    const apiKey = 'bef51ab856b8754ff342fe17908eb5cc'; 
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${apiKey}`;
  
    try {
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error('Unable to gather weather data.');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  
  // Function to display weather forecast
  function displayWeatherForecast(data) {
    const forecastContainer = document.getElementById('weather-forecast');
    // Clear previous forecast data
    forecastContainer.innerHTML = '';
  
    // Extract necessary information from the data
    const city = data.city.name;
    const forecastList = data.list;
  
    // Create HTML elements to display the forecast information
    const heading = document.createElement('h2');
    heading.textContent = `Weather Forecast for ${city}`;
    forecastContainer.appendChild(heading);
  
    const forecastListContainer = document.createElement('ul');
    forecastListContainer.classList.add('forecast-list');
    forecastContainer.appendChild(forecastListContainer);
  
    // Iterate over the forecast list and display each forecast item
    forecastList.forEach(forecast => {
      const forecastItem = document.createElement('li');
      forecastItem.classList.add('forecast-item');
  
      const date = new Date(forecast.dt_txt);
      const dateString = date.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });
  
      const temperature = Math.round(forecast.main.temp - 273.15); // Convert temperature from Kelvin to Celsius
      const wind = forecast.wind.speed;
      const humidity = forecast.main.humidity;
  
      forecastItem.innerHTML = `
        <p>Date: ${dateString}</p>
        <p>Temperature: ${temperature} °C</p>
        <p>Wind: ${wind} m/s</p>
        <p>Humidity: ${humidity}%</p>
      `;
  
      forecastListContainer.appendChild(forecastItem);
    });
  
    // Uncomment the following code if you still want to display the raw forecast data as JSON
    /*
    const forecastJSON = JSON.stringify(data, null, 2);
    forecastContainer.innerText = forecastJSON;
    */
  }
  
  // Function to handle search button click
  function handleSearch() {
    const searchBar = document.getElementById('search-bar');
    const city = searchBar.value.trim();
  
    if (city) {
      fetchWeatherForecast(city)
        .then
  