import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
const startBtn = document.querySelector(`[data-start]`);

startBtn.disabled = true;
let userSelectedDates = null;
startBtn.addEventListener('click', startTimer);
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate && selectedDate.getTime() > Date.now()) {
      startBtn.disabled = false;
    } else {
      Notiflix.Notify.failure('Please choose a date in the future');
    }
  },
};
flatpickr('#datetime-picker', options);
function startTimer() {
  const endDate = flatpickr.parseDate(
    document.querySelector('#datetime-picker').value
  );
  const intervalId = setInterval(() => {
    const remainingTime = endDate.getTime() - Date.now();
    if (remainingTime <= 0) {
      clearInterval(intervalId);
    } else {
      const { days, hours, minutes, seconds } = convertMs(remainingTime);
      document.querySelector('[data-days]').textContent = days;
      document.querySelector('[data-hours]').textContent = hours;
      document.querySelector('[data-minutes]').textContent = minutes;
      document.querySelector('[data-seconds]').textContent = seconds;
    }
  }, 1000);
}

startBtn.addEventListener('click', startTimer);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor((ms % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((ms % minute) / second));

  return {
    days,
    hours,
    minutes,
    seconds,
  };
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
