// ------------------------
// Select DOM elements
// ------------------------
const input = document.querySelector("#cityInput");
const button = document.querySelector("#searchBtn");
const result = document.querySelector("#weatherResult");

// ------------------------
// Event listeners
// ------------------------
button.addEventListener("click", getWeather);

input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    getWeather();
  }
});

// ------------------------
// Main function
// ------------------------
async function getWeather() {
  try {
    const city = input.value;
    const apiKey = "778fb5f32120a15fb4fe652ae73486cc"; // <-- Replace with your actual API key

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await fetch(url);
    const data = await response.json();

    // Handle city not found
    if (data.cod === "404") {
      result.innerHTML = "City not found";
      document.body.style.background = "#1e293b"; // default background
      document.body.style.color = "#fff"; // default text color
      return;
    }

    // Extract weather data
    const cityName = data.name;
    const temperature = data.main.temp;
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;

    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    // Display weather
    result.innerHTML = `
      <h2>${cityName}</h2>
      <img src="${iconUrl}" alt="${description}">
      <p>${temperature}°C</p>
      <p>${description}</p>
    `;

    // Change background color based on weather
    if (description.includes("clear")) {
      document.body.style.background = "#fcd34d"; // sunny yellow
      document.body.style.color = "#000";
    } else if (description.includes("cloud")) {
      document.body.style.background = "#64748b"; // grey clouds
      document.body.style.color = "#fff";
    } else if (description.includes("rain")) {
      document.body.style.background = "#3b82f6"; // blue rain
      document.body.style.color = "#fff";
    } else if (description.includes("snow")) {
      document.body.style.background = "#ffffff"; // white snow
      document.body.style.color = "#000";
    } else {
      document.body.style.background = "#1e293b"; // default dark
      document.body.style.color = "#fff";
    }

  } catch (error) {
    result.innerHTML = "Something went wrong";
    console.log(error);
    document.body.style.background = "#1e293b"; // reset background
    document.body.style.color = "#fff"; // reset text
  }
}