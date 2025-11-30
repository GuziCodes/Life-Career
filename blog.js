// =====================
// THEME TOGGLE
// =====================
const themeToggle = document.getElementById("themeToggle");

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "☀️";
}

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
        themeToggle.textContent = "☀️";
    } else {
        localStorage.setItem("theme", "light");
        themeToggle.textContent = "🌙";
    }
});

// =====================
// PHOTO SWITCHING
// =====================
const displayPhoto = document.getElementById("displayPhoto");
const thumbnails = document.querySelectorAll(".thumb");

thumbnails.forEach(img => {
    img.addEventListener("click", () => {
        if (displayPhoto.src.includes(img.dataset.full)) return; // skip if same image
        displayPhoto.classList.add("fade");

        setTimeout(() => {
            displayPhoto.src = img.dataset.full;
            displayPhoto.classList.remove("fade");
        }, 180);
    });
});

// =====================
// FULLSCREEN FEATURE
// =====================
displayPhoto.addEventListener("click", () => {
    if (displayPhoto.requestFullscreen) {
        displayPhoto.requestFullscreen();
    }
});
