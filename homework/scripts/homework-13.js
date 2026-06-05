"use strict";

const BASE_URL = "https://api.tvmaze.com/";

const form = document.getElementById("search-form");
const titleInput = document.getElementById("search-title");
const moviesContainer = document.getElementById("movies-container");
const notFoundMsg = document.getElementById("not-found-msg");
const paginationContainer = document.getElementById("pagination-container");
const detailsContainer = document.getElementById("details-container");

let allShows = [];
let currentPage = 1;
const itemsPerPage = 4;

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const query = titleInput.value.trim();
    if (!query) return;

    detailsContainer.classList.add("hidden");
    detailsContainer.innerHTML = "";
    
    await fetchShows(query);
});

async function fetchShows(query) {
    moviesContainer.innerHTML = "<p style='text-align: center; grid-column: 1 / -1;'>Завантаження...</p>";
    notFoundMsg.classList.add("hidden");
    paginationContainer.innerHTML = "";
    
    try {
        const response = await fetch(`${BASE_URL}search/shows?q=${encodeURIComponent(query)}`);
        const data = await response.json();

        if (data.length > 0) {
            allShows = data.map(item => item.show);
            currentPage = 1;
            renderPage();
        } else {
            moviesContainer.innerHTML = "";
            notFoundMsg.innerText = "Show not found!";
            notFoundMsg.classList.remove("hidden");
        }
    } catch (error) {
        console.error("Fetch Error:", error);
        moviesContainer.innerHTML = "";
        notFoundMsg.innerText = "Сталася помилка при завантаженні даних!";
        notFoundMsg.classList.remove("hidden");
    }
}

function renderPage() {
    moviesContainer.innerHTML = "";
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const showsToShow = allShows.slice(startIndex, endIndex);
    
    showsToShow.forEach(show => {
        const poster = show.image?.medium ? show.image.medium : "https://via.placeholder.com/210x295?text=No+Poster";
        const year = show.premiered ? show.premiered.substring(0, 4) : "N/A";
        
        const card = document.createElement("div");
        card.className = "movie-card";
        card.innerHTML = `
            <img src="${poster}" alt="${show.name}">
            <h3>${show.name}</h3>
            <p>${year}</p>
            <button class="details-btn" data-id="${show.id}">Details</button>
        `;
        
        moviesContainer.appendChild(card);
    });

    const detailsBtns = document.querySelectorAll(".details-btn");
    detailsBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const showId = e.target.getAttribute("data-id");
            fetchShowDetails(showId);
        });
    });

    renderPagination();
}

function renderPagination() {
    paginationContainer.innerHTML = "";
    const totalPages = Math.ceil(allShows.length / itemsPerPage);
    
    if (totalPages <= 1) return;

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.innerText = i;
        if (i === currentPage) {
            btn.classList.add("active");
        }
        btn.addEventListener("click", () => {
            currentPage = i;
            renderPage();
            document.getElementById("search-form").scrollIntoView({ behavior: "smooth" });
        });
        paginationContainer.appendChild(btn);
    }
}

async function fetchShowDetails(showId) {
    detailsContainer.innerHTML = "<p style='text-align: center; width: 100%;'>Завантаження деталей...</p>";
    detailsContainer.classList.remove("hidden");
    detailsContainer.scrollIntoView({ behavior: "smooth" });

    try {
        const response = await fetch(`${BASE_URL}shows/${showId}`);
        const show = await response.json();

        const poster = show.image?.original || show.image?.medium || "https://via.placeholder.com/300x450?text=No+Poster";
        const rating = show.rating?.average ? `⭐ ${show.rating.average}` : "N/A";
        const summary = show.summary || "No description available.";
        
        detailsContainer.innerHTML = `
            <div class="details-box">
                <img src="${poster}" alt="${show.name}">
                <div class="details-info">
                    <h2>${show.name}</h2>
                    <p><strong>Genres:</strong> ${show.genres.join(", ") || "N/A"}</p>
                    <p><strong>Status:</strong> ${show.status}</p>
                    <p><strong>Premiered:</strong> ${show.premiered || "N/A"}</p>
                    <p><strong>Rating:</strong> ${rating}</p>
                    <p><strong>Summary:</strong> ${summary}</p>
                </div>
            </div>
        `;
    } catch (error) {
        detailsContainer.innerHTML = "<p class='error'>Помилка з'єднання при завантаженні деталей.</p>";
    }
}