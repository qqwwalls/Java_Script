"use strict";

const calendarForm = document.getElementById("calendar-form");
const monthInput = document.getElementById("month-input");
const yearInput = document.getElementById("year-input");
const calendarContainer = document.getElementById("calendar-container");

function createCalendar(year, month) {
  calendarContainer.innerHTML = "";

  const monthIndex = month - 1;

  const firstDayDate = new Date(year, monthIndex, 1);
  
  const lastDayDate = new Date(year, monthIndex + 1, 0);
  const daysInMonth = lastDayDate.getDate();

  let startDayOfWeek = firstDayDate.getDay();

  if (startDayOfWeek === 0) {
    startDayOfWeek = 6;
  } else {
    startDayOfWeek -= 1;
  }

  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");

  const daysOfWeek = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"];
  const headerRow = document.createElement("tr");

  for (let i = 0; i < daysOfWeek.length; i++) {
    const th = document.createElement("th");
    th.innerText = daysOfWeek[i];
    headerRow.append(th);
  }
  thead.append(headerRow);
  table.append(thead);

  let currentDay = 1;

  for (let row = 0; row < 6; row++) {
    const tr = document.createElement("tr");
    let hasCells = false;

    for (let col = 0; col < 7; col++) {
      const td = document.createElement("td");

      if (row === 0 && col < startDayOfWeek) {
        td.innerText = "";
      } else if (currentDay <= daysInMonth) {
        td.innerText = currentDay;
        currentDay++;
        hasCells = true;
      } else {
        td.innerText = "";
      }

      tr.append(td);
    }

    if (hasCells || row === 0) {
      tbody.append(tr);
    } else {
      break;
    }
  }

  table.append(tbody);
  calendarContainer.append(table);
}

if (calendarForm) {
  calendarForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const month = Number(monthInput.value);
    const year = Number(yearInput.value);

    if (month >= 1 && month <= 12 && year > 0) {
      createCalendar(year, month);
    } else {
      calendarContainer.innerHTML = "<p class='error'>Помилка: перевірте правильність введених даних.</p>";
    }
  });
}