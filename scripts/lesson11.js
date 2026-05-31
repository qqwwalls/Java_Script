"use strict";

const cl = console.log;
const form = document.getElementById("form-add");
const productList = document.getElementById("product-list"); // Container to display products
const clearBtn = document.getElementById("clear-btn"); // Button to clear storage
const promiseText = document.getElementById("promise-text"); // Display for promise result

// Initialize products from localStorage or as an empty array
const products = JSON.parse(localStorage.getItem("products")) || [];

/**
 * Updates the UI with the current list of products
 */
function renderProducts() {
  if (!productList) return;
  productList.innerHTML = "";

  products.forEach(([name, price]) => {
    const item = document.createElement("div");
    item.className = "product-item";
    item.innerHTML = `<span><strong>${name}</strong></span> <span>${price} грн</span>`;
    productList.appendChild(item);
  });
}

// Render products on initial load
renderProducts();

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());

    // Простая валидация (как в 9-м уроке)
    if (!data.product.trim() || !data.price) {
      return alert("Заповніть всі поля!");
    }

    // Перевірка без врахування регістру (Apple === apple)
    const productName = data.product.trim();
    const existingProduct = products.find((p) => p[0].toLowerCase() === productName.toLowerCase());

    if (existingProduct) {
      // Overwrite the price if it exists
      existingProduct[1] = data.price;
    } else {
      // Add as a new entry
      products.push([data.product, data.price]);
    }

    localStorage.setItem("products", JSON.stringify(products));
    renderProducts();
    form.reset();
  });
}

if (clearBtn) {
  clearBtn.addEventListener("click", () => {
    localStorage.removeItem("products");
    products.length = 0; // Clear the array in place
    renderProducts();
  });
}

// Завдання з Promise
const n = 10; 
cl("Start");

new Promise((resolve, reject) => {
  const randomNumbers = [];
  for (let i = 0; i < n; i++) {
    randomNumbers.push(Math.floor(Math.random() * 100));
  }

  const evenNumbers = randomNumbers.filter((num) => num % 2 === 0);
  const oddNumbers = randomNumbers.filter((num) => num % 2 !== 0);

  cl("Згенерований масив:", randomNumbers);
  cl(`Парних: ${evenNumbers.length}, Непарних: ${oddNumbers.length}`);
  
  if (promiseText) {
    promiseText.innerText = `Масив: [${randomNumbers.join(", ")}]. Рахуємо...`;
  }

  // Невелика затримка для ефекту асинхронності
  setTimeout(() => {
    if (evenNumbers.length > oddNumbers.length) {
      resolve(evenNumbers.length);
    } else {
      reject(oddNumbers.length);
    }
  }, 1000);
})
  .then((count) => promiseText.innerText = `Виконано (Resolved): Парних більше (${count})`)
  .catch((count) => promiseText.innerText = `Відхилено (Rejected): Непарних більше (${count})`);

cl("End");