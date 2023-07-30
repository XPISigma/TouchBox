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

// Function to create a new circle element and position it at the touch coordinates
function createCircle(x, y) {
  const circle = document.createElement('div');
  circle.className = 'touch-circle';
  circle.style.left = x + 'px';
  circle.style.top = y + 'px';
  document.body.appendChild(circle);

  // Remove the circle after 100ms
  setTimeout(() => {
    document.body.removeChild(circle);
  }, 1);
}

// Function to update the touch count display and create circles
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

  // Only create circles and check switches touching circles when there are visible touches
  if (touchCount > 0) {
    // Create circles for each touch point
    for (const touch of event.touches) {
      createCircle(touch.clientX, touch.clientY);
    }

    // Check if any switch is touching a touch circle
    switches.forEach((switchElement) => {
      const switchRect = switchElement.getBoundingClientRect();

      // Assume the switch is not touching any circle
      let touchingCircle = false;

      const touchCircles = document.querySelectorAll('.touch-circle');

      touchCircles.forEach((circle) => {
        const circleRect = circle.getBoundingClientRect();

        if (
          switchRect.left < circleRect.right &&
          switchRect.right > circleRect.left &&
          switchRect.top < circleRect.bottom &&
          switchRect.bottom > circleRect.top
        ) {
          touchingCircle = true;
          return;
        }
      });

      // Add or remove the 'dark' class based on whether the switch is touching a circle
      if (touchingCircle) {
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
