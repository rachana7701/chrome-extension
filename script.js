//Pomodoro Timer
let timer;
let isRunning = false;
let isPaused = false;
let minutes = 25;
let seconds = 0;
let currentMode = 'pomodoro';

const startButton = document.getElementById('start-button');
const pauseButton = document.getElementById('pause-button');
const resetButton = document.getElementById('reset-button');
const pomodoroButton = document.getElementById('pomodoro-btn');
const shortBreakButton = document.getElementById('shortBreak-btn');
const longBreakButton = document.getElementById('longBreak-btn');
const minutesSpan = document.getElementById('minutes');
const secondsSpan = document.getElementById('seconds');

const modes = {
  pomodoro: { minutes: 25, seconds: 0 },
  shortBreak: { minutes: 5, seconds: 0 },
  longBreak: { minutes: 10, seconds: 0 }
};

function switchMode(mode) {
  currentMode = mode;
  minutes = modes[mode].minutes;
  seconds = modes[mode].seconds;
  updateTimerDisplay();

  document.querySelectorAll('.timer-type-buttons button').forEach(button => {
    button.classList.remove('active');
  });
  document.getElementById(`${mode}-btn`).classList.add('active');

  resetTimer();
}

function updateTimerDisplay() {
  minutesSpan.textContent = minutes.toString().padStart(2, '0');
  secondsSpan.textContent = seconds.toString().padStart(2, '0');
}

function startTimer() {
  if (isRunning && !isPaused) return;

  isRunning = true;
  isPaused = false;
  timer = setInterval(() => {
    if (seconds === 0) {
      if (minutes === 0) {
        clearInterval(timer);
        isRunning = false;
        alert('Time is up!');
        return;
      }
      minutes--;
      seconds = 59;
    } else {
      seconds--;
    }
    updateTimerDisplay();
  }, 1000);
}

function pauseTimer() {
  if (!isRunning || isPaused) return;

  isPaused = true;
  clearInterval(timer);
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  isPaused = false;
  switchMode(currentMode);
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

pomodoroButton.addEventListener('click', () => switchMode('pomodoro'));
shortBreakButton.addEventListener('click', () => switchMode('shortBreak'));
longBreakButton.addEventListener('click', () => switchMode('longBreak'));

// Initialize timer display
updateTimerDisplay();


//Floating emoji 

const emojis = document.querySelectorAll('.emoji-bar .emoji');
const container = document.querySelector('#container');
const container1=document.querySelector('#container1');

emojis.forEach(emoji => {
  emoji.addEventListener('click', () => {
    const animatedEmoji = document.createElement('span');
    animatedEmoji.textContent = emoji.textContent;
    animatedEmoji.classList.add('animated-emoji');

    const containerRect = container1.getBoundingClientRect();
    animatedEmoji.style.left = `${containerRect.width-100}px`; 
    animatedEmoji.style.top = `${containerRect.height}px`; 

    container.appendChild(animatedEmoji);
    // Remove the emoji after animation ends
    animatedEmoji.addEventListener('animationend', () => {
      container.removeChild(animatedEmoji);
    });
  });
});



