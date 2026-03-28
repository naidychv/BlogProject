const postsContainer = document.getElementById("posts");

async function loadPosts() {
  try {
    const res1 = await fetch("published.json");
    const publishedPosts = await res1.json();
    const res2 = await fetch("future-posts.json");
    const draftPosts = await res2.json();

    const allPosts = [...publishedPosts, ...draftPosts];
    renderPosts(allPosts);
  } catch (error) {
    console.error("Błąd:", error);
  }
}

function renderPosts(posts) {
  posts.forEach((post) => {
    const article = document.createElement("article");
    article.classList.add("article");
    const title = post.title || "Brak tytułu";
    const author = post.author?.name || "Nieznany autor";
    const date = post.date || "Brak daty";
    const category = post.category || "Brak kategorii";
    const readTime = post.meta?.readTime || "Nieznany czas";
    const published = post.isPublished ? "✔ Opublikowany" : "🕓 Szkic";

    const tags = post.tags?.length
      ? post.tags.map((tag) => `<span>${tag}</span>`).join("")
      : "Brak tagów";

    const image = post.media?.images?.[0]
      ? `<img src="${post.media.images[0]}" alt="">`
      : "";

    article.innerHTML = `
      <h2>${title}</h2>
      <p><strong>Autor:</strong> ${author}</p>
      <p><strong>Data:</strong> ${date}</p>
      <p><strong>Kategoria:</strong> ${category}</p>
      <p><strong>Czas czytania:</strong> ${readTime}</p>
      <p><strong>Status:</strong> ${published}</p>
      <div class="tags">${tags}</div>
      ${image}
    `;

    postsContainer.appendChild(article);
  });
}

loadPosts();
