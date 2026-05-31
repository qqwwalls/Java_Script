"use strict";

const cl = console.log;
const form = document.forms.formcard;
const inputs = form.querySelectorAll("input, textarea, select");
const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const birthday = document.getElementById("birthday");
const phone = document.getElementById("phone");
const country = document.getElementById("country");
const genderInputs = document.querySelectorAll('[name="gender"]');
const genderGroup = document.querySelector(".radio-group");
const skillsGroup = document.querySelector(".checkbox-group");
const comment = document.getElementById("comment");
const agreement = document.getElementById("agreement");
const message = document.getElementById("form-message");

const users = [];

country.value = "Німеччина";
genderInputs[0].checked = true;

inputs.forEach((input) => {
  input.addEventListener("focus", (e) => {
    e.target.classList.remove("error");
    genderGroup.classList.remove("error");
    skillsGroup.classList.remove("error");
    clearResult();
  });
});

function setError(element, isError) {
  if (isError) {
    element.classList.add("error");
  } else {
    element.classList.remove("error");
  }
}

function getRegistrationData() {
  const formData = new FormData(form);
  const registrationData = {
    // trim() видаляє зайві пробіли на початку та в кінці
    firstName: formData.get("firstName").trim(),
    lastName: formData.get("lastName").trim(),
    email: formData.get("email").trim(),
    password: formData.get("password"),
    birthday: formData.get("birthday"),
    phone: formData.get("phone").trim(),
    country: formData.get("country"),
    gender: formData.get("gender") || "",
    skills: formData.getAll("skills"),
    comment: formData.get("comment").trim(),
    agreement: formData.has("agreement"),
  };

  firstName.value = registrationData.firstName;
  lastName.value = registrationData.lastName;
  email.value = registrationData.email;
  phone.value = registrationData.phone;
  comment.value = registrationData.comment;

  return registrationData;
}

function getLettersCount(text) {
  let count = 0;
  const letterTemplate = /[A-Za-zА-Яа-яІіЇїЄєҐґ]/u;

  for (let i = 0; i < text.length; i++) {
    if (letterTemplate.test(text[i])) {
      count++;
    }
  }

  return count;
}

function isNameValid(value) {
  return (
    value.length >= 2 &&
    getLettersCount(value) >= 2 &&
    /^[A-Za-zА-Яа-яІіЇїЄєҐґ' -]+$/u.test(value)
  );
}

function isEmailValid(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isPasswordValid(value) {
  return value.length >= 5 && !/\s/.test(value);
}

function isPhoneValid(value) {
  // +380 та 9 цифр після
  return /^\+380\d{9}$/.test(value);
}

function clearResult() {
  message.innerText = "";
  message.className = "";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  clearResult();

  const registrationData = getRegistrationData();
  
  const firstNameValid = isNameValid(registrationData.firstName);
  const lastNameValid = isNameValid(registrationData.lastName);
  const emailValid = isEmailValid(registrationData.email);
  const passwordValid = isPasswordValid(registrationData.password);
  const birthdayValid = registrationData.birthday !== "";
  const phoneValid = isPhoneValid(registrationData.phone);
  const genderValid = registrationData.gender !== "";
  const skillsValid = registrationData.skills.length >= 2;
  const commentValid = registrationData.comment.length >= 10 && registrationData.comment.length <= 150;
  const agreementValid = registrationData.agreement;

  setError(firstName, !firstNameValid);
  setError(lastName, !lastNameValid);
  setError(email, !emailValid);
  setError(password, !passwordValid);
  setError(birthday, !birthdayValid);
  setError(phone, !phoneValid);
  setError(genderGroup, !genderValid);
  setError(skillsGroup, !skillsValid);
  setError(comment, !commentValid);
  setError(agreement, !agreementValid);

  const isFormValid =
    firstNameValid && lastNameValid && emailValid && passwordValid &&
    birthdayValid && phoneValid && genderValid && skillsValid &&
    commentValid && agreementValid;

  if (isFormValid) {
    message.innerText = "Все заповнено вірно";
    message.classList.add("success");
    
    users.push(registrationData);
    cl("Успішно додано користувача. Масив користувачів:", users);
    
    form.reset();
  } else {
    message.innerText = "Перевірте поля, виділені червоним";
    message.classList.add("fail");
  }
});

form.addEventListener("reset", () => {
  setTimeout(() => {
    const errors = form.querySelectorAll(".error");
    for (let i = 0; i < errors.length; i++) {
      errors[i].classList.remove("error");
    }

    country.value = "Німеччина";
    genderInputs[0].checked = true;
    clearResult();
  });
});