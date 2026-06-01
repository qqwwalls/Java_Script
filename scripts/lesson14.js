"use strict";

class PostApi {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async getPosts() {
    const response = await fetch(this.baseUrl);
    return await response.json();
  }

  async addPost(post) {
    const response = await fetch(this.baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    });
    return await response.json();
  }

  async deletePost(id) {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: "DELETE",
    });
    return await response.json();
  }

  async updatePost(id, post) {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    });
    return await response.json();
  }
}

// Клас для роботи з інтерфейсом (DOM)
class PostApp {
  constructor(api, containerId, formId) {
    this.api = api;
    this.container = document.getElementById(containerId);
    this.form = document.getElementById(formId);
    this.titleInput = document.getElementById("post-title");
    this.viewsInput = document.getElementById("post-views");
    this.idInput = document.getElementById("post-id");
    this.submitBtn = document.getElementById("submit-btn");
    this.cancelBtn = document.getElementById("cancel-btn");

    this.init();
  }

  init() {
    this.form.addEventListener("submit", (e) => this.handleSubmit(e));
    this.cancelBtn.addEventListener("click", () => this.resetForm());
    this.loadPosts();
  }

  async loadPosts() {
    const posts = await this.api.getPosts();
    this.renderPosts(posts);
  }

  renderPosts(posts) {
    this.container.innerHTML = "";
    posts.forEach((post) => {
      const postEl = document.createElement("div");
      postEl.className = "post";
      postEl.innerHTML = `
        <div class="post-content">
          <strong>${post.title}</strong> <br>
          <small>Перегляди: ${post.views}</small>
        </div>
        <div class="post-actions">
          <button class="btn-edit" data-id="${post.id}">Edit</button>
          <button class="btn-delete" data-id="${post.id}">Delete</button>
        </div>
      `;

      // Додаємо обробники для кожної кнопки
      postEl.querySelector(".btn-delete").addEventListener("click", () => this.deletePost(post.id));
      postEl.querySelector(".btn-edit").addEventListener("click", () => this.editPost(post));

      this.container.appendChild(postEl);
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const postData = {
      title: this.titleInput.value.trim(),
      views: Number(this.viewsInput.value),
    };
    const id = this.idInput.value;

    if (id) {
      await this.api.updatePost(id, postData); // PUT
    } else {
      await this.api.addPost(postData); // POST
    }

    this.resetForm();
    this.loadPosts();
  }

  async deletePost(id) {
    if (confirm("Видалити цей пост?")) {
      await this.api.deletePost(id); // DELETE
      this.loadPosts();
    }
  }

  editPost(post) {
    this.idInput.value = post.id;
    this.titleInput.value = post.title;
    this.viewsInput.value = post.views;
    
    this.submitBtn.innerText = "Save Changes";
    this.cancelBtn.style.display = "inline-block";
  }

  resetForm() {
    this.form.reset();
    this.idInput.value = "";
    this.submitBtn.innerText = "Add Post";
    this.cancelBtn.style.display = "none";
  }
}

// Ініціалізація додатку
const postApi = new PostApi("http://localhost:3000/posts");
const app = new PostApp(postApi, "posts-container", "post-form");