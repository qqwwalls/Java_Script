import RestClient from "./RestClient.js";

interface IPost {
  id?: string | number;
  title: string;
  views?: number;
}

class PostApp {
  private container = document.getElementById("posts-container") as HTMLDivElement;
  private form = document.getElementById("post-form") as HTMLFormElement;
  private titleInput = document.getElementById("post-title") as HTMLInputElement;
  private viewsInput = document.getElementById("post-views") as HTMLInputElement;
  private idInput = document.getElementById("post-id") as HTMLInputElement;
  private submitBtn = document.getElementById("submit-btn") as HTMLButtonElement;
  private cancelBtn = document.getElementById("cancel-btn") as HTMLButtonElement;

  constructor() {
    this.init();
  }

  private init(): void {
    if (!this.form || !this.container) return;

    this.form.addEventListener("submit", (e) => this.handleSubmit(e));
    this.cancelBtn.addEventListener("click", () => this.resetForm());
    this.loadPosts().catch(console.error);
  }

  private async loadPosts(): Promise<void> {
    const posts = await RestClient.getData();
    this.renderPosts(posts);
  }

  private renderPosts(posts: IPost[]): void {
    this.container.innerHTML = "";
    posts.forEach((post) => {
      const postEl = document.createElement("div");
      postEl.className = "post";
      postEl.innerHTML = `
        <div class="post-content">
          <strong>${post.title}</strong> <br>
          <small>Перегляди: ${post.views || 0}</small>
        </div>
        <div class="post-actions">
          <button class="btn-edit" data-id="${post.id}">Edit</button>
          <button class="btn-delete" data-id="${post.id}">Delete</button>
        </div>
      `;

      postEl.querySelector(".btn-delete")?.addEventListener("click", () => this.deletePost(post.id!));
      postEl.querySelector(".btn-edit")?.addEventListener("click", () => this.editPost(post));

      this.container.appendChild(postEl);
    });
  }

  private async handleSubmit(e: Event): Promise<void> {
    e.preventDefault();
    const postData: IPost = {
      title: this.titleInput.value.trim(),
      views: Number(this.viewsInput.value),
    };
    const id = this.idInput.value;

    if (id) {
      await RestClient.updateData(id, postData);
    } else {
      await RestClient.addData(postData);
    }

    this.resetForm();
    this.loadPosts().catch(console.error);
  }

  private async deletePost(id: string | number): Promise<void> {
    if (confirm("Видалити цей пост?")) {
      await RestClient.deleteData(id);
      this.loadPosts().catch(console.error);
    }
  }

  private editPost(post: IPost): void {
    this.idInput.value = post.id ? String(post.id) : "";
    this.titleInput.value = post.title;
    this.viewsInput.value = post.views ? String(post.views) : "";
    
    this.submitBtn.innerText = "Save Changes";
    this.cancelBtn.style.display = "inline-block";
  }

  private resetForm(): void {
    this.form.reset();
    this.idInput.value = "";
    this.submitBtn.innerText = "Add Post";
    this.cancelBtn.style.display = "none";
  }
}

const app = new PostApp();
