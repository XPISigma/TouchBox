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
    const buttons = document.querySelectorAll('.circle');
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

//mouse stuff
// Function to handle touch or mouse move event
function handleTouchOrMouseMove(event) {
  const touchcircleContainer = document.getElementById('touchcircle-container');
  const touchcircle = document.getElementById('touchcircle');

  // Check if the left mouse button is held down (for touch, use the first touch point)
  const isLeftButtonDown = event.buttons === 1 || (event.touches && event.touches.length > 0);

  if (isLeftButtonDown) {
    // Show the touchcircle
    touchcircleContainer.style.display = 'block';

    // Move the touchcircle with the touch/mouse position
    const touchX = event.clientX || (event.touches && event.touches[0].clientX);
    const touchY = event.clientY || (event.touches && event.touches[0].clientY);
    touchcircleContainer.style.left = touchX + 'px';
    touchcircleContainer.style.top = touchY + 'px';

    // Check if the touch circle is touching a circle button
    const touchingCircle = isTouchingCircleButton(touchX, touchY);

    // Handle button press/unpress
    if (touchingCircle) {
      if (!pressedButton) {
        pressedButton = touchingCircle;
        vibrateDevice(); // Vibrate when button is pressed
        touchingCircle.style.top = '1vw'; // Move the button down by 1vw
        console.log('Button Name:', touchingCircle.dataset.name);
      }
    } else {
      if (pressedButton) {
        pressedButton.style.top = '0'; // Move the button back up to its original position
        pressedButton = null;
      }
    }
  } else {
    // Hide the touchcircle when the left button is not held down
    touchcircleContainer.style.display = 'none';

    // Unpress the button when the touch circle is not touching any circle button
    if (pressedButton) {
      pressedButton.style.top = '0'; // Move the button back up to its original position
      pressedButton = null;
    }
  }
}

// Attach the touch or mouse move event to the document
document.addEventListener('mousemove', handleTouchOrMouseMove);
document.addEventListener('touchmove', handleTouchOrMouseMove);

// Function to handle mouse down event (left button pressed)
function handleMouseDown(event) {
  const touchcircleContainer = document.getElementById('touchcircle-container');

  // Show the touchcircle
  touchcircleContainer.style.display = 'block';

  // Move the touchcircle with the mouse position
  const touchX = event.clientX;
  const touchY = event.clientY;
  touchcircleContainer.style.left = touchX + 'px';
  touchcircleContainer.style.top = touchY + 'px';
}

// Attach the mouse down event to the document
document.addEventListener('mousedown', handleMouseDown);

// Function to handle global mouse up event (left button released)
function handleGlobalMouseUp() {
  const touchcircleContainer = document.getElementById('touchcircle-container');
  touchcircleContainer.style.display = 'none'; // Hide the touchcircle when the left button is released

  // Unpress the button when the touch circle is not touching any circle button
  if (pressedButton) {
    pressedButton.style.top = '0'; // Move the button back up to its original position
    pressedButton = null;
  }
}

// Attach the global mouse up event to the document
document.addEventListener('mouseup', handleGlobalMouseUp);

// Function to handle global touch end event (touch released)
function handleGlobalTouchEnd() {
  const touchcircleContainer = document.getElementById('touchcircle-container');
  touchcircleContainer.style.display = 'none'; // Hide the touchcircle when the touch is released

  // Unpress the button when the touch circle is not touching any circle button
  if (pressedButton) {
    pressedButton.style.top = '0'; // Move the button back up to its original position
    pressedButton = null;
  }
}

// Attach the global touch end event to the document
document.addEventListener('touchend', handleGlobalTouchEnd);

//istouchingcircle
// Function to check if the touch circle is touching a circle button
function isTouchingCircleButton(touchX, touchY) {
  const circles = document.querySelectorAll('.circle');
  for (const circle of circles) {
    const rect = circle.getBoundingClientRect();
    const circleX = rect.left + rect.width / 2;
    const circleY = rect.top + rect.height / 2;
    const distance = Math.sqrt((touchX - circleX) ** 2 + (touchY - circleY) ** 2);
    if (distance <= rect.width / 2) {
      return circle;
    }
  }
  return null;
}
