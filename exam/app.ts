interface IMeal {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    strInstructions?: string;
    [key: string]: any;
}

interface ICategory {
    idCategory: string;
    strCategory: string;
}

declare const bootstrap: any;
const API_BASE = "https://www.themealdb.com/api/json/v1/1";

const heroSection = document.getElementById("hero-section") as HTMLElement;
const categoriesSection = document.getElementById("categories-section") as HTMLElement;
const mealsSection = document.getElementById("meals-section") as HTMLElement;

const categoriesContainer = document.getElementById("categories-container") as HTMLElement;
const mealsContainer = document.getElementById("meals-container") as HTMLElement;
const mealsTitle = document.getElementById("meals-title") as HTMLElement;

const searchForm = document.getElementById("search-form") as HTMLFormElement;
const searchInput = document.getElementById("search-input") as HTMLInputElement;
const btnRandom = document.getElementById("btn-random") as HTMLButtonElement;
const btnFavorites = document.getElementById("btn-favorites") as HTMLButtonElement;
const homeLink = document.getElementById("home-link") as HTMLAnchorElement;

const mealModalElement = document.getElementById("mealModal") as HTMLElement;
const modalTitle = document.getElementById("mealModalTitle") as HTMLElement;
const modalImg = document.getElementById("mealModalImg") as HTMLImageElement;
const modalIngredients = document.getElementById("mealModalIngredients") as HTMLElement;
const modalInstructions = document.getElementById("mealModalInstructions") as HTMLElement;
const modalFavBtn = document.getElementById("modalFavBtn") as HTMLButtonElement;

let mealModal: any;
if (typeof bootstrap !== "undefined") {
    mealModal = new bootstrap.Modal(mealModalElement);
}

let favorites: IMeal[] = [];
const savedFavs = localStorage.getItem("mealFavorites");
if (savedFavs) {
    favorites = JSON.parse(savedFavs);
}

let currentMeal: IMeal | null = null;
let initialMeals: IMeal[] = [];

function showPage(page: string) {
    if (page === "home") {
        heroSection.style.display = "block";
        categoriesSection.style.display = "block";
    } else {
        heroSection.style.display = "none";
        categoriesSection.style.display = "none";
    }
    mealsSection.scrollIntoView({ behavior: "smooth" });
}

async function fetchMeals(endpoint: string): Promise<IMeal[]> {
    try {
        const response = await fetch(`${API_BASE}${endpoint}`);
        if (!response.ok) throw new Error("Помилка мережі");
        const data = await response.json();
        return data.meals || [];
    } catch (error) {
        console.error("Помилка:", error);
        return [];
    }
}

async function fetchCategories(): Promise<ICategory[]> {
    try {
        const response = await fetch(`${API_BASE}/categories.php`);
        if (!response.ok) throw new Error("Помилка мережі");
        const data = await response.json();
        return data.categories || [];
    } catch (error) {
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

        const btn = div.querySelector("button") as HTMLButtonElement;
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

function renderMeals(meals: IMeal[]) {
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

        const detailsBtn = div.querySelector("button") as HTMLButtonElement;
        detailsBtn.addEventListener("click", async () => {
            const mealDetails = await fetchMeals(`/lookup.php?i=${meal.idMeal}`);
            if (mealDetails.length > 0) openModal(mealDetails[0]);
        });

        mealsContainer.appendChild(div);
    });
}

function openModal(meal: IMeal) {
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
    if (!currentMeal) return;
    
    const isFav = favorites.find(m => m.idMeal === currentMeal!.idMeal);
    if (isFav) {
        modalFavBtn.innerText = "Видалити з обраного";
        modalFavBtn.classList.remove("btn-outline-danger");
        modalFavBtn.classList.add("btn-danger");
    } else {
        modalFavBtn.innerText = "Додати в обране";
        modalFavBtn.classList.remove("btn-danger");
        modalFavBtn.classList.add("btn-outline-danger");
    }
}

modalFavBtn.addEventListener("click", () => {
    if (!currentMeal) return;
    
    const index = favorites.findIndex((m: IMeal) => m.idMeal === currentMeal!.idMeal);
    if (index > -1) favorites.splice(index, 1);
    else favorites.push(currentMeal);
    
    localStorage.setItem("mealFavorites", JSON.stringify(favorites));
    checkFavoriteStatus();
    
    if (mealsTitle.innerText === "Обрані рецепти") {
        renderMeals(favorites);
    }
});

searchForm.addEventListener("submit", async (e: Event) => {
    e.preventDefault();
    const query = searchInput.value.trim();
    if (!query) return;

    showPage("search");
    mealsTitle.innerText = `Результати пошуку: "${query}"`;
    mealsContainer.innerHTML = "<p>Завантаження...</p>";
    
    const meals = await fetchMeals(`/search.php?s=${encodeURIComponent(query)}`);
    renderMeals(meals);
});

btnRandom.addEventListener("click", async () => {
    const randomMeals = await fetchMeals(`/random.php`);
    if (randomMeals.length > 0) openModal(randomMeals[0]);
});

btnFavorites.addEventListener("click", () => {
    showPage("favorites");
    mealsTitle.innerText = "Обрані рецепти";
    renderMeals(favorites);
});

homeLink.addEventListener("click", (e: Event) => {
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