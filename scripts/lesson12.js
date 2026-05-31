"use strict";

const cl = console.log;
const URL = "http://localhost:3000/posts";

const form = document.getElementById("form-add");
const productList = document.getElementById("product-list");
const promiseText = document.getElementById("promise-text");

/**
 * 1. Отримуємо дані з сервера (стиль через .then як у викладача)
 */
function fetchPosts() {
  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      // Вивід у консоль як у прикладі
      data.forEach((el) => {
        cl(`${el.id}: ${el.title}`);
      });
      // Вивід на сторінку
      renderPosts(data);
    })
    .catch((error) => cl("Помилка завантаження:", error));
}

/**
 * Функція для малювання постів
 */
function renderPosts(posts) {
  if (!productList) return;
  productList.innerHTML = "<h3>Пости з db.json:</h3>";
  posts.forEach((p) => {
    const item = document.createElement("div");
    item.className = "product-item";
    item.innerHTML = `<span><strong>${p.title}</strong></span> <span>Перегляди: ${p.views}</span>`;
    productList.appendChild(item);
  });
}

/**
 * 2. Обробка форми: використовуємо імена полів з минулого уроку (product та price)
 */
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(form).entries());
    
    const newPost = {
      title: formData.product.trim(),
      views: Number(formData.price)
    };

    fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost),
    })
      .then((res) => res.json())
      .then(() => {
        form.reset();
        fetchPosts(); // Оновлюємо список після додавання
      })
      .catch((error) => cl("Помилка при збереженні:", error));
  });
}

// Ініціалізація
fetchPosts();

// Завдання з промісом (приклад того, як це виглядає через .then)
new Promise((resolve, reject) => {
  const n = 10;
  const nums = Array.from({ length: n }, () => Math.floor(Math.random() * 100));
  const even = nums.filter(num => num % 2 === 0).length;
  if (even >= n / 2) resolve(even);
  else reject(n - even);
})
  .then(count => { if(promiseText) promiseText.innerText = `Парних більше: ${count}`; })
  .catch(count => { if(promiseText) promiseText.innerText = `Непарних більше: ${count}`; });