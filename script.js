let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;
let lapCount = 1;

const display = document.getElementById("display");
const startPauseBtn = document.getElementById("startPause");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");
const laps = document.getElementById("laps");

function formatTime(ms) {
    let milliseconds = ms % 1000;
    let seconds = Math.floor(ms / 1000) % 60;
    let minutes = Math.floor(ms / 60000) % 60;
    let hours = Math.floor(ms / 3600000);

    return (
        String(hours).padStart(2, '0') + ":" +
        String(minutes).padStart(2, '0') + ":" +
        String(seconds).padStart(2, '0') + ":" +
        String(milliseconds).padStart(3, '0')
    );
}

function updateDisplay() {
    display.textContent = formatTime(elapsedTime);
}

startPauseBtn.addEventListener("click", () => {
    if (!running) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 10);
        startPauseBtn.textContent = "Pause";
        running = true;
    } else {
        clearInterval(timerInterval);
        startPauseBtn.textContent = "Start";
        running = false;
    }
});

resetBtn.addEventListener("click", () => {
    clearInterval(timerInterval);
    elapsedTime = 0;
    running = false;
    lapCount = 1;
    updateDisplay();
    startPauseBtn.textContent = "Start";
    laps.innerHTML = "";
});

lapBtn.addEventListener("click", () => {
    if (running) {
        let li = document.createElement("li");
        li.textContent = `Lap ${lapCount++} → ${formatTime(elapsedTime)}`;
        laps.appendChild(li);
    }
});

function toggleMode() {
    document.body.classList.toggle("light");
}