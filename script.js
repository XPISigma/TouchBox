// Get the element where we'll display the touch count
const touchDisplay = document.getElementById('touchDisplay');

// Get all the switches
const switches = document.querySelectorAll('.switch');

// New array to store the latest switch presses
const latestSwitchPresses = [];

// Function to update the display of latest switch presses
function updateLatestSwitchesDisplay() {
  const latestSwitchesContainer = document.getElementById('latestSwitchesContainer');
  latestSwitchesContainer.innerHTML = latestSwitchPresses.join('   ');
}

// Function to add the switch ID to the latestSwitchPresses array
function addSwitchPressToLatest(switchId) {
  latestSwitchPresses.push(switchId);
  if (latestSwitchPresses.length > 20) {
    latestSwitchPresses.shift(); // Remove the oldest switch press if the array exceeds 20 elements
  }
  updateLatestSwitchesDisplay();
}

// Function to update the touch count display and darken the switches
function updateTouchCount(event) {
  const touchCount = event.touches.length;
  touchDisplay.textContent = touchCount;

  // Remove temporary circles after touchend
  if (event.type === 'touchend') {
    const tempCircles = document.querySelectorAll('.touch-circle-temp');
    tempCircles.forEach((circle) => {
      document.body.removeChild(circle);
    });
  }

  // Check if any switch is being touched and not darkened
  if (touchCount > 0) {
    switches.forEach((switchElement) => {
      const switchRect = switchElement.getBoundingClientRect();
      let touchedAndNotDarkened = false;

      // Check if any touch is within the boundaries of the switch and not darkened
      for (const touch of event.touches) {
        if (
          touch.clientX >= switchRect.left &&
          touch.clientX <= switchRect.right &&
          touch.clientY >= switchRect.top &&
          touch.clientY <= switchRect.bottom
        ) {
          touchedAndNotDarkened = true;
          break;
        }
      }

      if (touchedAndNotDarkened) {
        if (!switchElement.classList.contains('dark')) {
          switchElement.classList.add('dark');
          addSwitchPressToLatest(switchElement.id);
        }
      } else {
        switchElement.classList.remove('dark');
      }
    });
  } else {
    // If there are no touches, remove the 'dark' class from all switches
    switches.forEach((switchElement) => {
      switchElement.classList.remove('dark');
    });
  }

  // Call requestAnimationFrame to run the updateTouchCount function every frame
  requestAnimationFrame(updateTouchCount);
}

// Function to disable pinch zooming
function disablePinchZoom() {
  document.addEventListener('touchmove', function (event) {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  }, { passive: false });
}

// Event listeners to detect touch events
document.addEventListener('touchstart', updateTouchCount);
document.addEventListener('touchmove', updateTouchCount);
document.addEventListener('touchend', updateTouchCount);

// Call the function to disable pinch zooming
disablePinchZoom();

document.addEventListener('click', function(event) {
  if (event.button === 0) { // 0 represents the left mouse button
    event.preventDefault();
  }
});

document.addEventListener('contextmenu', function(event) {
  event.preventDefault();
});

// The following line will uncap the frame rate, running at the maximum possible frame rate.
// If there is no other code limiting the frame rate, the website will run at the device's refresh rate.
requestAnimationFrame(updateTouchCount);
