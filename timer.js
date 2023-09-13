let timer;
let isRunning = false;
let secondsRemaining = 0;
let selectedTimeUnit = "seconds";

function startTimer() {
    if (!isRunning) {
        const timeInput = document.getElementById("timeInput").value;
        if (!timeInput || isNaN(timeInput) || timeInput <= 0) {
            alert("Please enter a valid time.");
            return;
        }
        const timeInSeconds = convertToSeconds(timeInput);
        if (timeInSeconds <= 0) {
            alert("Please enter a valid time.");
            return;
        }

        secondsRemaining = timeInSeconds;
        updateDisplay();

        timer = setInterval(function () {
            secondsRemaining--;
            if (secondsRemaining <= 0) {
                clearInterval(timer);
                isRunning = false;
                alert("Countdown timer expired!");
                document.getElementById("startButton").disabled = false;
                document.getElementById("stopButton").disabled = true;
            }
            updateDisplay();
        }, 1000);

        isRunning = true;
        document.getElementById("startButton").disabled = true;
        document.getElementById("stopButton").disabled = false;
        document.getElementById("resetButton").disabled = false;
        document.getElementById("restartButton").disabled = false;
        document.getElementById("timeInput").disabled = true;
        document.getElementById("timeUnit").disabled = true;
    }
}

function stopTimer() {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
        document.getElementById("startButton").disabled = false;
        document.getElementById("stopButton").disabled = true;
        document.getElementById("resumeButton").disabled = false; // Enable the "resume" button
    }
}

function resumeTimer() {
    if (!isRunning) {
        timer = setInterval(function () {
            secondsRemaining--;
            if (secondsRemaining <= 0) {
                clearInterval(timer);
                isRunning = false;
                alert("Countdown timer expired!");
                document.getElementById("startButton").disabled = false;
                document.getElementById("stopButton").disabled = true;
                document.getElementById("resumeButton").disabled = true; // Disable the "resume" button
            }
            updateDisplay();
        }, 1000);

        isRunning = true;
        document.getElementById("startButton").disabled = true;
        document.getElementById("stopButton").disabled = false;
        document.getElementById("resumeButton").disabled = true; // Disable the "resume" button after resuming
        document.getElementById("resetButton").disabled = false;
        document.getElementById("restartButton").disabled = false;
        document.getElementById("timeInput").disabled = true;
        document.getElementById("timeUnit").disabled = true;
    }
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    secondsRemaining = 0;
    updateDisplay();
    document.getElementById("startButton").disabled = false;
    document.getElementById("stopButton").disabled = true;
    document.getElementById("resetButton").disabled = true;
    document.getElementById("restartButton").disabled = true;
    document.getElementById("timeInput").disabled = false;
    document.getElementById("timeUnit").disabled = false;
}

function restartTimer() {
    resetTimer();
    startTimer();
}

function updateDisplay() {
    const hours = Math.floor(secondsRemaining / 3600);
    const minutes = Math.floor((secondsRemaining % 3600) / 60);
    const seconds = secondsRemaining % 60;
    document.getElementById("display").textContent =
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function convertToSeconds(timeInput) {
    switch (selectedTimeUnit) {
        case "hours":
            return timeInput * 3600;
        case "minutes":
            return timeInput * 60;
        case "seconds":
            return parseInt(timeInput);
        default:
            return 0;
    }
}

document.getElementById("timeUnit").addEventListener("change", function () {
    selectedTimeUnit = this.value;
});
