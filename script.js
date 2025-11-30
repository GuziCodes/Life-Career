document.addEventListener("DOMContentLoaded", () => {

    const mainVideo = document.getElementById("mainVideo");
    const mainVideoTitle = document.getElementById("mainVideoTitle");

    const btnPlay = document.getElementById("mainPlay");
    const btnPause = document.getElementById("mainPause");
    const btnMute = document.getElementById("mainMute");
    const btnSpeed = document.getElementById("mainSpeed");
    const btnFullscreen = document.getElementById("mainFullscreen");


    document.querySelectorAll(".video-item").forEach(item => {
        item.addEventListener("click", () => {
            const src = item.dataset.src;
            const title = item.dataset.title;

            mainVideo.querySelector("source").src = src;
            mainVideo.load();
            mainVideo.play();

            mainVideoTitle.textContent = title;
        });
    });

    btnPlay.addEventListener("click", () => {
        mainVideo.play();
    });

    btnPause.addEventListener("click", () => {
        mainVideo.pause();
    });

    btnMute.addEventListener("click", () => {
        mainVideo.muted = !mainVideo.muted;
        btnMute.textContent = mainVideo.muted ? "Unmute" : "Mute";
    });

    let speeds = [0.5, 1, 1.5, 2, 3, 4];
    let speedIndex = 1;

    btnSpeed.addEventListener("click", () => {
        speedIndex = (speedIndex + 1) % speeds.length;
        mainVideo.playbackRate = speeds[speedIndex];
        btnSpeed.textContent = `Speed: ${speeds[speedIndex]}x`;
    });

    // FULLSCREEN + LANDSCAPE LOCK
    btnFullscreen.addEventListener("click", async () => {
        try {
            if (!document.fullscreenElement) {
                await mainVideo.requestFullscreen();

                // Try landscape mode (mobile)
                if (screen.orientation && screen.orientation.lock) {
                    try {
                        await screen.orientation.lock("landscape");
                    } catch {}
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
