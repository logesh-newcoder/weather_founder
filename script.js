const form = document.querySelector("form");
const cityInput = document.querySelector("#cityname");
const cityNameElement = document.querySelector(".city");
const climateElement = document.querySelector(".climate");
const temperatureElement = document.querySelector(".temperature");
const imgidElement = document.querySelector(".imgid");
const moistureElement = document.querySelector(".moisture");
const windElement = document.querySelector(".wind");

const API_KEY = "f2ed9ddac844d9e25d7e420c39e8bc5c";

async function fetchWeather(city) {

    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("City not found or API error.");
        }
        
        const data = await response.json();
        updateUI(data);
    } 
    
    catch (error) {
        alert(error.message);
    }

}

function updateUI(data) {
    const { name, weather, main, wind } = data;

    console.log(data);
    cityNameElement.textContent = name;
    climateElement.textContent = weather[0].main;
    temperatureElement.textContent = `${Math.round(main.temp)}°C`;
    imgidElement.textContent = getWeatherIcon(weather[0].id);
    moistureElement.textContent = `${main.humidity}% Humidity`;
    windElement.textContent = `${wind.speed} km/h Wind`;
}

function getWeatherIcon(condition) {
    switch (true) {
        case (condition >= 200 && condition < 300): 
            return "⛈️";
        case (condition >= 300 && condition < 500): 
            return "🌦️";
        case (condition >= 500 && condition < 600): 
            return "🌧️";
        case (condition >= 600 && condition < 700): 
            return "❄️";
        case (condition >= 700 && condition < 800): 
            return "🌫️";
        case (condition === 800): // Clear sky
            return "☀️";
        case (condition >= 801 && condition < 900): 
            return "☁️";
        default:
            return "?"; 
    }
}

form.addEventListener("submit", (event) => {
    event.preventDefault(); 
    const city = cityInput.value.trim();

    if (city) {
        fetchWeather(city);
    } else {
        alert("Please enter a valid city name.");
    }
});

