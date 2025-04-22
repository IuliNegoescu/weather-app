async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    const apiKey = "EGVDF7U5W9X3FX2YMM65E7XAC";
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${apiKey}&contentType=json`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (data && data.currentConditions) {
        const weather = data.currentConditions;
        const temp = Math.round(weather.temp);
        const humidity = weather.humidity;
        const windSpeed = weather.windspeed;
  
        let icon = "☁️"; // default
        if (weather.conditions.includes("Clear")) icon = "☀️";
        else if (weather.conditions.includes("Rain")) icon = "🌧️";
        else if (weather.conditions.includes("Snow")) icon = "❄️";
        else if (weather.conditions.includes("Thunderstorm")) icon = "⛈️";
        else if (weather.conditions.includes("Fog") || weather.conditions.includes("Mist")) icon = "🌫️";
  
        document.getElementById("weatherResult").innerHTML = `
          <div class="icon">${icon}</div>
          <h2>${temp}°C</h2>
          <p class="city">${data.resolvedAddress}</p>
          <div class="stats">
            <div>💧 ${humidity}%<br><span>Humidity</span></div>
            <div>💨 ${windSpeed} km/h<br><span>Wind Speed</span></div>
          </div>
        `;
      } else {
        alert("City not found!");
      }
    } catch (err) {
      alert("Something went wrong");
      console.error(err);
    }
  }
  