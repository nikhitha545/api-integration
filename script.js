async function getWeather() {
  const lat = document.getElementById("latInput").value.trim();
  const lon = document.getElementById("lonInput").value.trim();
  const apiKey = "3501939c59d899d77aab20f916c3eb4d"; // ← Replace this with your real OpenWeatherMap API key

  const resultBox = document.getElementById("weatherResult");
  resultBox.innerHTML = "Loading...";

  if (!lat || !lon) {
    resultBox.innerHTML = "<p>Please enter both latitude and longitude.</p>";
    return;
  }

  // ✅ URL must be defined inside the function
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Location not found");

    const data = await response.json();

    resultBox.innerHTML = `
      <h2>${data.name || "Unknown Location"}, ${data.sys.country}</h2>
      <p>Temperature: ${data.main.temp}°C</p>
      <p>Weather: ${data.weather[0].description}</p>
      <p>Humidity: ${data.main.humidity}%</p>
    `;
  } catch (err) {
    resultBox.innerHTML = `<p>Error: ${err.message}</p>`;
  }
}

