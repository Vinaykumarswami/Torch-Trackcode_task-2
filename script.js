let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let lapCount = 0;

document.getElementById("startStop").addEventListener("click", startStop);
document.getElementById("reset").addEventListener("click", reset);
document.getElementById("lap").addEventListener("click", lap);

function startStop() {
  if (isRunning) {
    clearInterval(timer);
    isRunning = false;
  } else {
    startTime = Date.now() - elapsedTime;
    timer = setInterval(updateTime, 10);
    isRunning = true;
  }
  toggleButtonColor();
}

function updateTime() {
  const currentTime = Date.now();
  elapsedTime = currentTime - startTime;
  displayTime(elapsedTime);
}

function displayTime(time) {
  const formattedTime = new Date(time).toISOString().substr(11, 8);
  document.getElementById("display").textContent = formattedTime;
}

function reset() {
  clearInterval(timer);
  isRunning = false;
  elapsedTime = 0;
  displayTime(elapsedTime);
  document.getElementById("laps").innerHTML = "";
  lapCount = 0;
  updateLapCount();
  toggleBackgroundColor();
  removeColor();
}

function lap() {
  const lapTime = new Date(elapsedTime).toISOString().substr(11, 8);
  const lapItem = document.createElement("li");
  lapItem.textContent = lapTime;
  document.getElementById("laps").appendChild(lapItem);
  lapCount++;
  updateLapCount();
}

function updateLapCount() {
  document.getElementById("lapCount").textContent = `Laps: ${lapCount}`;
}

function toggleButtonColor() {
  const buttons = document.querySelectorAll("button");
  buttons.forEach(button => {
    button.classList.toggle("bg-green");
  });
}

function toggleBackgroundColor() {
  const container = document.querySelector(".container");
  container.classList.toggle("bg-blue");
}

function removeColor() {
  const buttons = document.querySelectorAll("button");
  buttons.forEach(button => {
    button.classList.remove("bg-green");
  });
}
