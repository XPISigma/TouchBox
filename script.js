// Get the element where we'll display the touch count
const touchDisplay = document.getElementById("touchDisplay");

// Get all the switches
const switches = document.querySelectorAll(".switch");

// New array to store the latest switch presses
const latestSwitchPresses = [];

// Function to update the display of latest switch presses
function updateLatestSwitchesDisplay() {
  const latestSwitchesContainer = document.getElementById(
    "latestSwitchesContainer"
  );
  latestSwitchesContainer.innerHTML = latestSwitchPresses.join("   ");
}

// Function to add the switch ID to the latestSwitchPresses array
function addSwitchPressToLatest(switchId) {
  latestSwitchPresses.push(switchId);
  if (latestSwitchPresses.length > 20) {
    latestSwitchPresses.shift(); // Remove the oldest switch press if the array exceeds 20 elements
  }
  updateLatestSwitchesDisplay();
    const switchSound = document.getElementById("switchSound");
  switchSound.play();
}

// Function to update the touch count display and darken the switches
function updateTouchCount(event) {
  const touchCount = event.touches.length;
  touchDisplay.textContent = touchCount;

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
        if (!switchElement.classList.contains("dark")) {
          switchElement.classList.add("dark");
          addSwitchPressToLatest(switchElement.id);
        }
      } else {
        switchElement.classList.remove("dark");
      }
    });
  } else {
    // If there are no touches, remove the 'dark' class from all switches
    switches.forEach((switchElement) => {
      switchElement.classList.remove("dark");
    });
  }

  // Call requestAnimationFrame to run the updateTouchCount function every frame
  requestAnimationFrame(updateTouchCount);
}

// Function to disable pinch zooming
function disablePinchZoom() {
  document.addEventListener(
    "touchmove",
    function (event) {
      if (event.touches.length > 1) {
        event.preventDefault();
      }
    },
    { passive: false }
  );
}

// Event listeners to detect touch events
document.addEventListener("touchstart", updateTouchCount);
document.addEventListener("touchmove", updateTouchCount);
document.addEventListener("touchend", updateTouchCount);

// Call the function to disable pinch zooming
disablePinchZoom();

document.addEventListener("click", function (event) {
  if (event.button === 0) {
    // 0 represents the left mouse button
    event.preventDefault();
  }
});

document.addEventListener("contextmenu", function (event) {
  event.preventDefault();
});

requestAnimationFrame(updateTouchCount);

let vibrationOn = true;

function toggleVibration() {
  const vibrationStatus = document.getElementById("vibration-status");
  vibrationOn = !vibrationOn;
  vibrationStatus.textContent = vibrationOn ? "On" : "Off";

  if (vibrationOn) {
    // Check if the browser supports the Vibration API
    if ("vibrate" in navigator) {
      // Vibrate for 200ms
      navigator.vibrate(200);
    } else {
      console.log("Vibration is not supported in this browser.");
    }
  }
}

function toggleMenu() {
  const menuItems = document.querySelector(".menu-items");
  menuItems.style.display =
    menuItems.style.display === "none" ? "block" : "none";
}

function openFileInput() {
  const fileInput = document.getElementById("fileInput");
  fileInput.click();
}

document
  .getElementById("fileInput")
  .addEventListener("change", handleFileUpload);

function handleFileUpload(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const imageSrc = e.target.result;
      applyBackgroundImage(imageSrc);
    };
    reader.readAsDataURL(file);
  }
}

// Function to apply background image
function applyBackgroundImage(imageSrc) {
  const switchContainer = document.querySelector(".switch-container");
  switchContainer.style.backgroundImage = `url('${imageSrc}')`;

  // Save the imageSrc to Local Storage
  localStorage.setItem("backgroundImageSrc", imageSrc);

  console.log("Background image uploaded");
}

// Function to check if background image exists in Local Storage and apply it
function loadBackgroundImageFromCache() {
  const imageSrc = localStorage.getItem("backgroundImageSrc");
  if (imageSrc) {
    applyBackgroundImage(imageSrc);
  }
}

// Call this function on page load to load background image from cache (if it exists)
loadBackgroundImageFromCache();

// Function to handle the color picker change event
function handleColorPickerChange(event) {
  const selectedColor = event.target.value;
  const switches = document.querySelectorAll(".switch");

  // Update the color of all switches
  switches.forEach((switchElement) => {
    switchElement.style.backgroundColor = selectedColor;
  });
        localStorage.setItem("switchColor", selectedColor);

}


// Function to toggle the color picker for button press color
function toggleButtonColor() {
  const colorPicker = document.getElementById("colorPicker");
  colorPicker.click();
}

// Event listener for color picker change event
document
  .getElementById("colorPicker")
  .addEventListener("input", handleColorPickerChange);

let buttonPressColor = "white"; // Default color, you can change this to your desired default color

// Call the function to disable pinch zooming
disablePinchZoom();

const menuItems = document.querySelector(".menu-items");
const menuIcon = document.querySelector(".menu-icon");

// Function to toggle the menu display
function toggleMenu() {
  menuItems.style.display =
    menuItems.style.display === "none" ? "block" : "none";
}

// Event listener to detect clicks on the document
document.addEventListener("click", function (event) {
  if (!menuItems.contains(event.target) && !menuIcon.contains(event.target)) {
    // Clicked outside the menu and menu icon, so collapse the menu
    menuItems.style.display = "none";
  }
});

// Event listener to detect clicks on the menu icon
menuIcon.addEventListener("click", function (event) {
  event.stopPropagation(); // Prevent the click event from propagating to the document
  toggleMenu();
});

// Function to toggle full-screen mode
function toggleFullScreen() {
  if (!document.fullscreenElement) {
    // If not in full-screen mode, enter full-screen
    document.documentElement.requestFullscreen();
  } else {
    // If in full-screen mode, exit full-screen
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      /* Firefox */
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      /* IE/Edge */
      document.msExitFullscreen();
    }
  }
}

// Event listener to detect clicks on the full-screen menu item
document.getElementById("fullscreenMenuItem").addEventListener("click", toggleFullScreen);

// Call the function to disable pinch zooming
disablePinchZoom();

// Function to request fullscreen
function requestFullscreen() {
  const element = document.documentElement;

  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    /* Firefox */
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
    /* Chrome, Safari & Opera */
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    /* IE/Edge */
    element.msRequestFullscreen();
  }
}

// Call the function to request fullscreen when the page loads
requestFullscreen();

