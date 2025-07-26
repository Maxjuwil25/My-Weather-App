const searchForm = document.getElementById('search-form');
const cityContainer = document.getElementById('city-container');
const temperatureContainer = document.getElementById('temperature-container');
const weatherContainer = document.getElementById('weather-container');

const cityInput = document.getElementById('city-input');
const description = document.getElementById('description-container');

async function getCurrentWeather(city) {
    const apikey = 'd8856f9b10d77be58d1aec1a416942d5';
    const url = 
    `https://api.openweathermap.org/data/2.5/weather` +
    `?q=${encodeURIComponent(city)}` +
    `&units=metric` +
    `&appid=${apikey}`;

    console.log(url)
    
    try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Weather fetch failed: ${response.status} `);
            }
            const data = await response.json();
            return data;
            } catch (err) {
                console.error('Fetch failed:', err);
                throw err;
            }
}

document.getElementById('search-form')
    .addEventListener('submit', async e => {
        e.preventDefault();
        const city = document.getElementById('city-input').value.trim();
        if (!city) return;
        try {
            const weatherData = await getCurrentWeather(city);
            /* here we display weather with this data string */
            displayCurrentWeather(weatherData);
        } catch (err) {
            alert(err.message);
        }
    })

function displayCurrentWeather(data) {
    const cityName = data.name;
    const temp     = data.main.temp;
    const desc     = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    document.getElementById('city-container').textContent = data.name;
    document.getElementById('temperature-container').textContent = `${Math.round(data.main.temp)}°C`;
    document.getElementById('description-container').textContent = data.weather[0].description;
    
    const descriptionContainer = document.getElementById('weather-container');
    descriptionContainer.innerHTML = '';
    const iconImg = document.createElement('img');
    iconImg.src = iconUrl;
    iconImg.alt = data.weather[0].description;
    document.getElementById('weather-container').appendChild(iconImg);
}


/* https://api.openweathermap.org/data/2.5/weather?q={CITY}&units=metric&appid=d8856f9b10d77be58d1aec1a416942d5
 */
