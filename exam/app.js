"use strict";
const API_BASE = "https://www.themealdb.com/api/json/v1/1";
const heroSection = document.getElementById("hero-section");
const categoriesSection = document.getElementById("categories-section");
const mealsSection = document.getElementById("meals-section");
const categoriesContainer = document.getElementById("categories-container");
const mealsContainer = document.getElementById("meals-container");
const mealsTitle = document.getElementById("meals-title");
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const btnRandom = document.getElementById("btn-random");
const btnFavorites = document.getElementById("btn-favorites");
const homeLink = document.getElementById("home-link");
const mealModalElement = document.getElementById("mealModal");
const modalTitle = document.getElementById("mealModalTitle");
const modalImg = document.getElementById("mealModalImg");
const modalIngredients = document.getElementById("mealModalIngredients");
const modalInstructions = document.getElementById("mealModalInstructions");
const modalFavBtn = document.getElementById("modalFavBtn");
let mealModal;
if (typeof bootstrap !== "undefined") {
    mealModal = new bootstrap.Modal(mealModalElement);
}
let favorites = [];
const savedFavs = localStorage.getItem("mealFavorites");
if (savedFavs) {
    favorites = JSON.parse(savedFavs);
}
let currentMeal = null;
let initialMeals = [];
function showPage(page) {
    if (page === "home") {
        heroSection.style.display = "block";
        categoriesSection.style.display = "block";
    }
    else {
        heroSection.style.display = "none";
        categoriesSection.style.display = "none";
    }
    mealsSection.scrollIntoView({ behavior: "smooth" });
}
async function fetchMeals(endpoint) {
    try {
        const response = await fetch(`${API_BASE}${endpoint}`);
        if (!response.ok)
            throw new Error("Помилка мережі");
        const data = await response.json();
        return data.meals || [];
    }
    catch (error) {
        console.error("Помилка:", error);
        return [];
    }
}
async function fetchCategories() {
    try {
        const response = await fetch(`${API_BASE}/categories.php`);
        if (!response.ok)
            throw new Error("Помилка мережі");
        const data = await response.json();
        return data.categories || [];
    }
    catch (error) {
        console.error("Помилка:", error);
        return [];
    }
}
async function renderCategories() {
    const categories = await fetchCategories();
    categoriesContainer.innerHTML = "";
    categories.forEach(category => {
        const div = document.createElement("div");
        div.className = "col-md-3";
        div.innerHTML = `
            <button class="btn btn-outline-primary w-100">
                ${category.strCategory}
            </button>
        `;
        const btn = div.querySelector("button");
        btn.addEventListener("click", async () => {
            showPage("category");
            mealsTitle.innerText = `Страви з категорії: ${category.strCategory}`;
            mealsContainer.innerHTML = "<p>Завантаження...</p>";
            const meals = await fetchMeals(`/filter.php?c=${encodeURIComponent(category.strCategory)}`);
            renderMeals(meals);
        });
        categoriesContainer.appendChild(div);
    });
}
function renderMeals(meals) {
    mealsContainer.innerHTML = "";
    if (meals.length === 0) {
        mealsContainer.innerHTML = `<div class="col-12"><p class="text-center text-muted">Страв не знайдено.</p></div>`;
        return;
    }
    meals.forEach(meal => {
        const div = document.createElement("div");
        div.className = "col-md-4";
        div.innerHTML = `
            <div class="card h-100 shadow-sm">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${meal.strMeal}</h5>
                    <button class="btn btn-primary mt-auto">Детальніше</button>
                </div>
            </div>
        `;
        const detailsBtn = div.querySelector("button");
        detailsBtn.addEventListener("click", async () => {
            const mealDetails = await fetchMeals(`/lookup.php?i=${meal.idMeal}`);
            if (mealDetails.length > 0)
                openModal(mealDetails[0]);
        });
        mealsContainer.appendChild(div);
    });
}
function openModal(meal) {
    currentMeal = meal;
    modalTitle.innerText = meal.strMeal;
    modalImg.src = meal.strMealThumb;
    modalInstructions.innerText = meal.strInstructions || "Інструкція відсутня.";
    modalIngredients.innerHTML = "";
    for (let i = 1; i <= 20; i++) {
        const ing = meal[`strIngredient${i}`];
        const msr = meal[`strMeasure${i}`];
        if (ing && ing.trim() !== "") {
            const li = document.createElement("li");
            li.innerText = `${ing} - ${msr}`;
            modalIngredients.appendChild(li);
        }
    }
    checkFavoriteStatus();
    mealModal.show();
}
function checkFavoriteStatus() {
    if (!currentMeal)
        return;
    const isFav = favorites.find(m => m.idMeal === currentMeal.idMeal);
    if (isFav) {
        modalFavBtn.innerText = "Видалити з обраного";
        modalFavBtn.classList.remove("btn-outline-danger");
        modalFavBtn.classList.add("btn-danger");
    }
    else {
        modalFavBtn.innerText = "Додати в обране";
        modalFavBtn.classList.remove("btn-danger");
        modalFavBtn.classList.add("btn-outline-danger");
    }
}
modalFavBtn.addEventListener("click", () => {
    if (!currentMeal)
        return;
    const index = favorites.findIndex((m) => m.idMeal === currentMeal.idMeal);
    if (index > -1)
        favorites.splice(index, 1);
    else
        favorites.push(currentMeal);
    localStorage.setItem("mealFavorites", JSON.stringify(favorites));
    checkFavoriteStatus();
    if (mealsTitle.innerText === "Обрані рецепти") {
        renderMeals(favorites);
    }
});
searchForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const query = searchInput.value.trim();
    if (!query)
        return;
    showPage("search");
    mealsTitle.innerText = `Результати пошуку: "${query}"`;
    mealsContainer.innerHTML = "<p>Завантаження...</p>";
    const meals = await fetchMeals(`/search.php?s=${encodeURIComponent(query)}`);
    renderMeals(meals);
});
btnRandom.addEventListener("click", async () => {
    const randomMeals = await fetchMeals(`/random.php`);
    if (randomMeals.length > 0)
        openModal(randomMeals[0]);
});
btnFavorites.addEventListener("click", () => {
    showPage("favorites");
    mealsTitle.innerText = "Обрані рецепти";
    renderMeals(favorites);
});
homeLink.addEventListener("click", (e) => {
    e.preventDefault();
    showPage("home");
    mealsTitle.innerText = "Популярні страви";
    renderMeals(initialMeals);
    searchInput.value = "";
});
async function init() {
    await renderCategories();
    const meals = await fetchMeals(`/search.php?s=`);
    initialMeals = meals.slice(0, 9);
    renderMeals(initialMeals);
}
init();
