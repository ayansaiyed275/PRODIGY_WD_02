let timer;
let isRunning = false;
let seconds = 0;
let laps = [];

const display = document.getElementById('display');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsContainer = document.getElementById('laps');
const clearAllBtn = document.getElementById('clearAllBtn');

function formatTime(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function updateDisplay() {
    display.textContent = formatTime(seconds);
}

function startPause() {
    if (isRunning) {
        clearInterval(timer);
        startPauseBtn.textContent = 'Start';
    } else {
        timer = setInterval(() => {
            seconds++;
            updateDisplay();
        }, 1000);
        startPauseBtn.textContent = 'Pause';
    }
    isRunning = !isRunning;
}

function reset() {
    clearInterval(timer);
    seconds = 0;
    updateDisplay();
    isRunning = false;
    startPauseBtn.textContent = 'Start';
    laps = [];
    lapsContainer.innerHTML = '';
}

function lap() {
    if (isRunning) {
        laps.push(seconds);
        const lapElement = document.createElement('div');
        lapElement.classList.add('lap');
        lapElement.textContent = `#${laps.length} ${formatTime(seconds)}`;
        lapsContainer.prepend(lapElement);
    }
}

function clearAll() {
    laps = [];
    lapsContainer.innerHTML = '';
}

startPauseBtn.addEventListener('click', startPause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);
clearAllBtn.addEventListener('click', clearAll);