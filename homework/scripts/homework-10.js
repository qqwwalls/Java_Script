"use strict";

const translations = {
  uk: {
    themeLabel: "Тема:",
    dark: "Темна",
    light: "Світла",
    languageLabel: "Мова:",
    ukrainianLanguage: "Українська",
    englishLanguage: "English",
    title: "Реєстраційна форма",
    description: "Приклад сучасної HTML форми з різними елементами",
    firstName: "Ім'я",
    firstNamePlaceholder: "Введіть ім'я",
    lastName: "Прізвище",
    lastNamePlaceholder: "Введіть прізвище",
    email: "Email",
    emailPlaceholder: "example@gmail.com",
    password: "Пароль",
    passwordPlaceholder: "********",
    dateOfBirth: "Дата народження",
    phone: "Телефон",
    phonePlaceholder: "+380...",
    country: "Країна",
    countryUkraine: "Україна",
    countryPoland: "Польща",
    countryGermany: "Німеччина",
    countryUsa: "США",
    gender: "Стать",
    genderMale: "Чоловік",
    genderFemale: "Жінка",
    skills: "Ваші навички",
    experience: "Рівень досвіду",
    fileUpload: "Завантажити файл",
    comment: "Коментар",
    commentPlaceholder: "Напишіть щось...",
    agreement: "Я погоджуюсь з умовами",
    submit: "Відправити",
    reset: "Очистити"
  },
  en: {
    themeLabel: "Theme:",
    dark: "Dark",
    light: "Light",
    languageLabel: "Language:",
    ukrainianLanguage: "Ukrainian",
    englishLanguage: "English",
    title: "Registration Form",
    description: "An example of a modern HTML form with various elements",
    firstName: "First Name",
    firstNamePlaceholder: "Enter your first name",
    lastName: "Last Name",
    lastNamePlaceholder: "Enter your last name",
    email: "Email",
    emailPlaceholder: "example@gmail.com",
    password: "Password",
    passwordPlaceholder: "********",
    dateOfBirth: "Date of Birth",
    phone: "Phone",
    phonePlaceholder: "+380...",
    country: "Country",
    countryUkraine: "Ukraine",
    countryPoland: "Poland",
    countryGermany: "Germany",
    countryUsa: "USA",
    gender: "Gender",
    genderMale: "Male",
    genderFemale: "Female",
    skills: "Your Skills",
    experience: "Experience Level",
    fileUpload: "Upload File",
    comment: "Comment",
    commentPlaceholder: "Write something...",
    agreement: "I agree to the terms",
    submit: "Submit",
    reset: "Reset"
  }
};

function setCookie(cname, cvalue, days) {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + encodeURIComponent(cvalue) + ";" + expires + ";path=/";
}

function getCookie(cname) {
  const name = cname + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1);
    if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
  }
  return "";
}

const themeSelect = document.getElementById("theme-select");
const langSelect = document.getElementById("lang-select");

function applyTheme(themeValue) {
  if (themeValue === "light") {
    document.body.classList.add("light-theme");
  } else {
    document.body.classList.remove("light-theme");
  }
}

function applyLanguage(langValue) {
  const dict = translations[langValue];
  if (!dict) return;

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) el.innerText = dict[key];
  });

  document.querySelectorAll("[data-i18n-ph]").forEach(el => {
    const key = el.getAttribute("data-i18n-ph");
    if (dict[key]) el.placeholder = dict[key];
  });
}

function init() {
  const savedTheme = getCookie("theme") || "dark";
  const savedLang = getCookie("lang") || "uk";

  themeSelect.value = savedTheme;
  langSelect.value = savedLang;

  applyTheme(savedTheme);
  applyLanguage(savedLang);
}

themeSelect.addEventListener("change", (e) => {
  const theme = e.target.value;
  setCookie("theme", theme, 30);
  applyTheme(theme);
});

langSelect.addEventListener("change", (e) => {
  const lang = e.target.value;
  setCookie("lang", lang, 30);
  applyLanguage(lang);
});

init();