"use strict";

const translations = {
  uk: {
    theme_label: "Тема:",
    dark: "Темна",
    light: "Світла",
    lang_label: "Мова:",
    uk_lang: "Українська",
    en_lang: "English",
    title: "Реєстраційна форма",
    desc: "Приклад сучасної HTML форми з різними елементами",
    fname: "Ім'я",
    fname_ph: "Введіть ім'я",
    lname: "Прізвище",
    lname_ph: "Введіть прізвище",
    email: "Email",
    email_ph: "example@gmail.com",
    pwd: "Пароль",
    pwd_ph: "********",
    dob: "Дата народження",
    phone: "Телефон",
    phone_ph: "+380...",
    country: "Країна",
    c_uk: "Україна",
    c_pl: "Польща",
    c_ge: "Німеччина",
    c_usa: "США",
    gender: "Стать",
    g_m: "Чоловік",
    g_w: "Жінка",
    skills: "Ваші навички",
    exp: "Рівень досвіду",
    file: "Завантажити файл",
    comment: "Коментар",
    comment_ph: "Напишіть щось...",
    agree: "Я погоджуюсь з умовами",
    submit: "Відправити",
    reset: "Очистити"
  },
  en: {
    theme_label: "Theme:",
    dark: "Dark",
    light: "Light",
    lang_label: "Language:",
    uk_lang: "Ukrainian",
    en_lang: "English",
    title: "Registration Form",
    desc: "An example of a modern HTML form with various elements",
    fname: "First Name",
    fname_ph: "Enter your first name",
    lname: "Last Name",
    lname_ph: "Enter your last name",
    email: "Email",
    email_ph: "example@gmail.com",
    pwd: "Password",
    pwd_ph: "********",
    dob: "Date of Birth",
    phone: "Phone",
    phone_ph: "+380...",
    country: "Country",
    c_uk: "Ukraine",
    c_pl: "Poland",
    c_ge: "Germany",
    c_usa: "USA",
    gender: "Gender",
    g_m: "Male",
    g_w: "Female",
    skills: "Your Skills",
    exp: "Experience Level",
    file: "Upload File",
    comment: "Comment",
    comment_ph: "Write something...",
    agree: "I agree to the terms",
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