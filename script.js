'use strict';


const SECRET_PASSWORD = 'mylove';
const COUNTDOWN_SECONDS = 10;


const passwordInput = document.getElementById('password');
const passwordMessage = document.getElementById('passwordMessage');
const surpriseButton = document.getElementById('surpriseButton');
const countdownScreen = document.getElementById('countdownScreen');
const countdownNumber = document.getElementById('countdownNumber');
const secretContent = document.getElementById('secret-content');
const music = document.getElementById('music');
const musicButton = document.getElementById('musicButton');
const musicStatus = document.getElementById('musicStatus');

let countdownTimer = null;


function checkPassword() {
  const enteredPassword = passwordInput.value.trim();
  if (enteredPassword.toLowerCase() !== SECRET_PASSWORD) {
    passwordMessage.textContent = 'That is not the secret word. Try again, my love ♥';
    passwordInput.focus();
    return;
  }

  passwordMessage.textContent = '';
  passwordInput.disabled = true;
  surpriseButton.disabled = true;
  startCountdown();
}


function startCountdown() {
  if (countdownTimer !== null) clearInterval(countdownTimer);

  let count = COUNTDOWN_SECONDS;
  countdownNumber.textContent = String(count);
  countdownScreen.classList.add('active');
  countdownScreen.setAttribute('aria-hidden', 'false');

  countdownTimer = window.setInterval(() => {
    count -= 1;
    countdownNumber.textContent = String(count);

    if (count <= 0) {
      clearInterval(countdownTimer);
      countdownTimer = null;
      countdownScreen.classList.remove('active');
      countdownScreen.setAttribute('aria-hidden', 'true');
      secretContent.hidden = false;
      secretContent.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, 1000);
}


async function toggleMusic() {
  if (!music) return;
  if (music.paused) {
    try {
      await music.play();
      musicButton.innerHTML = '♫ <span>Pause song</span>';
      musicStatus.textContent = 'Playing your song ♥';
    } catch (error) {
      musicStatus.textContent = 'Add favorite-song.mp3 beside these files, then try again.';
    }
  } else {
    music.pause();
    musicButton.innerHTML = '♫ <span>Play your favourite song</span>';
    musicStatus.textContent = 'Music paused';
  }
}


surpriseButton.addEventListener('click', checkPassword);
passwordInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') checkPassword();
});
musicButton.addEventListener('click', toggleMusic);
