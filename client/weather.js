document.getElementById('getWeather').addEventListener('click', async () => {
    const city = document.getElementById('city').value;
    const response = await fetch(`http://localhost:5000/api/weather?city=${city}`); // Use full URL

    if (!response.ok) {
        document.getElementById('weatherResult').innerText = 'Error fetching weather data.';
        return;
    }

    const data = await response.json();
    displayWeather(data);
});


function displayWeather(data) {
    const weatherResult = document.getElementById('weatherResult');
    weatherResult.innerHTML = `
        <h2>Weather in ${data.name}, ${data.sys.country}</h2>
        <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
        <p><strong>Weather:</strong> ${data.weather[0].description}</p>
        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
    `;
}
