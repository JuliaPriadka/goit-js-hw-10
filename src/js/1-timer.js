import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const startButton = document.querySelector('button[data-start]');
const timerInput = document.querySelector('#datetime-picker');
const remainingDays = document.querySelector('span[data-days]');
const remainingHours = document.querySelector('span[data-hours]');
const remainingMinutes = document.querySelector('span[data-minutes]');
const remainingSeconds = document.querySelector('span[data-seconds]');

startButton.addEventListener('click', onStartBtnClick);

startButton.disabled = true;
startButton.classList.add('disabled-btn');

let userSelectedDate;
const startTime = "00";

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      iziToast.show({
        message: 'Please choose a date in the future',
        backgroundColor: '#ef4040',
        messageColor: '#fff',
        position: 'topRight',
      });
    } else {
      startButton.disabled = false;
      startButton.classList.replace('disabled-btn', 'active-btn');
      userSelectedDate = selectedDates[0];
    }
  },
});

function onStartBtnClick() {
  startButton.disabled = true;
    timerInput.disabled = true;
  startButton.classList.replace('active-btn', 'disabled-btn');
    const intervalId = setInterval(() => {
    const timeDifference = new Date(userSelectedDate) - new Date();
        const remainingTime = convertMs(timeDifference);
        console.log(timeDifference);
    remainingDays.textContent = addLeadingZero(remainingTime.days);
    remainingHours.textContent = addLeadingZero(remainingTime.hours);
    remainingMinutes.textContent = addLeadingZero(remainingTime.minutes);
    remainingSeconds.textContent = addLeadingZero(remainingTime.seconds);
    if (timeDifference <= 999) {
        clearInterval(intervalId);
        timerInput.disabled = false;
    }
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
