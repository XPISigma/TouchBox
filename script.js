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
    document.querySelectorAll('.switch').forEach(circle => {
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

// Function to toggle the menu visibility
function toggleMenu() {
  const menu = document.getElementById('menu');
  menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

// Function to change the color of the buttons
function changeButtonColor() {
  const colorPicker = document.createElement('input');
  colorPicker.type = 'color';
  colorPicker.addEventListener('input', () => {
    const buttons = document.querySelectorAll('.switch');
    const newColor = colorPicker.value;
    buttons.forEach(button => {
      button.style.backgroundColor = newColor;
    });
    saveButtonColorToCache(newColor); // Save the chosen color to cache
  });
  colorPicker.click();
}

// Function to change the background color of the app
function changeBackgroundColor() {
  const colorPicker = document.createElement('input');
  colorPicker.type = 'color';
  colorPicker.addEventListener('input', () => {
    const appBackground = document.body;
    const newColor = colorPicker.value;
    appBackground.style.backgroundColor = newColor;
    saveBackgroundColorToCache(newColor); // Save the chosen color to cache
  });
  colorPicker.click();
}

// On page load, set the button color and background color from cache
document.addEventListener('DOMContentLoaded', () => {
  setButtonColorFromCache();
  setBackgroundColorFromCache();
});

// Function to check if the touchcursor is inside a circle button
function isTouchingCircleButton(x, y) {
  const buttons = document.querySelectorAll('.switch');
  for (const button of buttons) {
    const rect = button.getBoundingClientRect();
    if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
      return button;
    }
  }
  return null;
}

//mouse stuff
let touchcursorVisible = false;

// Function to handle touch or mouse move event
function handleTouchOrMouseMove(event) {
  const touchcircleContainer = document.getElementById('touchcircle-container');
  const touchcircle = document.getElementById('touchcircle');

  // Check if the left mouse button is held down (for touch, use the first touch point)
  const isLeftButtonDown = event.buttons === 1 || (event.touches && event.touches.length > 0);

  // Move the touchcircle with the touch/mouse position
  const touchX = event.clientX || (event.touches && event.touches[0].clientX);
  const touchY = event.clientY || (event.touches && event.touches[0].clientY);
  touchcircleContainer.style.left = touchX + 'px';
  touchcircleContainer.style.top = touchY + 'px';

  // Check if the touch circle is touching a circle button
  const touchingCircle = isTouchingCircleButton(touchX, touchY);

  // Handle button press/unpress
  document.querySelectorAll('.switch').forEach(button => {
    const isTouchingButton = touchingCircle === button;
    if (isTouchingButton) {
      if (!button.classList.contains('active')) {
        button.classList.add('active');
        vibrateDevice(); // Vibrate when button is pressed
        console.log('Button Name:', button.dataset.name);
      }
    } else {
      button.classList.remove('active');
    }
  });

  // Show/hide the touchcircle based on the touchcursor status
  if (isLeftButtonDown) {
    touchcircleVisible = true;
    touchcircleContainer.style.display = 'block';
  } else {
    touchcircleVisible = false;
    touchcircleContainer.style.display = 'none';
  }
}

//feed
// Array to keep track of the last 20 button presses
const buttonPresses = [];

// Function to update the text feed with the latest button press
function updateTextFeed(buttonName) {
  buttonPresses.push(buttonName); // Add the latest press to the array

  // Limit the array to 20 items
  if (buttonPresses.length > 20) {
    buttonPresses.shift(); // Remove the oldest item
  }

  const textFeedList = document.getElementById('latest-presses');
  textFeedList.innerHTML = ''; // Clear the current text feed

  // Add the button presses to the text feed horizontally
  buttonPresses.forEach(name => {
    const listItem = document.createElement('li');
    listItem.textContent = name;
    textFeedList.appendChild(listItem);
  });
}

// Function to handle button press/unpress
document.querySelectorAll('.switch').forEach(button => {
  button.addEventListener('click', () => {
    const buttonName = button.dataset.name;
    updateTextFeed(buttonName); // Update the text feed with the latest press
    vibrateDevice(); // Vibrate when button is pressed
    console.log('Button Name:', buttonName);
  });
});

//test
// Function to check if the touchcursor is inside a circle button
function isTouchingCircleButton(x, y) {
  const buttons = document.querySelectorAll('.switch');
  for (const button of buttons) {
    const rect = button.getBoundingClientRect();
    if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
      return button;
    }
  }
  return null;
}

// Function to handle touch or mouse move event
function handleTouchOrMouseMove(event) {
  const touchcircleContainer = document.getElementById('touchcircle-container');
  const touchcircle = document.getElementById('touchcircle');

  // Get all active touch points
  const touches = event.touches || [];
  const activeTouchPoints = [];

  // Move the touchcircle with the average position of all touch points
  let touchXSum = 0;
  let touchYSum = 0;
  for (const touch of touches) {
    touchXSum += touch.clientX;
    touchYSum += touch.clientY;
    activeTouchPoints.push(touch.identifier);
  }

  const numActiveTouchPoints = activeTouchPoints.length;
  if (numActiveTouchPoints > 0) {
    touchcircleContainer.style.display = 'block';
    const touchX = touchXSum / numActiveTouchPoints;
    const touchY = touchYSum / numActiveTouchPoints;
    touchcircleContainer.style.left = touchX + 'px';
    touchcircleContainer.style.top = touchY + 'px';
  } else {
    touchcircleContainer.style.display = 'none';
  }

  // Check if any touch point is touching a circle button
  const touchingCircleMap = new Map();
  for (const touch of touches) {
    const x = touch.clientX;
    const y = touch.clientY;
    const touchingCircle = isTouchingCircleButton(x, y);
    if (touchingCircle) {
      touchingCircleMap.set(touch.identifier, touchingCircle);
    }
  }

  // Handle button press/unpress
  document.querySelectorAll('.switch').forEach(button => {
    const buttonID = parseInt(button.dataset.id);
    if (touchingCircleMap.has(buttonID)) {
      if (!button.classList.contains('active')) {
        button.classList.add('active');
        vibrateDevice(); // Vibrate when button is pressed
        const buttonName = button.dataset.name;
        updateTextFeed(buttonName); // Update the text feed with the latest press
        console.log('Button Name:', buttonName);
      }
    } else {
      button.classList.remove('active');
    }
  });
}

// Function to handle touch or mouse end event
function handleTouchOrMouseEnd(event) {
  // Handle button unpress for touch points that were released
  const changedTouches = event.changedTouches || [];
  for (const touch of changedTouches) {
    const buttonID = touch.identifier;
    const button = document.querySelector(`[data-id="${buttonID}"]`);
    if (button) {
      button.classList.remove('active');
    }
  }
}

// Attach event listeners for touch and mouse events
document.addEventListener('touchmove', handleTouchOrMouseMove);
document.addEventListener('mousemove', handleTouchOrMouseMove);
document.addEventListener('touchend', handleTouchOrMouseEnd);
document.addEventListener('mouseup', handleTouchOrMouseEnd);

//disable right click
// Function to disable right-click on the page
function disableRightClick(event) {
  event.preventDefault();
}

// Attach event listener to disable right-click
document.addEventListener('contextmenu', disableRightClick);
