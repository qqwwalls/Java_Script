"use strict";

const cl = console.log;
const API_KEY = "0006fae8c55ab1d0d3917f71859c8058";

const weatherForm = document.getElementById("weather-form");
const cityInput = document.getElementById("city-input");
const countrySelect = document.getElementById("country-select");
const resultBlock = document.getElementById("weather-result");

if (weatherForm) {
  weatherForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const city = cityInput.value.trim();
    const countryCode = countrySelect ? countrySelect.value : "";

    // 1. Валідація назви міста (тільки літери, пробіли та дефіси)
    const cityRegex = /^[a-zA-Zа-яА-ЯіІїЇєЄґҐ\s-]+$/u;
    
    if (!city || !cityRegex.test(city)) {
      resultBlock.innerHTML = `<p class="error">Помилка: введіть коректну назву міста (без цифр та символів)</p>`;
      return;
    }

    resultBlock.innerHTML = "<p>Завантаження...</p>";

    try {
      // 1. Геокодування
      // Формат запиту: q={city name},{country code}
      const searchQuery = countryCode ? `${city},${countryCode}` : city;
      const geoURL = `https://api.openweathermap.org/geo/1.0/direct?q=${searchQuery}&limit=1&appid=${API_KEY}`;
      const geoResponse = await fetch(geoURL);

      if (!geoResponse.ok) {
        const errorData = await geoResponse.json();
        cl("Деталі помилки від API:", errorData);
        throw new Error(errorData.message || `Помилка сервера: ${geoResponse.status}`);
      }

      const geoData = await geoResponse.json();
      if (geoData.length === 0) throw new Error("Місто не знайдено");

      const { lat, lon, name, country } = geoData[0];

      // 2. Отримання погоди
      const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}&lang=uk`;
      const weatherResponse = await fetch(weatherURL);

      if (!weatherResponse.ok) {
        const errorData = await weatherResponse.json();
        throw new Error(errorData.message || "Не вдалося отримати дані про погоду");
      }

      const weatherData = await weatherResponse.json();

      // 3. Відображення
      const temp = Math.round(weatherData.main.temp);
      const desc = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;

      resultBlock.innerHTML = `
          <div class="city-name">${name}, ${country}</div>
          <div class="temp">${temp}°C</div>
          <div class="description">
              <img src="https://openweathermap.org/img/wn/${icon}.png" alt="icon">
              ${desc}
          </div>
          <p>Відчувається як: ${Math.round(weatherData.main.feels_like)}°C</p>
      `;
    } catch (err) {
      cl("Error detail:", err);
      resultBlock.innerHTML = `<p class="error">Помилка: ${err.message}</p>`;
    }
  });
}