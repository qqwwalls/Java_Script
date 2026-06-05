"use strict";

const cl = console.log;
const API_KEY = "0006fae8c55ab1d0d3917f71859c8058"; // Ключ з lesson 13

const weatherForm = document.getElementById("weather-form");
const countrySelect = document.getElementById("country-select");
const citySelect = document.getElementById("city-select");
const resultBlock = document.getElementById("weather-result");
const submitBtn = document.getElementById("submit-btn");

let countriesData = [];

// 1. Отримуємо список країн і міст
// Використовуємо безкоштовне публічне API без токенів для країн та міст
async function loadCountriesAndCities() {
  try {
    const response = await fetch("https://countriesnow.space/api/v0.1/countries");
    const json = await response.json();
    
    if (json.error) {
      throw new Error("API повернуло помилку");
    }

    countriesData = json.data;

    // Очищуємо та заповнюємо список країн
    countrySelect.innerHTML = '<option value="">Оберіть країну...</option>';
    
    // Сортуємо країни за алфавітом
    countriesData.sort((a, b) => a.country.localeCompare(b.country));

    countriesData.forEach((countryData, index) => {
      const option = document.createElement("option");
      option.value = index; 
      option.textContent = countryData.country;
      countrySelect.appendChild(option);
    });

  } catch (err) {
    cl("Помилка при завантаженні країн:", err);
    countrySelect.innerHTML = '<option value="">Помилка завантаження</option>';
    resultBlock.innerHTML = `<p class="error">Не вдалося завантажити список країн. Спробуйте пізніше.</p>`;
  }
}

// 2. Обробляємо вибір країни
countrySelect.addEventListener("change", () => {
  const selectedIndex = countrySelect.value;
  
  if (selectedIndex === "") {
    citySelect.innerHTML = '<option value="">Оберіть країну спочатку</option>';
    citySelect.disabled = true;
    submitBtn.disabled = true;
    return;
  }

  const cities = countriesData[selectedIndex].cities;
  
  citySelect.innerHTML = '<option value="">Оберіть місто...</option>';
  
  if (!cities || cities.length === 0) {
    citySelect.innerHTML = '<option value="">Немає міст для цієї країни</option>';
    citySelect.disabled = true;
    submitBtn.disabled = true;
    return;
  }

  cities.forEach((city) => {
    const option = document.createElement("option");
    option.value = city;
    option.textContent = city;
    citySelect.appendChild(option);
  });

  citySelect.disabled = false;
  submitBtn.disabled = true; // Буде активно лише коли оберуть місто
});

// Розблокувати кнопку лише коли обране місто
citySelect.addEventListener("change", () => {
  submitBtn.disabled = citySelect.value === "";
});

// 3. Обробляємо форму
weatherForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const selectedCountryIndex = countrySelect.value;
  const city = citySelect.value;

  if (selectedCountryIndex === "" || !city) {
    return;
  }

  const countryData = countriesData[selectedCountryIndex];
  const countryName = countryData.country;

  resultBlock.innerHTML = "<p class='loading'>Завантаження погоди...</p>";

  try {
    // Шукаємо координати тільки за містом (оскільки API не повертає iso2)
    const geoURL = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${API_KEY}`;
    const geoResponse = await fetch(geoURL);

    if (!geoResponse.ok) throw new Error("Помилка доступу до API геокодування");
    const geoData = await geoResponse.json();
    
    if (geoData.length === 0) throw new Error("Місто не знайдено на карті погоди");

    const { lat, lon } = geoData[0];

    // Отримуємо погоду (в цельсіях)
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}&lang=uk`;
    const weatherResponse = await fetch(weatherURL);

    if (!weatherResponse.ok) throw new Error("Не вдалося отримати дані про погоду");
    const weatherData = await weatherResponse.json();

    const temp = Math.round(weatherData.main.temp);
    const desc = weatherData.weather[0].description;
    const mainWeather = weatherData.weather[0].main; 

    // Встановлюємо кастомний малюнок (сонце, хмари або дощ)
    let customImgUrl = "";
    if (mainWeather === "Clear") {
      customImgUrl = "https://openweathermap.org/img/wn/01d@4x.png"; // Сонце
    } else if (mainWeather === "Clouds") {
      customImgUrl = "https://openweathermap.org/img/wn/03d@4x.png"; // Хмари
    } else if (mainWeather === "Rain" || mainWeather === "Drizzle" || mainWeather === "Thunderstorm") {
      customImgUrl = "https://openweathermap.org/img/wn/09d@4x.png"; // Дощ
    } else if (mainWeather === "Snow") {
      customImgUrl = "https://openweathermap.org/img/wn/13d@4x.png"; // Сніг
    } else {
      // Для інших станів (туман тощо) використовуємо стандартну іконку
      customImgUrl = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`;
    }

    resultBlock.innerHTML = `
        <div class="city-name">${city}, ${countryName}</div>
        <div class="temp">${temp}°C</div>
        <div class="description">
            <img src="${customImgUrl}" alt="${desc}" class="weather-img">
            ${desc}
        </div>
        <p>Відчувається як: ${Math.round(weatherData.main.feels_like)}°C</p>
    `;
  } catch (err) {
    cl("Error:", err);
    resultBlock.innerHTML = `<p class="error">${err.message}</p>`;
  }
});

// Запускаємо при старті
loadCountriesAndCities();