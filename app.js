import {
  db,
  ref,
  push,
  onValue,
  remove
} from "./firebase.js";

const pages = document.querySelectorAll(".page");

document.querySelectorAll(".sidebar button").forEach(btn => {
  btn.addEventListener("click", () => {
    const page = btn.dataset.page;

    if (!page) return;

    pages.forEach(p => p.classList.add("hidden"));

    document.getElementById(page).classList.remove("hidden");
  });
});

// ---------------- LOGIN ----------------

let loggedIn = false;

const PASSWORD = "169h";

const loginModal = document.getElementById("loginModal");
const status = document.getElementById("status");
const editor = document.getElementById("editor");

document.getElementById("loginBtn").addEventListener("click", () => {
  loginModal.classList.remove("hidden");
});

document.getElementById("cancelBtn").addEventListener("click", () => {
  loginModal.classList.add("hidden");
});

document.getElementById("enterBtn").addEventListener("click", () => {
  const pass = document.getElementById("pass").value;

  if (pass === PASSWORD) {
    loggedIn = true;

    status.innerText = "Logged in ✔";

    editor.classList.remove("hidden");

    loginModal.classList.add("hidden");
  } else {
    alert("Wrong password");
  }
});

// ---------------- CLOCK ----------------

function updateClock() {
  const time = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  }).format(new Date());

  document.getElementById("time").innerText = time;
}

setInterval(updateClock, 1000);

updateClock();

// ---------------- PREVIEW ----------------

document.getElementById("loadPreviewBtn")
  .addEventListener("click", () => {

    const url = document.getElementById("urlInput").value;

    document.getElementById("previewFrame").src = url;
  });

// ---------------- POSTS ----------------

const postsRef = ref(db, "posts");

document.getElementById("publishBtn")
  .addEventListener("click", async () => {

    if (!loggedIn) {
      alert("Login first");
      return;
    }

    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    await push(postsRef, {
      title,
      content,
      timestamp: Date.now()
    });

    document.getElementById("title").value = "";
    document.getElementById("content").value = "";
  });

const list = document.getElementById("postList");

onValue(postsRef, snapshot => {

  list.innerHTML = "";

  const posts = [];

  snapshot.forEach(child => {
    posts.push({
      id: child.key,
      ...child.val()
    });
  });

  posts.reverse();

  posts.forEach(post => {

    const div = document.createElement("div");

    div.className = "post";

    div.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.content}</p>
    `;

    if (loggedIn) {

      const delBtn = document.createElement("button");

      delBtn.innerText = "Delete";

      delBtn.addEventListener("click", async () => {

        if (confirm("Delete post?")) {
          await remove(ref(db, `posts/${post.id}`));
        }
      });

      div.appendChild(delBtn);
    }

    list.appendChild(div);
  });
});
