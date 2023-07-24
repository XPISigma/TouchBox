// Function to trigger vibration (if supported by the device)
function vibrateDevice() {
  if ('vibrate' in navigator) {
    // Vibrate for 50 milliseconds
    navigator.vibrate(50);
  }
}

// Function to set the button color from cache
function setButtonColorFromCache() {
  const storedColor = localStorage.getItem('buttonColor');
  if (storedColor) {
    document.querySelectorAll('.circle').forEach(circle => {
      circle.style.backgroundColor = storedColor;
    });
  }
}

// Function to set the background color from cache
function setBackgroundColorFromCache() {
  const storedColor = localStorage.getItem('backgroundColor');
  if (storedColor) {
    document.body.style.backgroundColor = storedColor;
  }
}

// Function to save the button color to cache
function saveButtonColorToCache(color) {
  localStorage.setItem('buttonColor', color);
}

// Function to save the background color to cache
function saveBackgroundColorToCache(color) {
  localStorage.setItem('backgroundColor', color);
}

// Attach click events to buttons for desktop devices
const circles = document.querySelectorAll(".circle");
circles.forEach(circle => {
  circle.addEventListener("mousedown", () => {
    vibrateDevice(); // Vibrate when button is pressed
    circle.style.top = "20px"; // Move the button down by 20px
    console.log("Button Name:", circle.dataset.name);
  });

  circle.addEventListener("mouseup", () => {
    circle.style.top = "0"; // Move the button back up to its original position
  });
});

// Attach touch events to buttons for mobile devices
circles.forEach(circle => {
  circle.addEventListener("touchstart", () => {
    vibrateDevice(); // Vibrate when button is pressed
    circle.style.top = "30px"; // Move the button down by 20px
    playSound();

  });

  circle.addEventListener("touchend", () => {
    circle.style.top = "0"; // Move the button back up to its original position
  });
});

function playSound() {
  const audio = document.getElementById('myAudio');
  audio.currentTime = 0; // Rewind the audio to the beginning to play it from the start each time
  audio.play();
}

// Function to toggle the menu visibility
function toggleMenu() {
  const menu = document.getElementById("menu");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

// Function to change the color of the buttons
function changeButtonColor() {
  const colorPicker = document.createElement("input");
  colorPicker.type = "color";
  colorPicker.addEventListener("input", () => {
    const buttons = document.querySelectorAll(".circle");
    const newColor = colorPicker.value;
    buttons.forEach(button => {
      button.style.backgroundColor = newColor;
      saveButtonColorToCache(newColor); // Save the chosen color to cache
    });
  });
  colorPicker.click();
}

// Function to change the background color of the app
function changeBackgroundColor() {
  const colorPicker = document.createElement("input");
  colorPicker.type = "color";
  colorPicker.addEventListener("input", () => {
    const appBackground = document.body;
    const newColor = colorPicker.value;
    appBackground.style.backgroundColor = newColor;
    saveBackgroundColorToCache(newColor); // Save the chosen color to cache
  });
  colorPicker.click();
}

// On page load, set the button color and background color from cache
document.addEventListener("DOMContentLoaded", () => {
  setButtonColorFromCache();
  setBackgroundColorFromCache();
});
