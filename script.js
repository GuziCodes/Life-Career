document.addEventListener("DOMContentLoaded", () => {

    const mainVideo = document.getElementById("mainVideo");
    const mainVideoTitle = document.getElementById("mainVideoTitle");

    // BUTTONS (but note: some will be disabled for YouTube)
    const btnPlay = document.getElementById("mainPlay");
    const btnPause = document.getElementById("mainPause");
    const btnMute = document.getElementById("mainMute");
    const btnSpeed = document.getElementById("mainSpeed");
    const btnFullscreen = document.getElementById("mainFullscreen");

    // LOAD VIDEO FROM SIDEBAR
    document.querySelectorAll(".video-item").forEach(item => {
        item.addEventListener("click", () => {

            const src = item.dataset.src;
            const title = item.dataset.title;

            // Just update iframe src
            mainVideo.src = src;

            mainVideoTitle.textContent = title;
        });
    });

    // ❌ These functions cannot work on YouTube iframe (disabled)
    btnPlay.disabled = true;
    btnPause.disabled = true;
    btnMute.disabled = true;
    btnSpeed.disabled = true;

    btnPlay.textContent = "Play (YouTube)";
    btnPause.textContent = "Pause (Disabled)";
    btnMute.textContent = "Mute (Disabled)";
    btnSpeed.textContent = "Speed (Disabled)";

    // FULLSCREEN (still works!)
    btnFullscreen.addEventListener("click", async () => {
        try {
            if (!document.fullscreenElement) {
                await mainVideo.requestFullscreen();

                if (screen.orientation && screen.orientation.lock) {
                    try { await screen.orientation.lock("landscape"); } catch {}
                }
            } else {
                await document.exitFullscreen();
                if (screen.orientation.unlock) {
                    screen.orientation.unlock();
                }
            }
        } catch (err) {
            console.error("Fullscreen error:", err);
        }
    });

    // DARK / LIGHT MODE
    const toggleBtn = document.getElementById("theme-toggle");
    const body = document.body;

    let savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
        body.classList.add(savedTheme);
        updateToggleText();
    } else {
        body.classList.add("dark");
    }

    toggleBtn.addEventListener("click", () => {
        if (body.classList.contains("dark")) {
            body.classList.replace("dark", "light");
            localStorage.setItem("theme", "light");
        } else {
            body.classList.replace("light", "dark");
            localStorage.setItem("theme", "dark");
        }
        updateToggleText();
    });

    function updateToggleText() {
        toggleBtn.textContent = body.classList.contains("light") 
            ? "☀️ Light Mode"
            : "🌙 Dark Mode";
    }

});
