"use strict";

function setCookie(cname, cvalue, minutes) {
  const d = new Date();
  d.setTime(d.getTime() + minutes * 60 * 1000);
  let expires = "expires=" + d.toUTCString();

  document.cookie =
    cname + "=" + encodeURIComponent(cvalue) + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];

    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }

    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }

  return "";
}

function deleteCookie(cname) {
  document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
}

const registrationForm = document.getElementById("registration-form");
const welcomeCard = document.getElementById("welcome-card");
const text = document.getElementById("text");
const login = document.getElementById("login");
const password = document.getElementById("password");
const formMessage = document.getElementById("form-message");
const logoutButton = document.getElementById("logout-button");

function showUser(username) {
  registrationForm.classList.add("hidden");
  welcomeCard.classList.remove("hidden");
  text.innerText = `Привіт, ${username}`;
}

function showForm() {
  registrationForm.classList.remove("hidden");
  welcomeCard.classList.add("hidden");
  text.innerText = "";
}

let username = getCookie("username");

if (username) {
  showUser(username);
} else {
  showForm();
}

registrationForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const loginValue = login.value.trim();
  const passwordValue = password.value.trim();

  login.classList.toggle("error", loginValue === "");
  password.classList.toggle("error", passwordValue === "");

  if (loginValue === "" || passwordValue === "") {
    formMessage.innerText = "Заповніть логін та пароль";
    return;
  }

  setCookie("username", loginValue, 2);
  formMessage.innerText = "";
  registrationForm.reset();
  showUser(loginValue);
});

logoutButton.addEventListener("click", () => {
  deleteCookie("username");
  showForm();
});

login.addEventListener("focus", () => {
  login.classList.remove("error");
  formMessage.innerText = "";
});

password.addEventListener("focus", () => {
  password.classList.remove("error");
  formMessage.innerText = "";
});
