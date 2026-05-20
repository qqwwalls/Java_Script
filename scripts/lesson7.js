"use strict";

const languageBlock = document.createElement("div");

const cpp = document.createElement("p");
cpp.innerText = "C++";

const cSharp = document.createElement("p");
cSharp.innerText = "C#";

const js = document.createElement("p");
js.innerText = "JS";

languageBlock.append(cpp, cSharp, js);
document.body.prepend(languageBlock);

const showButton = document.createElement("button");
showButton.innerText = "Show";
showButton.type = "button";
languageBlock.after(showButton);

showButton.onclick = function () {
  const languageName = prompt("Введіть назву наступної мови програмування");

  if (languageName) {
    const newLanguage = document.createElement("p");
    newLanguage.innerText = languageName;
    languageBlock.append(newLanguage);
  }
};

const loremText = document.querySelector("#lorem-text");

loremText.onclick = function () {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  loremText.style.color = `rgb(${red}, ${green}, ${blue})`;
};
