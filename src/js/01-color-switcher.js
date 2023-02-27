const startBtn = document.querySelector(`[data-start]`);
console.log(startBtn);
const stopBtn = document.querySelector(`[data-stop]`);
console.log(stopBtn);
let intervalId = null;
startBtn.addEventListener(`click`, onStart);
stopBtn.addEventListener(`click`, onStop);
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
function changeBackgroundColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}
function onStart(event) {
  intervalId = setInterval(changeBackgroundColor, 1000);
  startBtn.disabled = true;

  stopBtn.disabled = false;
}
function onStop(event) {
  clearInterval(intervalId);
  startBtn.disabled = false;

  stopBtn.disabled = true;
}
