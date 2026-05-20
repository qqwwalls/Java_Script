"use strict";

const toggleButton = document.querySelector("#toggle-button");
const toggleText = document.querySelector("#toggle-text");

toggleButton.onclick = function () {
  toggleText.classList.toggle("hidden");
};

const tabButtons = document.querySelectorAll(".tab-button");
const tabContents = document.querySelectorAll(".tab-content");

for (let i = 0; i < tabButtons.length; i++) {
  tabButtons[i].onclick = function () {
    for (let j = 0; j < tabButtons.length; j++) {
      tabButtons[j].classList.remove("active");
      tabContents[j].classList.remove("active");
    }

    const tabId = this.dataset.tab;
    const activeContent = document.querySelector(`#${tabId}`);

    this.classList.add("active");
    activeContent.classList.add("active");
  };
}
