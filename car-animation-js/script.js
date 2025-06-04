const track = document.getElementById("track");
const car = document.getElementById("car");
const toggleBtn = document.getElementById("toggleMovement");
const soundBtn = document.getElementById("toggleSound");
const wheels = document.querySelectorAll(".wheel img");

let isMoving = false;
let isSoundOn = true;

// Load and control sound
const audio = new Audio('sound.mp3');
audio.loop = true;
audio.volume = 0.5;
audio.play();

// Start/Stop button logic
toggleBtn.addEventListener("click", () => {
  isMoving = !isMoving;

  // Track and car animation state
  track.style.animationPlayState = isMoving ? "running" : "paused";
  car.style.animationPlayState = isMoving ? "running" : "paused";

  // Pause wheel rotation
  wheels.forEach((wheel) => {
    wheel.style.animationPlayState = isMoving ? "running" : "paused";
  });

  toggleBtn.textContent = isMoving ? "Stop" : "Start";
});

// Sound ON/OFF logic
soundBtn.addEventListener("click", () => {
  isSoundOn = !isSoundOn;

  if (isSoundOn) {
    audio.play();
    soundBtn.textContent = "Sound On";
  } else {
    audio.pause();
    soundBtn.textContent = "Sound Off";
  }
});
